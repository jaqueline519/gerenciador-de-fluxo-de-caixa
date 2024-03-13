# Bem-vindo ao Gerenciador de Fluxo de Caixa! 🌟

Fico muito feliz em ter você por aqui!

Esta é uma aplicação Angular, desenvolvida na versão 14 do Framework, criado para gerenciar um fluxo de caixa, seja para uso doméstico ou empresarial, nesta versão inicial oferecemos uma lista de categorias da API Open Food Facts, mas é claro,você pode inserir a sua própria descrição e deixar o seu gerenciamento mensal ainda mais claro.

Ah, e também temos a versão mobile, muito prático!

Bom, vamos para parte técnica!

## Pré-requisitos de execução local

Certifique-se de ter as seguintes instalações globais em seu ambiente para prosseguir:

- [Node.js](https://nodejs.org/) (versão 14.15.0 à 16,10.0)
- [npm](https://www.npmjs.com/) (normalmente instalado juntamente com o Node.js)
- [Angular CLI](https://angular.io/cli) (versão 14.2.0)

## Instalação

1. Clone este repositório para o seu ambiente local:

    ```bash
    git clone https://github.com/jaqueline519/gerenciador-de-fluxo-de-caixa.git
    ```

2. Instale as dependências do projeto usando o npm:

    ```bash
    npm install
    ```

## Execução e Visualização no Browser

Depois de instalar as dependências, você pode iniciar o servidor de desenvolvimento usando o seguinte comando:

- No bash ou prompt de comando, na pasta raiz do projeto, certifique-se de não estar utilizando a porta 4200 e 3000(não deve existir outro servidor local ativo em http://localhost:4200/ nem mesmo em http://localhost:3000/):

    ```bash
    npm run start:both
    ```

    Este comando iniciará o servidor de desenvolvimento local, neste projetos estamos utilizando um mock criado com json server, então vamos executar nosso backend fake e nosso frontend.
    No browser acesse [http://localhost:4200/](http://localhost:4200/).

## Testes Unitários

- **Execução: **

    ```bash
    npm test
    ```
## Muito obrigada pela sua visita!

