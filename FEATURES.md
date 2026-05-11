# Funcionalidades e Regras de Negócio - EcoVass 🛠️

O backend do **EcoVass** foi projetado focado em segurança, consistência econômica local e usabilidade geográfica municipal. Abaixo estão explicadas as regras de negócio cruciais implementadas no código.

---

## 🔒 1. Segurança e Autenticação JWT
Toda a API é blindada por autenticação **SimpleJWT** de duas camadas. O aplicativo móvel não armazena login e senha do usuário de forma local contínua, apenas tokens criptográficos gerados dinamicamente:

* **Token de Acesso (Access Token):** Utilizado em todas as requisições privadas no cabeçalho `Authorization: Bearer <token>`. Para fins de testes acadêmicos fluidos, configuramos um tempo de expiração customizado de **1 hora**.
* **Token de Atualização (Refresh Token):** Permite ao aplicativo solicitar um novo token de acesso de maneira transparente e segura ao expirar o tempo, sem exigir nova senha do morador.

---

## 🎟️ 2. Ciclo Econômico e Gamificação
O ecossistema financeiro virtual do aplicativo é estritamente controlado para evitar fraudes ou inconsistências de saldo (como pontos duplicados).

### A. Fluxo de Crédito (Sistema de Pontos)
Implementado usando Django **Signals** de forma automática:
1. Uma solicitação de coleta é criada com o status inicial `PENDENTE`.
2. Quando a equipe de coleta urbana da prefeitura realiza o recolhimento, o administrador altera o status da solicitação para `CONCLUIDO` no painel.
3. O `post_save` do modelo detecta a transição de estado e dispara a função de pontuação:
   * Cria ou localiza a `Carteira` do morador associado.
   * Verifica se já não existe uma transação de crédito gerada anteriormente para o ID daquela coleta (evitando duplicidade caso a coleta seja editada e salva de novo).
   * Se for uma nova conclusão, adiciona **100 pontos** ao saldo ativo e ao histórico acumulativo do usuário.
   * Cria um registro de transação de `CREDITO` detalhado no extrato.

### B. Fluxo de Débito (Resgate de Cupons)
Implementado na ViewSet customizada do `CupomViewSet` com o endpoint personalizado `POST /api/cupons/<id>/resgatar/`:
1. A API recupera o cupom desejado e a carteira do usuário logado através do token JWT.
2. É feita a verificação de saldo: `carteira.saldo >= cupom.custo_pontos`.
3. Se o usuário não tiver pontos suficientes, a requisição é rejeitada retornando um erro `400 Bad Request` com a mensagem `"Saldo insuficiente."`.
4. Se houver saldo:
   * Deduz os pontos da carteira (`carteira.saldo -= cupom.custo_pontos`).
   * Cria uma transação de `DEBITO` no extrato financeiro.
   * Retorna o código de resgate (ex: `SAOLUIS10`) e o novo saldo atualizado.

---

## 📍 3. Inteligência Geográfica de CEP (Vassouras Inteligente)
Para garantir eficiência logística urbana e usabilidade de alto nível para o morador de Vassouras, integramos o backend com a API pública do **ViaCEP**.

### Como a regra de validação atua no `save()` do Model:
1. **Processamento Limpo:** O CEP enviado pelo usuário é sanitizado removendo hifens, pontos e espaços para evitar problemas de formatação.
2. **Integração com ViaCEP:** É feita uma requisição HTTP para `https://viacep.com.br/ws/{cep}/json/` com timeout de segurança para evitar lentidões.
3. **Validação Territorial Restrita (Exclusividade Municipal):** O backend valida se a cidade retornada pela API do ViaCEP é exatamente **"Vassouras"**. Caso pertença a qualquer outro município (ex: Barra do Piraí, Rio de Janeiro), o salvamento é cancelado pelo banco, disparando um `ValidationError` informando a localidade incorreta de forma amigável.
4. **Validação de CEP Inválido:** Se o ViaCEP retornar um status indicando CEP inválido ou não existente, o sistema barra o salvamento com o erro `"O CEP informado não foi encontrado ou é inválido."`.
5. **Autocompletar Inteligente:** Se o CEP for de Vassouras e estiver em conformidade, o backend preenche automaticamente o campo `endereco_descricao` de acordo com a precisão dos dados retornados:
   * *CEP Geral (27700-000):* Preenche apenas como `"Vassouras/RJ"` de forma limpa, eliminando vírgulas residuais no início do texto.
   * *CEP Específico por Logradouro:* Preenche no formato `"Logradouro, Bairro - Cidade/UF"`.
