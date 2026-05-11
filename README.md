# EcoVass - Backend API ♻️
> Sistema Inteligente de Incentivo à Coleta Seletiva Urbana para o Município de Vassouras/RJ.

Este repositório contém a API do backend da plataforma **EcoVass**, desenvolvida como projeto de Trabalho de Conclusão de Curso (TCC) em Engenharia de Software. O ecossistema visa conectar moradores da cidade de Vassouras a rotas oficiais de coleta de resíduos recicláveis e eletrônicos, gamificando o processo de descarte correto por meio de uma carteira digital de pontos trocáveis por cupons de desconto no comércio local.

---

## 🔌 Integração com o Front-end & Fluxo de Segurança

A API foi projetada para se comunicar de forma assíncrona com o aplicativo mobile (React Native) através de requisições HTTP (Axios).

1. **Autenticação Segura (JWT):** O aplicativo realiza o login enviando as credenciais para o endpoint `/api/token/`. O Django valida os dados no banco SQLite e retorna um Token JWT.
2. **Validação de Perfil (Progressive Disclosure):** Ao se autenticar, o aplicativo verifica se o usuário possui endereço cadastrado. Caso não possua, o fluxo direciona o morador para uma tela intermediária de captura de localização (`EnderecoScreen`) antes de liberar o acesso à interface principal.
3. **Geolocalização por Bairro:** A rua e o bairro informados são salvos no perfil do usuário para filtrar e exibir o cronograma exato das rotas da coleta seletiva municipal na região dele.

---

## 🎮 Regras de Negócio e Gamificação

O ganho de pontos foi estruturado com base na relevância ecológica e complexidade de descarte dos materiais, seguindo o fluxo operacional real:
1. O morador sinaliza pelo aplicativo que aguardará o caminhão da coleta seletiva (Check-in).
2. O coletor recolhe os materiais na calçada e confirma a coleta no sistema.
3. Os pontos são computados automaticamente na carteira digital do usuário conforme os critérios:
   * **Plástico / Papel:** +20 pontos por saco entregue.
   * **Vidro / Metal:** +50 pontos por saco entregue.

---

## 🚀 Como Executar o Projeto Localmente

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* Python 3.10 ou superior
* Git

### 2. Clonar o Repositório e Instalar Dependências
```bash
# Clonar o repositório
git clone [https://github.com/seu-usuario/ecovass-backend.git](https://github.com/seu-usuario/ecovass-backend.git)
cd ecovass-backend

# Criar e ativar o ambiente virtual (venv)
python -m venv venv

# No Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# No Windows (Prompt de Comando):
.\venv\Scripts\activate.bat
# No Linux/macOS:
source venv/bin/activate

# Instalar as dependências do projeto
pip install -r requirements.txt

# Criar o arquivo de migrações e aplicar ao banco de dados SQLite
python manage.py makemigrations
python manage.py migrate

# Criar um superusuário para acessar o painel administrativo do Django
python manage.py createsuperuser

# Executar o servidor de desenvolvimento
python manage.py runserver

📖 Links Rápidos para Documentações Detalhadas
Para entender as regras de negócios, os fluxos financeiros do ecossistema e as integrações com APIs externas, acesse as documentações de suporte que criei no repositório:

📂 DOCUMENTACAO.md: Arquitetura geral do sistema, modelagem do banco de dados e fluxos de dados das requisições.

📂 FEATURES.md: Guia completo de funcionalidades implementadas (Segurança JWT, Economia dos Cupons e Automação Geográfica de CEP).
