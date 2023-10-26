# escriba

Olá! Bem vindo a este projeto!

## Configuração recomendada da IDE:

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Configuração do projeto:

Crie um novo projeto Vue via Vite (ou outro build de sua preferência) com o seguinte comando:

```sh
npm create vue@latest
```

Siga as instruções de configuração.

Apague a pasta "src" e substitua pela que está no arquivo .ZIP.
Também substitua o arquivo "package.json" da raiz do projeto pelo que está no arquivo .ZIP.

Em seguida, no terminal do VS Code, dentro da pasta do projeto criado, digite:

```sh
  npm install
  npm run format

```

### Para compilação e hot-reload do projeto, digite:

```sh
npm run dev
```

### Para salvar os dados

Salve o arquivo "data.json" na raiz do seu projeto e no terminal digite o seguinte comando:

```sh
npx json-server --watch data.json
```
