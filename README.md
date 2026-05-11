# EcoVass - Backend API ♻️
> Sistema Inteligente de Incentivo à Coleta Seletiva Urbana para o Município de Vassouras/RJ.

Este repositório contém a API do backend da plataforma **EcoVass**, desenvolvida como projeto de Trabalho de Conclusão de Curso (TCC) em Engenharia de Software. O ecossistema visa conectar moradores da cidade de Vassouras a rotas oficiais de coleta de resíduos recicláveis e eletrônicos, gamificando o processo de descarte correto por meio de uma carteira digital de pontos trocáveis por cupons de desconto no comércio local.

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

python manage.py runserver

📖 Links Rápidos para Documentações Detalhadas
Para entender as regras de negócios, os fluxos financeiros do ecossistema e as integrações com APIs externas, acesse as documentações de suporte que criamos no repositório:

📂 DOCUMENTACAO.md: Arquitetura geral do sistema, modelagem do banco de dados e fluxos de dados das requisições.

📂 FEATURES.md: Guia completo de funcionalidades implementadas (Segurança JWT, Economia dos Cupons e Automação Geográfica de CEP).

