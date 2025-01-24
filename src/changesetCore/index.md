# changesets 使用

## 工具使用

全局安装

```shell
npm i -g pnpm
npm i -g swell-node-core
```

执行 swell-node-core 的命令 snc

发布预发布版

```shell
snc cp pre
```

发布正式版

```shell
snc cp
```

[官方文档](https://github.com/changesets/changesets?tab=readme-ov-file)

## 正式包发布

1. pnpm changeset
   初始化哪些项目需要更新哪种版本, 初始化后会在 .changeset 下生成文件, 可以修改
2. pnpm changeset version
   基于初始化的配置, 针对不同的包生成约定好的版本号
3. pnpm changeset publish
   动态拉取每个包, 比较线上和当前包的版本号是否相同, 如果高于的话, 触发 npm publish

## 测试包发布

1. pnpm changeset
2. pnpm changeset pre enter alpha
   常见的 tag 如下所示：
   | 名称 | 功能 |
   | ----- | ------------------------------------------------------------------------------------ |
   | alpha | 是内部测试版，一般不向外部发布，会有很多 Bug，一般只有测试人员使用 |
   | beta | 也是测试版，这个阶段的版本会一直加入新的功能。在 Alpha 版之后推出 |
   | rc | ReleaseCandidate 系统平台上就是发行候选版本。RC 版不会再加入新的功能了，主要着重于除错 |
3. pnpm changeset pre exit
4. pnpm changeset version
5. pnpm changeset publish
