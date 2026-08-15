# dsh-find-plugins

![dsh-find-plugins](assets/social-preview.jpg)

<p align="center">
  <strong>简体中文</strong> | <a href="README.en.md">English</a>
</p>

<p align="center">
  <a href="https://dshfind.com/zh/plugins/Nagi-ovo/dsh-find-plugins?ref=badge"><img src="https://dshfind.com/api/card/Nagi-ovo/dsh-find-plugins?lang=zh" alt="dsh-find-plugins 在 dshfind 插件目录上的展示卡" width="440"></a>
</p>

对 DSH 说一句「有没有插件能……」，它就会从全 GitHub 的 [`dsh-plugin` topic](https://github.com/topics/dsh-plugin) 里找出候选，解释差别，等你选好以后再安装和验证。

仓库属于个人还是组织并不重要。只要是公开仓库并带有 `dsh-plugin` topic，转移仓库后仍然能被发现。

## 安装

把下面这句话发给 DSH：

```text
请从 https://github.com/Nagi-ovo/dsh-find-plugins 安装 dsh-find-plugins skill
```

手动安装时，把 `skills/find-plugins/` 整个目录复制到 `$DSH_HOME/skills/`（默认是 `~/.dsh/skills/`）；只想给当前项目使用，则复制到 `<项目根>/.dsh/skills/`。如果还想与其他 Agent 共用，也可以放在 `<项目根>/.agents/skills/`。目录 watcher 会让它立即生效。

## 它会怎么做

Skill 会先运行自带脚本，获取所有公开、未归档、非 fork 的 `dsh-plugin` 仓库。它只检查最匹配的少量候选，并从 README、`package.json` 和仓库文件判断应该按 bundle、Cordis 插件还是 skill 安装。

你选定之后、开装之前，它会先查一遍这个插件的 lifecycle scripts、对外网络和子进程、读取的会话数据与凭据，以及仓库本身的可信度，然后**无论有没有问题都汇报一次**，再问你要不要继续。插件跑在你的 DSH 进程里，装它等于授权。

比如「想把数据和流程画出来」可以找到 [dsh-visualize](https://github.com/Nagi-ovo/dsh-visualize)；「想给 Web UI 加点 2005 年互联网味道」可能会找到 [dsh-ads](https://github.com/Nagi-ovo/dsh-ads)。检索命中纯属巧合。

[dsh-external/hub](https://github.com/dsh-external/hub) 在当前账号可访问时可以补充分类和安装信息，但 GitHub topic 才是主目录。灵感来自 vercel-labs/skills 的 find-skills。

License: [BSD-3-Clause](LICENSE)
