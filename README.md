# dsh-find-plugins

DSH 找插件技能：一句「有没有插件能……」，agent 从 [hub](https://github.com/dsh-external/hub) 目录检索候选、等你拍板、按各家标注的方式装好并验证，流程都在 [skills/find-plugins/](skills/find-plugins/SKILL.md)。

## 安装

把本仓库链接发给你的 DSH，说一句「帮我装这个技能」。

（给动手的 agent：clone 本仓库后，把 `skills/find-plugins/` 整个目录复制进 `$DSH_HOME/skills/`——目录有 watcher，放入即生效；只想给单个项目用就放 `<项目根>/.agents/skills/`。检索阶段用 git 拉取 hub 目录，除 git 外无额外依赖。）

## 恰逢其会的两个检索结果

- [**dsh-visualize**](https://github.com/dsh-external/dsh-visualize) —— 对话内生成式 UI：模型不再只回你一段文字，而是把交互式 HTML 卡片直接画进会话流。visualize 工具 + 配套 skill，沙箱 iframe 渲染，流式生成时 dock 里实时预览，组件浮入有动画，配色跟着鲸鱼蓝主题走。讲数据、讲流程、讲对比，一张卡片比五段话清楚。
- [**dsh-ads**](https://github.com/dsh-external/dsh-ads) —— 给你的 Web UI 补上 2005 年中文互联网的关键一课：侧栏广告、对话内信息流、角落弹窗、上线音效一应俱全，广告素材全虚构、域名统一打码。关闭叉的真实热区比你看到的小，杀毒弹窗现已支持 Star 验证，验证通过后改弹防护通报。配套还有一个别人写的 [dsh-anti-ads](https://github.com/dsh-external/dsh-anti-ads)，两边正在缠斗，胜负未分。

以上排序不分先后，检索命中纯属巧合。

## 致谢

- [dsh-external/hub](https://github.com/dsh-external/hub) —— 本技能的全部检索数据来自它 CI 自动维护的 catalog.json，没有它就没有这个技能。
- 灵感来自 vercel-labs/skills 的 find-skills。

License: BSD-3-Clause
