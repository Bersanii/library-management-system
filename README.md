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
 
## 🛠️ Dashboard do Administrador

- Além do catálogo de obras, o administrador tem acesso a um painel de controle, com as seguintes funcionalidades:
    - Cadastrar novos servidores
    - Excluir alunos e servidores existentes
 
## 🎓 Dashboard do Aluno

- Além do catálogo, os alunos têm acesso a uma aba de empréstimos, que exibe:
    - Obras atualmente emprestadas
    - Prazo de devolução
    - Quantidade de exemplares emprestados
    - Status de devolução de cada exemplar
 
## 👨‍🏫 Dashboard do Servidor

- O dashboard dos servidores oferece acesso a três seções adicionais:
  
    📚 **Gerenciamento de Obras**
    -  Visualização de ISBN e título das obras cadastradas
    -  Link para visualizar detalhes da obra
    -  Opção para excluir obras
    -  Barra de pesquisa para localizar obras específicas
    -  Cadastro de novas obras com número de exemplares

    📦 **Empréstimo**
    -  Definição do prazo de devolução
    -  Informar o CPF do aluno
    -  Seleção das obras emprestadas
    -  Registro do empréstimo


    🔄 **Devolução**
    -  Pesquisa de empréstimos ativos por CPF
    -  Visualização das obras emprestadas
    -  Indicação de status de devolução
    -  Botão para registrar devolução de cada obra

## 🔐 Login

- Tela de autenticação com:
  - Campo para CPF (login)
  - Campo para senha
  - Link para criação de conta por alunos ainda não cadastrados

## 📖 Página da Obra

- Exibe informações detalhadas da obra selecionada:
  - Número de páginas
  - Descrição da obra
  - Lista de exemplares disponíveis para reserva
  - Indicação de exemplares já emprestados
 
  # 📚 Banco de Dados da Biblioteca

Este repositório contém a estrutura de um banco de dados SQLite utilizado para o gerenciamento de uma biblioteca. Abaixo está a descrição do esquema da base de dados

## 🔹 Tabela usuarios
- Armazena informações de todos os usuários cadastrados, sejam alunos, servidores ou administradores.

| Campo            | Tipo         | Descrição                               |
| ---------------- | ------------ | --------------------------------------- |
| `cpf`            | VARCHAR(255) | Identificador único do usuário (**PK**) |
| `nome`           | VARCHAR(255) | Nome completo do usuário                |
| `endereco`       | VARCHAR(255) | Endereço residencial                    |
| `dataNascimento` | DATETIME     | Data de nascimento                      |
| `contato`        | VARCHAR(255) | Telefone ou e-mail                      |
| `tipo`           | VARCHAR(255) | Tipo de usuário (`Alu`, `Ser`, `Adm`)   |
| `senha`          | VARCHAR(255) | Senha de acesso                         |



## Referências
Auth: https://medium.com/@sustiono19/how-to-create-a-protected-route-in-react-with-react-router-dom-v7-6680dae765fb
