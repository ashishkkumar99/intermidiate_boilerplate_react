# Boilerplate

[docs](https://docs.google.com/document/d/1DkOYLjroCwYiykL0hdZVTVXWsRx_lPEzdDjEma4G0po/edit#heading=h.dxp0w9fvf833) for webpack+babel(basics) and HMR with react-hot-loader.

## Features

- basic react
- webpack
- babel
- react-hot-loader
- Prettier
- ESLint

## Basic prettier

To enable prettier in the project the IDE or text editor must have prettier extension. The IDE and text editor set the configuration for prettier to default. However we can change configuration via using .prettierrc file.  
Here I have not included parser key in the file because it is detected by the prettier automatically.  
Also set the printwidth according to the font size of your IDE or text editor.(for this project font=>width = 25=>70).

## ESlint

Prettier is code formater and eslint provides a structure to the code [formatter vs linter](https://medium.com/@awesomecode/format-code-vs-and-lint-code-95613798dcb3). There are many rules regarding structuring of code. So, rather then defining our own rules we use popular code structures like Airbnb.  
We also need to tell the eslint what parser we are going to use for this project we are using babel(babel-eslint parser for eslint).
Parser is used to build abstract syntax tree (AST).

Install folowing packages

```bash
npm install -D eslint babel-eslint prettier
npm install -D eslint-config-prettier eslint-plugin-prettier
npx install-peerdeps --dev eslint-config-airbnb
```

### Airbnb

Airbnb default export contains all of our ESLint rules, including ECMAScript 6+ and React. It requires eslint, eslint-plugin-import, eslint-plugin-react, eslint-plugin-react-hooks, and eslint-plugin-jsx-a11y.  
Hence it peerdeps should also be installed if you are working with react.

> peerdeps :- These dependent packages are needed by a product, similar to the normal dependencies. However, this product is not a final product. Instead, it is a library or plugin(react) to be consumed by a host application(Airbnb).

### prettier/prettier[error, rule]

This basically used to raise error when prettier rules are not being follwed. If no rules are specified ESLint will find the .prettierrc file in root directory and use it for further refrence. However on every save prettier changes are applied to the doc by the text editor or IDE hence there will be no prettier based error raised by ESLint after the save. So, there is no need to include this.  
However for this project we have included it. Just for shake of refrence.

### ESlint and webpack

ESlint is basically used for development purpose. And is not necessary to be included in the build process of webpack. So, we don't need eslint-loader.

## Imporatant points while setting ESlint

If you are using windows system then by default the line ending is CRLF. This will raise error. To eliminate this use LF as line ending in your IDE or text editor.  
Also add a
`/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */`
in App.jsx because hot loader is a dev-dependency and we are importing it in the module.
