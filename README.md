### email-editor

使用 `scss`, `Handlebars` 编写邮件的一个工具。

### 目的

由于编写邮件页面，必须要将 `css` 内联到 `html`, 按照正常的写法，非常蛋疼，不可维护。

正因为这样子，所以写了个 `gulp` 脚本来解决这些问题。

### 目录说明

`src/data`: `hbs` 变量的 `json` 文件

`src/entry`: 各个邮件页面的入口, 可以将入口模板 `hbs` 命名成和 data json 文件相同，这样 `gulp` 编译时就会使用相应数据。

`src/img`: 存放 `icon`，可以自行扩展一下，打包成 `sprite`

`src/partials`: 共用的 `hbs`

`src/styles`: `scss` 目录

`build/`: 最后生成的 `html`

### Usage

1. `npm i`
2. `npm run watch`
3. `npm run build`
