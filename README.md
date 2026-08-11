# dsh-find-plugins

DSH 找插件技能：一句「有没有插件能……」，agent 从 [hub](https://github.com/dsh-external/hub) 目录检索候选、等你拍板、按各家标注的方式装好并验证，流程都在 [skills/find-plugins/](skills/find-plugins/SKILL.md)。安装就是把 `skills/find-plugins/` 整个拷进 `$DSH_HOME/skills/`（或项目的 `.agents/skills/`），即放即用，运行需要 `gh` 和 `jq`。

用它搜「生成式 UI」会命中作者的 [dsh-visualize](https://github.com/dsh-external/dsh-visualize)（模型直接把交互卡片画进对话流），搜「广告」会命中 [dsh-ads](https://github.com/dsh-external/dsh-ads)（2005 中文站风味全套弹窗，关闭叉的热区比看起来小）——纯属巧合。

License: BSD-3-Clause
