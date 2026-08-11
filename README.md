# dsh-find-plugins

DSH 找插件技能：用户一句「有没有插件能……」，agent 从 [hub](https://github.com/dsh-external/hub) 的 catalog.json 检索全生态目录，给出最多 3 个候选等用户拍板，再按条目标注的安装方式（bundle / repository / cordis / skill / 外部管理器）装好并验证挂载。

## 安装

本仓库只含技能，把 `skills/find-plugins/` 整个目录拷进任一技能发现根即可：

- 全局：`$DSH_HOME/skills/find-plugins/`
- 只给某个项目：`<项目根>/.agents/skills/find-plugins/`

目录有 watcher，放进去即生效。技能运行需要 `gh`（已登录 dsh-external 可见账号）和 `jq`。

## 内容

- [skills/find-plugins/SKILL.md](skills/find-plugins/SKILL.md) —— 五步主流程：取目录 → 筛候选 → 拍板 → 安装 → 验证，每步带完成点。
- [skills/find-plugins/references/install-methods.md](skills/find-plugins/references/install-methods.md) —— 六种 `managers` 值各自的安装操作，命令与 patch 语法对照官方 README 与 vendored `plugin-include` 源码核实。

灵感来自 vercel-labs/skills 的 find-skills。

## License

BSD-3-Clause
