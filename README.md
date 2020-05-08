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
import '@fre/ie'
```

### 兼容思路

- 1. babel

babel 打包不忽略 node_modules，预设一定要有 es3

- 2. API 兼容

`Array.forEach`、 `Array.isArray` 、`Array.some`、`Function.bind`、 `Performance.now`

以上是 fre 用到的高级 API，全都有 polyfill

- 3. text 的处理

重写 createTextNode 为 `x-text`，然后将 textContent 改为 `innerText`

- 4. 模拟事件

主要是对 addEventListener 和 removeEventListener 的模拟

### p.s.

欢迎大家跑着试试，现在主要以兼容为主，fre2 重构会适当照顾到兼容，有问题在这个仓库提
