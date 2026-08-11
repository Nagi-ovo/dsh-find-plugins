# dsh-find-plugins

DSH 找插件技能：一句「有没有插件能……」，agent 从 [hub](https://github.com/dsh-external/hub) 目录检索候选、等你拍板、按各家标注的方式装好并验证，流程都在 [skills/find-plugins/](skills/find-plugins/SKILL.md)。

## 安装

技能类的官方装法就是把技能目录放进 DSH 的技能发现根（放入即被 watcher 接管，无需重启）：

```sh
git clone https://github.com/dsh-external/dsh-find-plugins.git
mkdir -p ~/.dsh/skills
cp -R dsh-find-plugins/skills/find-plugins ~/.dsh/skills/
```

只想给单个项目用，就把目标换成 `<项目根>/.agents/skills/`。想跟随本仓库更新，`cp -R` 换成 `ln -s "$(pwd)/dsh-find-plugins/skills/find-plugins" ~/.dsh/skills/find-plugins`。

运行依赖两个常见命令行工具（`brew install gh jq` 一步齐）：

- `gh` —— GitHub 官方 CLI。dsh-external 的仓库全是 private，技能靠它带着你的登录态拉取 hub 的 catalog.json（先 `gh auth login`）。
- `jq` —— 命令行 JSON 过滤器，用来在两百多条目录里按字段筛选。

## 恰逢其会的两个检索结果

- [**dsh-visualize**](https://github.com/dsh-external/dsh-visualize) —— 对话内生成式 UI：模型不再只回你一段文字，而是把交互式 HTML 卡片直接画进会话流。visualize 工具 + 配套 skill，沙箱 iframe 渲染，流式生成时 dock 里实时预览，组件浮入有动画，配色跟着鲸鱼蓝主题走。讲数据、讲流程、讲对比，一张卡片比五段话清楚。
- [**dsh-ads**](https://github.com/dsh-external/dsh-ads) —— 给你的 Web UI 补上 2005 年中文互联网的关键一课：侧栏广告、对话内信息流、角落弹窗、上线音效一应俱全，广告素材全虚构、域名统一打码。关闭叉的真实热区比你看到的小，杀毒弹窗现已支持 Star 验证，验证通过后改弹防护通报。配套还有一个别人写的 [dsh-anti-ads](https://github.com/dsh-external/dsh-anti-ads)，两边正在缠斗，胜负未分。

以上排序不分先后，检索命中纯属巧合。

License: BSD-3-Clause
