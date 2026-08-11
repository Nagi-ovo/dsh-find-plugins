# 安装方式对照

按 catalog 条目 `managers` 数组的值查小节。多值并存时的优先级：
`bundle` > `repository` > `cordis` > 外部管理器（`marisa` / `mygo`）——
前两种是官方推荐通道，装好即随 patch 层热载。

下文 `<profile>` 指目标 profile 名（web 界面对应 `web`）。

## bundle —— 官方 profile bundle

包的 package.json 声明了 `dsh.bundle.patch`，安装进 profile 即挂载它自带的
patch 层：

```sh
dsh plugin --profile <profile> add <package>
```

CLI 不可用时手工等价操作：

1. `$DSH_HOME/profiles/<profile>/package.json` 的 `dependencies` 加包
   （GitHub 源写 `github:dsh-external/<repo>`，本地开发写 `link:<路径>`）。
2. 同文件 `dsh.profile.bundles` 数组末尾追加包名（列表顺序即 patch 层
   应用顺序，官方 bundle 在前）。
3. 在该 profile 目录执行 `pnpm install`。

## repository —— 仓库源插件（0809 格式）

仓库内 `.dsh-plugin` 包即插件本体。在 patch 层给 `repository-plugins` 行
补一个源——单 profile 写 `$DSH_HOME/profiles/<profile>/cordis.patch.yml`，
全部 profile 共用写 `$DSH_HOME/cordis.patch.yml`：

```yaml
- id: repository-plugins
  name: '@deepseek-ai/dsh-repository-plugin'
  config:
    repositories:
      - 'github:dsh-external/<repo>#<commit>'
```

- ref 写 commit 最稳；tag 和 branch 也接受。
- `.dsh-plugin` 不在仓库根时，源末尾追加 `&path:/<子目录>/.dsh-plugin`。
- 同一源字符串永久命中缓存，更新插件 = 换 ref。
- 私有仓库靠主机 Git 自身的凭据（credential helper / SSH agent）；
  环境变量里的 token 不会传进安装流程。

## cordis —— 裸 cordis 插件挂载

包是普通 cordis 插件、没有自带 patch 层。先按 bundle 小节第 1、3 步把包装进
profile，再在 `$DSH_HOME/profiles/<profile>/cordis.patch.yml` 顶层数组加一个
insert 条目：

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

目录有 watcher，放进去即生效，不用重启。

## marisa / mygo —— 外部管理器

这两类由社区管理器接管，本 skill 不代劳：marisa 用它的 `dshx install`
和设置页插件面板，mygo 按其仓库 README 操作。用户没装对应管理器时，
先把管理器仓库链接给用户并说明这是前置条件。
