# library-management-system
Web app for managing a library. Built using React, Django and SQLite

# Conceitos e organização

**library-api** é a Api REST desenvolvida em node usando o framework express.

**library-manager** é a interface web desenvolvida usando o framework React.js com react-router.

**library-database** é o arquivo de banco de dados da biblioteca em sqlite

# Configurando o projeto
- Instalar o node `sudo dnf install node`.
    - O gerenciador de pacotes npm será instalado automaticamente.

## Instalando as dependências
Depencias npm geralmente são instaladas localmente para cada projeto, a lista de dependências de um projeto node está sempre localizada em `package.json > dependencies`.

Para instalar as dependências desse projeto:
- Acessar `library-api` e executar `npm install` 
    - Express
    - Sequelize
    - Sqlite3
- Acessar `library-manager` e executar `npm install`
    - React
    - React Router
    - React-Bootstrap
    - React-Toastify
    - Bootstrap icons

## Referências
Auth: https://medium.com/@sustiono19/how-to-create-a-protected-route-in-react-with-react-router-dom-v7-6680dae765fb