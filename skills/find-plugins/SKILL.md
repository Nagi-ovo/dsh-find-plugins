---
name: find-plugins
description: >
  用户想给 DeepSeek Harness 找插件时使用：「有没有插件能……」「帮我装个 XX」
  「生态里有什么好玩的」。数据源是 dsh-external/hub 由 CI 维护的
  catalog.json（全组织仓库的分类、标签、安装方式）；流程为 检索 → 候选表 →
  用户拍板 → 按条目 managers 声明的方式安装 → 验证挂载。只负责找和装；
  开发新插件转 make-dsh-plugin。
license: BSD-3-Clause
metadata:
  author: dsh-external/plugin-registry
  version: "1.0.0"
requires:
  bins:
    - git
---

# 找插件、装插件

生态目录集中在 `dsh-external/hub` 的 `catalog.json`，CI 自动重建，两百多个仓库
每条都带描述、分类、标签和安装方式标注。本 skill 的完成态只有一个：用户选中的
插件在他的 DSH 里可用。

## Step 1：取目录

目录文件是 `dsh-external/hub`（private 仓库）的 `catalog.json`。环境里有
`gh` 且已登录时单文件直取，最轻：

```sh
gh api repos/dsh-external/hub/contents/catalog.json --jq .content | base64 -d
```

没有 `gh` 就浅克隆（走主机自己的 Git 凭据，仓库只有几百 KB；临时目录按
Windows / WSL / macOS 本地惯例取）：

```sh
git clone --depth 1 https://github.com/dsh-external/hub <临时目录>/dsh-hub
```

裸 `curl` 拉不到：仓库是 private，不带凭据只会得到 404。

完成点：`catalog.json` 在手，后续筛选先剔除 `empty: true` 与 `hide: true`
的条目——用环境里现成的手段即可（直接读文件、`node -e`、`python3` 都行），
不依赖额外工具。

## Step 2：筛出候选

拿用户的需求词对照每条的 `description`、`tags`、`note`、`name`；`category`
先粗筛（`skill` 技能 / `plugin` 单插件 / `collection` 插件集 / `channel`
远程渠道 / `infra` 基础设施）。同类命中多条时按 `pushedAt` 取新。

产出一张候选表，最多 3 行，列：名字、一句话用途、最近更新、装法
（`managers` 字段值）。表下面用一行讲清你排第一的理由。

完成点：用户凭这张表就能拍板，不需要点开任何仓库。一条都不匹配时直说
「目录里没有」，并问是否转 make-dsh-plugin 现写一个。

## Step 3：用户拍板

停下来等选择。用户开口就点名了某个插件的，从这里直接进 Step 4。

## Step 4：安装

按选中条目 `managers` 里的值，打开 [references/install-methods.md](references/install-methods.md)
找到对应小节照做。多个值并存时按该文件开头的优先级选一种。

动手前过目两处：仓库 README 的安装段落；repository 装法再加看
`.dsh-plugin/package.json` 的 `scripts`（`prepack` 会在本机执行）。发现与插件
声称功能无关的动作——额外下载、写 `$DSH_HOME` 之外的路径、改 shell 配置——
先原文摆给用户，等确认再继续。

完成点：配置写入、依赖装完、命令零报错。

## Step 5：验证挂载

web 等长驻 surface 监听 patch 文件改动后热载；一次性运行下次启动才生效。
请用户亲眼确认新能力出现：UI 元素、新工具、新技能条目，视插件而定。

没出现时按序排查：服务日志里的 `hmr/config-update-failed`、源字符串的
ref / path 拼写、profile 目录 `pnpm install` 是否成功。

完成点：用户确认可用；或把具体报错和已排除的原因一并带回给用户。
