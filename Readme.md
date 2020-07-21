# Boilerplate

[webpack+babel(basics) + HMR with react-hot-loader](https://docs.google.com/document/d/1DkOYLjroCwYiykL0hdZVTVXWsRx_lPEzdDjEma4G0po/edit#heading=h.dxp0w9fvf833)

## Features

- basic react
- webpack
- babel
- react-hot-loader
- Prettier
- ESLint

## bable, webpack and react-hot-loder
For buliding JSX and ESnext scripts webpack needs bable loader.
To integrate react-hot-loader in the webpack, add react-hot-loader/babel plugin to babel and export your root component using hot API of react-hot-loader.
Also make sure that the hot key in devServer option of webpack.config.js is set to true, this allows HMR(Hot module replacement).

## Basic prettier

To enable prettier in the project the IDE or text editor must have prettier extension. The IDE and text editor set the configuration for prettier to default. However we can change configuration via using .prettierrc file.  
In this project I have not included parser key in the .prettierrc file because it is detected by the prettier automatically.  
Also set the printwidth according to the font size of your IDE or text editor.(for this project font=>width = 25=>70).

## ESlint

Prettier is code formater and eslint provides a structure to the code [formatter vs linter](https://medium.com/@awesomecode/format-code-vs-and-lint-code-95613798dcb3). There are many rules regarding structuring of code. So, rather then fumbling over the rules we use popular code structures like Airbnb.  
We also need to tell the eslint what parser we are going to use. For this project we are using babel(babel-eslint extension for eslint).

> Parser build abstract syntax tree (AST), And then perfrom the required operations

Install folowing packages

```bash
npm install -D eslint babel-eslint prettier
npm install -D eslint-config-prettier eslint-plugin-prettier
npx install-peerdeps --dev eslint-config-airbnb
```

### Airbnb

Airbnb default export contains all of our ESLint rules, including ECMAScript 6+ and React. It requires eslint, eslint-plugin-import, eslint-plugin-react, eslint-plugin-react-hooks, and eslint-plugin-jsx-a11y.  
Hence it peerdeps should also be installed if you are working with react. That is why we are using `npx install-peerdeps --dev eslint-config-airbnb`

> peerdeps :- These dependent packages are needed by a product, similar to the normal dependencies. However, this product is not a final product. Instead, it is a library or plugin(react) to be consumed by a host application(Airbnb).

### prettier/prettier[error, rule]

This basically used to raise error when prettier rules are not being follwed. If no rules are specified ESLint will find the .prettierrc file in root directory and use it for further refrence. However on every save prettier changes are applied to the doc by the text editor or IDE (if prettier is configured correctly).  
As the changes are applied on every save the ESLint will never raise prettier error but we have to include this rule for project consistency.

### ESlint and webpack

ESlint is basically used for development purpose. And is not necessary to be included in the build process of webpack. So, we don't need eslint-loader.

## Imporatant points while setting ESlint

- If you are using windows system then by default the line ending is CRLF. This will raise error. To eliminate this use LF as line ending in your IDE or text editor.
- Also add a
  `import/no-extraneous-dependencies: ["error", {"devDependencies": true}]`
  in eslint because in App.jsx, hot loader is a dev-dependency and we are importing it in the module.
  Similarly HMR in webpack config
