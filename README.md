# library-management-system
Web app for managing a library. Built using React, Django and SQLite

# Conceitos e organização

**library-api** é a Api REST desenvolvida em node usando o framework express.

**library-manager** é a interface web desenvolvida usando o framework React.js com react-router.

**library-database** é o arquivo de banco de dados da biblioteca em sqlite

# Configurando o projeto
- Instalar o node `sudo dnf install node`, isso para sistemas baseados em fedora.
    - O gerenciador de pacotes npm será instalado automaticamente.
- Para sistemas baseados em Ubuntu, instalar usando `sudo apt install nodejs npm`.

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
 
# 🧭 Funcionalidades da Aplicação

## Catálogo de Obras (Home)

- A página inicial da biblioteca apresenta um catálogo com todas as obras disponíveis, exibindo informações como:
    - Título da obra
    - Autor
    - Editora
    - ISBN
    - Capa do livro

É possível pesquisar livros por qualquer um desses critérios. Cada obra possui um botão “Ver detalhes”, que redireciona para uma página com informações complementares.

## 📝 Cadastro de Usuários

- A aplicação possui duas telas de cadastro:
    - **Cadastro de Aluno**: acessível a partir da Home, permite preencher os dados pessoais, RA e curso do aluno.
    - **Cadastro de Servidor**: acessível apenas por administradores. Permite inserir o registro funcional e selecionar o departamento do servidor.


## Referências
Auth: https://medium.com/@sustiono19/how-to-create-a-protected-route-in-react-with-react-router-dom-v7-6680dae765fb
