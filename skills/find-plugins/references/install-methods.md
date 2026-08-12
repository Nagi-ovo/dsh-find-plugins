# 安装方式对照

按 catalog 条目 `managers` 数组的值查小节。多值并存时的优先级：
`bundle` > `cordis` > 外部管理器（`marisa` / `mygo`）。`repository` 已从
最新 DSH 移除；同一条目还有 `bundle` 时走 bundle，只有 `repository` 时停止并
说明该插件需要迁移。

下文 `<profile>` 指目标 profile 名（web 界面对应 `web`），`<dsh-source>` 指
用户当前运行的 DeepSeek Harness 源码 checkout。最新 DSH 不再分发全局 `dsh`
launcher，命令从该 checkout 根目录通过 `pnpm dsh` 运行。

## bundle —— 官方 profile bundle

包的 package.json 声明了 `dsh.bundle.patch`，安装进 profile 即挂载它自带的
patch 层：

```sh
cd <dsh-source>
pnpm dsh plugin --profile <profile> add <package-or-git-spec>
```

私有组织仓库通常使用锁定 commit 的 Git spec：

```sh
pnpm dsh plugin --profile <profile> add 'github:dsh-external/<repo>#<commit>'
```

README 指定 `&path:/<子目录>` 时保留该参数。安装命令会交给 profile 的 pnpm，
成功后自动把声明了 `dsh.bundle.patch` 的包加入 `dsh.profile.bundles`。

CLI 不可用时手工等价操作：

1. `$DSH_HOME/profiles/<profile>/package.json` 的 `dependencies` 加包
   （GitHub 源写 `github:dsh-external/<repo>`，本地开发写 `link:<路径>`）。
2. 同文件 `dsh.profile.bundles` 数组末尾追加包名（列表顺序即 patch 层
   应用顺序，官方 bundle 在前）。
3. 在该 profile 目录执行 `pnpm install`。

## repository —— 已移除的旧格式

最新 DSH 已删除 `@deepseek-ai/dsh-repository-plugin`、`.dsh-plugin`、repository
cache 和对应配置行，不提供兼容解析。只有 `repository` 标记的插件不能安装；
报告仓库链接和「需要迁移为 profile bundle」，不要写旧配置或声称已挂载。

## cordis —— 裸 cordis 插件挂载

包是普通 Cordis 插件、没有自带 patch 层。先用 `pnpm dsh plugin --profile
<profile> add <package-or-git-spec>` 把包装进 profile；CLI 会提示它是普通依赖。
再在 `$DSH_HOME/profiles/<profile>/cordis.patch.yml` 顶层数组加一个 insert 条目：

```yaml
- insert:
    - name: '@dsh-external/<package>'
      config: {}
```

`config` 字段照该插件 README 填；README 给了现成挂载片段的以仓库为准。

## skill —— 技能目录

仓库分发的是技能（`SKILL.md` 目录），clone 后把含 `SKILL.md` 的目录整个
拷进任一发现根：

- 只给当前项目：`<项目根>/.agents/skills/<技能名>/`
- 全局：`$DSH_HOME/skills/<技能名>/`
- 共享 agent 根：`${DSH_AGENTS_HOME:-~/.agents}/skills/<技能名>/`

目录有 watcher，放进去即生效，不用重启。

## marisa / mygo —— 外部管理器

这两类由社区管理器接管，本 skill 不代劳：marisa 用它的 `dshx install`
和设置页插件面板，mygo 按其仓库 README 操作。用户没装对应管理器时，
先把管理器仓库链接给用户并说明这是前置条件。
