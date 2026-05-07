# Protótipo de Coleta Seletiva - Vassouras/RJ ♻️

Este projeto é um protótipo de aplicação para gestão de coleta seletiva de resíduos, desenvolvido como parte do curso de **Engenharia de Software (5º Período)** para a disciplina de Práticas Extensionistas Integradas.

## 🚀 Sobre o Projeto
O objetivo é otimizar o processo de reciclagem na cidade de Vassouras através de uma plataforma que conecta cidadãos e serviços de coleta, utilizando elementos de gamificação para incentivar o descarte correto.

## 🛠️ Tecnologias Utilizadas
- **Backend:** Python & Django
- **Banco de Dados:** SQLite (Desenvolvimento)
- **Prototipação:** Figma
- **Lógica:** Python com foco em rotas, agendamentos e regras de pontuação.

## 📋 Funcionalidades
- [x] Cadastro de usuários e pontos de coleta.
- [x] Definição de rotas e cronogramas de coleta.
- [x] Lógica de gamificação para incentivo à reciclagem.
- [ ] Integração com mapa em tempo real (Em desenvolvimento).

## 🔧 Como executar o projeto
1. Clone o repositório:
   ```bash
   git clone [https://github.com/prates-k/Prototipo-EcoVass/tree/main]
   (https://github.com/prates-k/Prototipo-EcoVass/tree/main)

2. Crie e ative o ambiente virtual:
python -m venv venv
# No Windows:
.\venv\Scripts\activate

3. Instale as dependências:
pip install -r requirements.txt

4. Execute as migrações e inicie o servidor:
python manage.py migrate
python manage.py runserver

