# Teste para imobiliaria

## Dependências

- node 19 ou superior

Instale as dependencias do projeto

```bash
yarn ou npm install
```

Levante o servidor

```bash
yarn dev ou npm run dev
```

Acesse o projeto no navegador pela porta 5000

```bash
http://localhost:5000/
```

## Sobre a API

Devido aos headers da api, não é possivel buscar os dados por problemas de CORS, no entanto,
fiz um servidor muito simples com [express](https://expressjs.com/) apenas para fornecer os dados recriando os endpoints localmente. Já com as
imagens dos imoveis, infelizmente não foi possivel devido a restrições na config do assets na amazon

Para conferir os endpoints acesse:

```bash
http://localhost:5000/oportunities/
http://localhost:5000/oportunity/[:id]
```

Já os scripts de configuração e requisição da api estão no diretório `/api`

## Sobre os scripts e interface

Atendendo ao requisitos do teste não utilizei nenhum framework, para agilizar e escalar o desenvolvimento da interface optei por utilizar
um bundle js muito simples o [rollup](https://rollupjs.org/), com o objetivo de unificar meus scripts em um unico arquivo. Os arquivos js
fonte da aplicação ficam no diretório `src`.

> **Warning**
> Todo os scripts são JS puro e feitos manualmente, bem como o css e html. Exceto o arquivo `/src/custom-select.js` responsável pela customização
> das tags `select` do html, que criei baseado em uma referência garimpada da internet.

Os arquivos que fornecem a interface do site no browser podem ser acessados e lidos no diretório `/public/`
