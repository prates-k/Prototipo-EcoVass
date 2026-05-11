# Documentação de Arquitetura e Engenharia de Software - EcoVass 🏢

Este documento detalha as decisões de engenharia, arquitetura de software e a modelagem do banco de dados da API do **EcoVass**.

---

## 🏛️ Arquitetura do Sistema
O EcoVass adota o padrão de desenvolvimento **MVT (Model-View-Template)** nativo do Django, adaptado para a arquitetura **DRF (Django REST Framework)** como uma API RESTful pura, separando totalmente a lógica do Backend (esta API) das interfaces de usuário (Frontend em React Native).

### Principais Componentes da Arquitetura:
1. **Models (Camada de Dados):** Mapeiam as tabelas do banco de dados por meio do Django ORM, garantindo integridade referencial.
2. **Serializers (Camada de Tradução):** Transformam os modelos complexos do Python em JSON para envio de dados pela rede, e vice-versa, efetuando as validações de entrada de dados.
3. **ViewSets (Camada de Controle/Regra de Negócio):** Onde residem os métodos de controle (CRUD) e as ações personalizadas (`@action`), como o fluxo de resgate de cupons.
4. **Signals (Eventos Assíncronos):** Mecanismos do Django que escutam eventos do banco de dados (ex: quando uma coleta é concluída) para disparar ações secundárias (como creditar pontos na carteira do morador).

---

## 🗄️ Modelagem do Banco de Dados (ER)

O backend é subdividido em dois sub-apps Django para garantir modularidade e separação de responsabilidades: `coleta` e `gamificacao`.

### App: `coleta`
* **`SolicitacaoColeta`:** Registra as requisições de descarte dos moradores.
  * `usuario` (Foreign Key -> User)
  * `tipo_residuo` (CharField com escolhas: Eletrônicos, Vidro, Plástico, Outro)
  * `endereco_descricao` (TextField - preenchido automaticamente pela API ViaCEP)
  * `cep` (CharField)
  * `data_preferencial` (DateField)
  * `observacoes` (TextField, opcional)
  * `status` (CharField com escolhas: Pendente, Em Rota, Concluído)
  * `criado_em` (DateTimeField)
* **`RotaOficial`:** Armazena o cronograma fixo dos caminhões de coleta urbana do município de Vassouras.
  * `bairro` (CharField)
  * `dia_semana` (CharField)
  * `horario_estimado` (TimeField)

### App: `gamificacao`
* **`Carteira`:** Registra a carteira virtual de pontos de cada morador de Vassouras.
  * `usuario` (OneToOneField -> User)
  * `saldo` (IntegerField - pontos ativos)
  * `total_historico` (IntegerField - pontos acumulados na vida do app)
* **`TransacaoPonto`:** Extrato financeiro detalhado de cada movimentação de pontos (Crédito ou Débito).
  * `carteira` (ForeignKey -> Carteira)
  * `quantidade` (IntegerField)
  * `tipo` (CharField: CREDITO ou DEBITO)
  * `descricao` (CharField - descrição da transação)
  * `data_transacao` (DateTimeField)
* **`EmpresaParceira`:** Cadastro dos comércios locais de Vassouras que apoiam o projeto gerando cupons.
  * `nome` (CharField)
  * `cnpj` (CharField)
* **`Cupom`:** Cupons de desconto oferecidos pelas empresas parceiras.
  * `empresa` (ForeignKey -> EmpresaParceira)
  * `titulo` (CharField)
  * `custo_pontos` (IntegerField)
  * `codigo_resgate` (CharField)
