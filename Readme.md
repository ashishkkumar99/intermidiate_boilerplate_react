# Boilerplate

[webpack+babel(basics) + HMR with react-hot-loader](https://docs.google.com/document/d/1DkOYLjroCwYiykL0hdZVTVXWsRx_lPEzdDjEma4G0po/edit#heading=h.dxp0w9fvf833)

## Features

- basic react
- webpack
- babel
- react-hot-loader
- Prettier
- ESLint

## Bable, Webpack and react-hot-loder
For buliding JSX and ESnext scripts webpack needs bable loader.
To integrate react-hot-loader in the webpack-dev-server, add react-hot-loader/babel plugin to babel and export your root component using hot API of react-hot-loader.
Also make sure that the hot key in devServer option of webpack.deve.js is set to true, this allows HMR(Hot module replacement).
Required Installation
```bash
npm install babel babel-loader webpack webpack-dev-server react-hot-loader
```

## Basic prettier intergration(without linter)

To integrate prettier without linter in the project the IDE or text editor must have prettier extension. The IDE and text editor set the configuration for prettier to default. However we can change configuration via using .prettierrc file.  
In this project I have not included parser key in the .prettierrc file because it is detected by the prettier automatically.  
Also set the printwidth according to the font size of your IDE or text editor.(for this project font=>width = 25=>70).  

To format on every save make sure the IDE settings have format on save true.
```json
"editor.formatOnSave": true
```
This reduces the burden of running prettier cli before commiting
To install prettier
```bash
npm install -D eslint prettier
```

## ESlint

Prettier is code formater and eslint provides a structure to the code [formatter vs linter](https://medium.com/@awesomecode/format-code-vs-and-lint-code-95613798dcb3). There are many rules regarding structuring of code. So, rather then fumbling over the rules we use popular code structures like Airbnb.  
We also need to tell the eslint what parser we are going to use. For this project we are using babel(babel-eslint extension sholud be used for this).

> Parser build abstract syntax tree (AST), And then perfrom the required operations like version down.

Install folowing packages

```bash
npm install -D eslint babel-eslint
npm install -D eslint-config-prettier
npx install-peerdeps --dev eslint-config-airbnb
```
### Airbnb
Airbnb default export contains all of our ESLint rules, including ECMAScript 6+ and React. It requires eslint, eslint-plugin-import, eslint-plugin-react, eslint-plugin-react-hooks, and eslint-plugin-jsx-a11y.  
Hence it peerdeps should also be installed if you are working with react. That is why we are using `npx install-peerdeps --dev eslint-config-airbnb`

> peerdeps :- These dependent packages are needed by a product, similar to the normal dependencies. However, this product is not a final product. Instead, it is a library or plugin(react) to be consumed by a host application(Airbnb).

## Formatting [Prettier vs Eslint]
If you are using linter for formatting these problems may be very annoying to you:
* You end up with a lot of red squiggly lines in your editor, which gets annoying. Prettier is supposed to make you forget about formatting – and not be in your face about it!
* They are slower than running Prettier directly.
* They’re yet one layer of indirection where things may break.
Adding to point three, the layer of indirection is because of AST(abstract syntax tree). Any linter(ESlint) first make AST and then perform formatting whereas a formatter(prettier) overwirtes within the code.


## Integration of Prettier and Linter
There are two ways to use Prettier and linters together. The first approach is to simply let each tool do what it was meant for: Prettier formats and the linter lints. You do this by disabling any rules in your linter that check formatting and let Prettier automatically handle all the formatting. The second approach is to use the linter to run prettier though a plugin with the linter. 
### Disable Formatting Rules in the Linter(I have used this)
The **easiest and recommended** way of integrating with linters is to let Prettier do the formatting and configure the linter to not deal with formatting rules. 
To configure ESlint for this I have used premade config **[eslint-config-prettier]**(https://github.com/prettier/eslint-config-prettier). This will turns off all rules that are unnecessary or might conflict with Prettier. Note that this config only turns rules off, so it only makes sense using it together with some other config.
To exclude prettier from eslint, extend eslint-config-prettier extension like this.
```json
{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
```
Add extra exclusions for the plugins you use like so:
```json
{
  "extends": [
    "some-other-config-you-use",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/babel",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard",
    "prettier/unicorn",
    "prettier/vue"
  ]
}
```
If you extend a config which uses a plugin, it is recommended to add "prettier/that-plugin" (if available). For example, eslint-config-airbnb enables eslint-plugin-react rules, so "prettier/react" is needed:
```json
{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ]
}
```
**In our case we are using react and airbnb both, so we will extend like above code**.
After disabling prettier feature from eslint follow basic prettier integration expalined above.

You can find instructions on how to configure other linter on the Prettier docs site.
- **TSLint**: [Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) | [Configuration](https://prettier.io/docs/en/integrating-with-linters.html#disable-formatting-rules-1)
- **Stylelint**: [Extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) | [Configuration](https://prettier.io/docs/en/integrating-with-linters.html#disable-formatting-rules-2)

You can enable Auto-Fix on Save for ESLint, TSLint or Stylelint and still have formatting and quick fixes:
```json
"eslint.codeActionsOnSave.mode": "all"
//replace eslint to tslint or stylelint appropriatly
```

> NOTE: If you are seeing conflicts between Prettier and ESLint this is because you don't have the right ESLint or TSLint rules set as explained in the [Prettier documentation](https://prettier.io/docs/en/integrating-with-linters.html).

### Run Prettier through Linters(not recommended)

Another option to run Prettier and linters together is to have the linters run Prettier. For these configurations you ***DO NOT USE THIS EXTENSION***. Instead you use the linter extensions to run the linter and Prettier. See the Prettier documentation for instructions on how to configure each linter. This setup is generally ***not recommended***, but can be useful in certain circumstances. To learn about why you probably should avoid this setup see [the prettier documentation](https://prettier.io/docs/en/integrating-with-linters.html#notes).

For eslint we have to install eslint-plugin-prettier package.
**eslint-plugin-prettier does not install Prettier or ESLint for you. You must install these yourself.**

Then, in your .eslintrc.json:
```json
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```
The genral stntax for rule prettier rule is `"prettier/prettier": ["error", {config}]` ex. `"prettier/prettier": ["error", {"singleQuote": true, "parser": "flow"}]`. However if no config is defined the plugin will try to locate `.prettierrc` file in root directory and apply those configuration.
We can also do like this
```json
{
  "extends": ["plugin:prettier/recommended"]
}
```
This does three things:
* Enables **eslint-plugin-prettier**.
* Sets the **prettier/prettier rule to "error"**.
* Extends the **eslint-config-prettier configuration**.
For Tslint and stylelint you can follow bellow links:-
- **TSLint**: [Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) | [Configuration](https://prettier.io/docs/en/integrating-with-linters.html#use-tslint-to-run-prettier)
- **Stylelint**: [Extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) | [Configuration](https://prettier.io/docs/en/integrating-with-linters.html#use-stylelint-to-run-prettier)

Disable format on save so this extension doesn't run and enable code actions to run the linters on save.

```
"editor.formatOnSave": false,
"editor.codeActionsOnSave": {
    // For ESLint
    "source.fixAll.eslint": true,
    // For TSLint
    "source.fixAll.tslint": true,
    // For Stylelint
    "source.fixAll.stylelint": true
}
```

## ESlint and webpack

ESlint is basically used for development purpose. And is not necessary to be included in the build process of webpack. So, we don't need eslint-loader.

## Imporatant points while setting ESlint

- If you are using windows system then by default the line ending is CRLF. This will raise error. To eliminate this use LF as line ending in your IDE or text editor.
- Also add a
  `import/no-extraneous-dependencies: ["error", {"devDependencies": true}]`
  in eslint because in App.jsx, hot loader is a dev-dependency and we are importing it in the module.
  Similarly HMR in webpack config
