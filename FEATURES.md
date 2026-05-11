# Funcionalidades e Regras de Negócio - EcoVass 🛠️

O backend do **EcoVass** foi projetado focado em segurança, consistência econômica local, usabilidade geográfica municipal e **fricção zero de usabilidade**. Abaixo estão explicadas as regras de negócio cruciais implementadas no código.

---

## 🔒 1. Segurança e Autenticação JWT
Toda a API é blindada por autenticação **SimpleJWT** de duas camadas. O aplicativo móvel não armazena login e senha do usuário de forma local contínua, apenas tokens criptográficos gerados dinamicamente:

* **Token de Acesso (Access Token):** Utilizado em todas as requisições privadas no cabeçalho `Authorization: Bearer <token>`. Tempo de expiração customizado de **1 hora** para testes fluidos.
* **Token de Atualização (Refresh Token):** Permite ao aplicativo solicitar um novo token de acesso de maneira transparente e segura ao expirar o tempo, sem exigir nova login do morador.

---

## 🎟️ 2. Ciclo Econômico, Gamificação e Auditoria Antifraude
O ecossistema financeiro virtual do aplicativo é estritamente controlado para evitar fraudes ou inconsistências de saldo (como pontos duplicados), operando sob o conceito de **"Check-in e Confirmação de Coleta"**.

### A. Fluxo de Crédito (Sistema de Pontos por Check-in)
Em vez de exigir que o morador espere o caminhão da coleta seletiva passar em horário comercial ou realize tarefas complexas (como colar etiquetas com QR Code), o EcoVass adota o modelo de **Check-in de Baixo Esforço com Auditoria do Coletor**:

1. **Gatilho de Hábito (Check-in):** Na véspera da coleta do seu bairro, o morador recebe uma notificação e faz um "Check-in" de clique único no app confirmando: *"Sim, vou disponibilizar material para reciclagem amanhã na minha calçada"*. O sistema cria a solicitação como `PENDENTE`.
2. **Padrão de Descarte:** O morador simplesmente põe o material reciclável na calçada em frente ao seu número residencial cadastrado (ou usa o campo de observações para exceções, como "deixarei na lixeira do condomínio").
3. **Auditoria Física do Coletor:** Conforme o caminhão da prefeitura percorre a rota de coleta inteligente baseada nas casas que fizeram o "Check-in", o coletor atua como o validador físico:
   * **Se o material estiver lá corretamente:** O coletor recolhe o material e altera o status para `CONCLUIDO` no sistema. O Django `Signal` detecta essa alteração, valida se o ponto já não foi creditado anteriormente para aquela coleta específica e adiciona **100 pontos** na carteira do morador, gerando a transação de `CREDITO` no extrato.
   * **Se o material não estiver na calçada ou for lixo comum inadequado:** O coletor altera o status para `NAO_COLETADO`. O sistema registra a ausência e **nenhum ponto é creditado**, blindando a economia do aplicativo contra abusos e simulações de reciclagem.

### B. Fluxo de Débito (Resgate de Cupons)
Implementado na ViewSet customizada do `CupomViewSet` com o endpoint personalizado `POST /api/cupons/<id>/resgatar/`:
1. A API recupera o cupom desejado e a carteira do usuário logado através do token JWT.
2. É feita a verificação de saldo: `carteira.saldo >= cupom.custo_pontos`.
3. Se o usuário não tiver pontos suficientes, a requisição retorna um erro `400 Bad Request` com a mensagem `"Saldo insuficiente."`.
4. Se houver saldo, deduz os pontos da carteira, cria um registro de `DEBITO` no extrato e retorna o código de cupom correspondente.

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
