# dsh-find-plugins

<p align="center">
  <strong>English</strong> | <a href="README.zh-CN.md">简体中文</a>
</p>

Ask DSH, “is there a plugin for this?” It searches the GitHub [`dsh-plugin` topic](https://github.com/topics/dsh-plugin), explains the best matches, waits for your choice, then installs and verifies the selected plugin.

Repository ownership does not matter. Any public repository tagged `dsh-plugin` remains discoverable after a transfer between a personal account and an organization.

## Install

Send this message to DSH:

```text
Install the dsh-find-plugins skill from https://github.com/Nagi-ovo/dsh-find-plugins
```

For a manual installation, copy the entire `skills/find-plugins/` directory to `$DSH_HOME/skills/` (by default, `~/.dsh/skills/`). To use it in one project only, copy it to `<project-root>/.dsh/skills/`. DSH also recognizes `<project-root>/.agents/skills/` when you want to share the skill with other agents. The directory watcher loads it immediately.

## What it does

The skill runs its bundled search script to collect public, active, non-fork repositories tagged `dsh-plugin`. It inspects only the most relevant candidates, then reads their README, `package.json`, and repository files to decide whether each one installs as a bundle, Cordis plugin, or skill. It stops for confirmation when an installation uses lifecycle scripts or writes outside the expected DSH paths.

“Show data and processes visually” can lead to [dsh-visualize](https://github.com/Nagi-ovo/dsh-visualize). “Give the Web UI some 2005 internet energy” might find [dsh-ads](https://github.com/Nagi-ovo/dsh-ads). Any favorable ranking is entirely coincidental.

When the current account can access [dsh-external/hub](https://github.com/dsh-external/hub), its catalog can add category and installation details. The GitHub topic remains the primary directory. Inspired by the find-skills workflow from vercel-labs/skills.

License: BSD-3-Clause
