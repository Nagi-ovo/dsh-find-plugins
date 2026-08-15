---
name: find-plugins
description: >
  用户想给 DeepSeek Harness 找插件时使用：「有没有插件能……」「帮我装个 XX」
  「生态里有什么好玩的」。从全 GitHub 的 dsh-plugin topic 发现跨个人与组织的
  公开仓库，筛选候选，等用户拍板，先汇报这个插件要什么权限，再从仓库声明判断
  安装方式并验证挂载。只负责找和装；开发新插件转 make-dsh-plugin。
---

# 找插件、装插件

把 GitHub 的 `dsh-plugin` topic 当作插件身份，不把某个 owner 或组织当作目录。
仓库转移后以搜索结果返回的最新 `fullName` 和 `url` 为准。完成态只有一个：用户
选中的插件在他的 DSH 里可用。

## Step 1：取候选池

运行本 skill 自带的确定性检索脚本：

```sh
node <本 skill 目录>/scripts/search-topic.mjs > <临时目录>/dsh-plugins.json
```

脚本搜索所有公开、未归档、非 fork、带 `dsh-plugin` topic 的仓库，并处理 GitHub
分页。它依次复用 `GITHUB_TOKEN` / `GH_TOKEN`、本机 `gh` 登录令牌以提高限额；都
没有时使用公开 API。限流时运行 `gh auth login` 后重试，不要退回组织仓库列表。

完成点：JSON 中的 `repositories` 非空，每条都有当前 `fullName`、`url`、描述、
topics 和更新时间。按 `fullName` 去重，不根据旧 owner 猜地址。

## Step 2：筛选并确认装法

先用用户需求对照 `name`、`description`、`topics`，按 `pushedAt` 优先查看较新的
命中项。只对语义最匹配的少量仓库读取 README、`package.json` 和仓库文件树：

- `package.json` 声明 `dsh.bundle.patch`：`bundle`。
- 含一个或多个 `SKILL.md`，且没有 bundle 声明：`skill`。
- README 明确要求写入 `cordis.patch.yml`，但没有 bundle 声明：`cordis`。
- 只有 `.dsh-plugin` / `repository` 旧格式：标成「需迁移」，不能直接安装。
- 仍无法判断：标成「需核对」，不要编造安装命令。

如果当前账号能读取 `dsh-external/hub/catalog.json`，可以把其中的 `note`、
`category`、`managers` 当补充信息；只接受 `url` 与 topic 搜索结果当前 URL 完全匹配
的条目。Hub 缺失、私有或仍指向转移前地址都不影响发现结果，也不能覆盖仓库自身
的当前声明。

产出最多 3 行候选表：名字、一句话用途、最近更新、装法。表后用一句话说明首选
理由。比如「整活 / 复古 / 好玩」可命中
[dsh-ads](https://github.com/Nagi-ovo/dsh-ads)；「把数据、流程和对比画出来」可命中
[dsh-visualize](https://github.com/Nagi-ovo/dsh-visualize)。

一条都不匹配时直说 topic 目录里没有，并问是否转 `make-dsh-plugin` 现写一个。

## Step 3：用户拍板

停下来等选择。用户已经点名某个插件时，从 Step 2 核对当前仓库和装法后直接进入
Step 4。

## Step 4：安全检查并汇报

用户点头之后、动手之前，先看一遍这个插件装进来会拿到什么。插件运行在用户的
DSH 进程里，能读会话、调工具、跑命令，装它等于授权，所以这一步不能跳过，也不
能只在发现问题时才出声。

至少看这四处：

- `package.json` 的 lifecycle scripts：`preinstall`、`install`、`postinstall`、
  `prepare` 在 Git / npm 安装时会执行。
- 插件声明和源码里对外的动作：网络请求、子进程、写 `$DSH_HOME` 之外的路径、
  改 shell 配置或系统设置。
- 插件读取的会话数据和凭据：读会话日志、settings、`.env` 或 credentials 的地方。
- 仓库本身的可信度：`pushedAt`、star 数、作者是否还有其他 dsh 插件、README 与
  代码是否对得上。

**不管有没有发现问题，都要汇报**，三到五行讲清：查了哪几处、这个插件实际要什么
权限、有没有和它宣称的用途对不上的动作。有可疑项就把原文贴出来，别转述。

汇报完再问一次是否继续。用户说停就停在这里，不要顺手装完。

完成点：用户看过这份汇报，并明确说继续。

## Step 5：安装

按确认出的安装类型打开 [references/install-methods.md](references/install-methods.md)
并照对应小节操作。多个方式并存时按该文件开头的优先级选一种。

安装过程中冒出 Step 4 没看到的动作（新的下载源、额外的写入路径、要求提权），
停下来把原文交给用户，不要边装边判断。

完成点：配置写入、依赖装完、命令零报错。

## Step 6：验证挂载

web 等长驻 surface 监听 patch 文件改动后热载；一次性运行下次启动才生效。请用户
确认相应 UI、工具或技能条目出现。

没出现时依次排查：服务日志中的 `hmr/config-update-failed`、Git spec 是否仍用了
转移前 owner、ref / path 拼写、profile 目录的 `pnpm install` 是否成功。

完成点：用户确认可用；或把具体报错和已排除的原因一并带回。
