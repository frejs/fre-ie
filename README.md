# Fre ie

> fre ie 兼容处理（IE8+. Not IE7）

### Run

```console
yarn start
```

### Use

```shell
yarn add @fre/ie
```
```js
const IE8 = require('./webpack-ie8-plugin/index')

plugins: [
    new Es3ifyPlugin(),
    new IE8() // 此处是 webpack 的 polyfill
]

import '@fre/ie' // 业务入口文件引入，fre 的 polyfill
```


### 动机

目前主流前端框架都不支持 ie，react16 已经不可能支持 ie8 了，vue 更是想都别想

然而 ie8+ 在国内仍有很高的占有率

fre 代码量非常小，没有用到几个高级 API，所以兼容起来十分简单

### 兼容思路

- webpack 兼容

webpack 最新版本自身不支持 ie8，所以我们要打补丁，幸运的是，webpack4 高级 API 也不多

`Object.defineproperty`、 `Object.create` 、`Function.bind`


- fre 兼容

`Array.forEach`、 `Array.isArray` 、`Array.some`、`Performance.now`

以上是 fre 用到的高级 API，也需要打补丁，幸好也不多

- text 的处理

重写 createTextNode 为 `x-text`，然后将 textContent 改为 `innerText`

- 模拟事件

主要是对 addEventListener 和 removeEventListener 的模拟

### 不足

- 不能使用 webpack-dev-server

由于 ie8 并不支持 webSocket（webpack 是 eventSource），所以基本上所有的通信插件都用不了

- fre 还不是很完美

fre2 重构会适当照顾到兼容，达到一个极佳的平衡
