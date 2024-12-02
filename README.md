# 工具库

## 安装

```js
npm i -g swell-node-core
```

## 使用

### 递归删除文件夹下符合标准的文件夹 默认是 node_modules

```js
snc rm
```

```js
snc rm [文件夹名]
```

<img src="https://github.com/18355166248/swell-node-core/blob/main/swell-node-core-rm.gif">

## 本地开发

打包 pnpm build

监听 使用 pnpm build:watch

### pnpm link

```js
pnpm link --global
```

### pnpm unlink

```js
pnpm unlink --global swell-node-core
```

这样就可以本地使用 snc 命令了

使用的时候前面要带 pnpm

```shell
pnpm snc rm
pnpm snv -v
pnpm snc stt
```
