<div align="center">

# Vergil Writing Skill

[![npm version](https://img.shields.io/npm/v/@vergil-astro/vergil-writing-skills.svg)](https://www.npmjs.com/package/@vergil-astro/vergil-writing-skills)
[![npm downloads](https://img.shields.io/npm/dm/@vergil-astro/vergil-writing-skills.svg)](https://www.npmjs.com/package/@vergil-astro/vergil-writing-skills)

</div>

<details>
<summary>简体中文（点击展开 / 收起）</summary>

<div align="center">

**给 Vergil 站点写文章、排版的 AI 技能。**

写作和排版规则来自 [kami](https://github.com/tw93/kami)，指令部分覆盖 [Vergil 主题](https://github.com/vergil-astro/vergil-astro-theme)全部 51 个内容指令。目前支持 Claude Code 和 Codex CLI。

</div>

## 安装

在站点根目录运行，技能会装进当前项目：

```bash
npx @vergil-astro/vergil-cli skill install --ai claude   # Claude Code
npx @vergil-astro/vergil-cli skill install --ai codex    # Codex CLI
```

加上 `--global` 就装到用户目录，所有项目都能用。已经全局装了 [vergil-cli](https://github.com/vergil-astro/vergil-cli) 的话，直接用 `vg skill install --ai claude` 也一样。

想手动装，把 `SKILL.md` 放进助手的技能目录就行：

```bash
# Claude Code
mkdir -p .claude/skills/vergil-writing
curl -fsSL https://raw.githubusercontent.com/vergil-astro/vergil-writing-skills/main/SKILL.md -o .claude/skills/vergil-writing/SKILL.md

# Codex CLI
mkdir -p .agents/skills/vergil-writing
curl -fsSL https://raw.githubusercontent.com/vergil-astro/vergil-writing-skills/main/SKILL.md -o .agents/skills/vergil-writing/SKILL.md
```

## 用法

装好以后直接跟助手说要做什么：

> 帮我排版一下 `src/content/blog/my-post.md`

> 根据这些笔记写一篇从 Hexo 迁到 Astro 的文章

技能有两种模式。

默认是排版。你的原话一个字不改，它只整理标题、段落、列表、表格和中英文混排的空格标点，再加上合适的指令，结果写到 `<原文件名>.enhanced.md`。写作上的问题会列出来给你看，不替你改。

让它起稿、改写或润色时就是写作模式。它按 kami 的写作规则来写，成稿默认放进 `src/content/blog/`，frontmatter 里带着 `draft: true`，等你看过再发。它不会编东西，缺的事实留成 `[TODO]`。

两种模式都会先判断文章类型（技术文章、教程、随笔、游记、测评、项目介绍）和该排得多满（克制、适中、丰富），再按这两点挑指令。

## 搭配 kami

[kami](https://github.com/tw93/kami) 是 Tw93 做的文档排版系统。技能里已经带了它写作和排版规则的摘要，如果再装上 kami 技能，助手会去读 kami 的完整参考，包括写作规则、反模式清单、装饰的减法原则和图表选型。kami 自己的模板、配色和 PDF 流程不会用上，文章长什么样由 Vergil 主题决定。

```bash
# 装到 ~/.agents/skills，Codex 直接读，Claude Code 那边会自动建软链接
npx skills add tw93/kami -a claude-code codex -g -y

# 或者作为 Claude Code 插件安装
/plugin marketplace add tw93/kami
/plugin install kami@kami
```

## 常用指令

| 指令 | 用途 |
|------|------|
| `callout` | 信息、提示、警告、危险提示框 |
| `panel` | 代码并排对比 |
| `tabs` | 可切换的内容块 |
| `timeline` | 按时间讲的经历 |
| `folding` | 折叠段落 |
| `grid` | 多栏布局 |
| `photo` / `gallery` | 摄影框和画廊 |
| `copy` | 一键复制块 |
| `mermaid` | 流程图、架构图 |
| `ann` | 手绘箭头和批注 |
| `ghcard` | GitHub 仓库和用户卡片 |

另外还有 39 个，完整用法见技能里的 `SKILL.md`。

## License

MIT

</details>

<details open>
<summary>English (click to collapse / expand)</summary>

<div align="center">

**An AI skill for writing and formatting posts on a Vergil site.**

Its writing and typesetting rules come from [kami](https://github.com/tw93/kami), and it knows all 51 content directives in the [Vergil theme](https://github.com/vergil-astro/vergil-astro-theme). Currently supports Claude Code and Codex CLI.

</div>

## Install

Run this from your site's root folder to install the skill into that project:

```bash
npx @vergil-astro/vergil-cli skill install --ai claude   # Claude Code
npx @vergil-astro/vergil-cli skill install --ai codex    # Codex CLI
```

Add `--global` to install it in your home folder so every project can use it. If you already have [vergil-cli](https://github.com/vergil-astro/vergil-cli) installed globally, `vg skill install --ai claude` does the same thing.

To install by hand, put `SKILL.md` in your assistant's skills folder:

```bash
# Claude Code
mkdir -p .claude/skills/vergil-writing
curl -fsSL https://raw.githubusercontent.com/vergil-astro/vergil-writing-skills/main/SKILL.md -o .claude/skills/vergil-writing/SKILL.md

# Codex CLI
mkdir -p .agents/skills/vergil-writing
curl -fsSL https://raw.githubusercontent.com/vergil-astro/vergil-writing-skills/main/SKILL.md -o .agents/skills/vergil-writing/SKILL.md
```

## Usage

Once it's installed, just tell your assistant what you want:

> Format `src/content/blog/my-post.md` with Vergil directives

> Write a post about migrating from Hexo to Astro, based on these notes

The skill has two modes.

Formatting is the default. Your wording stays exactly as it is. It only tidies up headings, paragraphs, lists, tables, and the spacing and punctuation in mixed Chinese and English text, then adds directives where they fit and writes the result to `<original>.enhanced.md`. Writing problems it finds are listed for you, not rewritten.

When you ask it to draft, rewrite, or polish, it switches to writing mode. It follows kami's writing rules and saves the post to `src/content/blog/` by default, with `draft: true` in the frontmatter so you can review it before publishing. It doesn't make things up: missing facts are left as `[TODO]`.

In both modes it first works out what kind of post it is (tech blog, tutorial, life notes, travel, review, or project showcase) and how much formatting fits (minimal, default, or rich), then picks directives based on both.

## Works Better with kami

[kami](https://github.com/tw93/kami) is a document typesetting system by Tw93. This skill already carries a digest of its writing and typesetting rules. If the kami skill is installed too, the assistant reads kami's full references: writing rules, anti-patterns, the subtractive rule for decoration, and diagram selection. kami's own templates, colors, and PDF pipeline aren't used, because the Vergil theme decides how the post looks.

```bash
# Installs to ~/.agents/skills: Codex reads it directly, and Claude Code gets a symlink
npx skills add tw93/kami -a claude-code codex -g -y

# Or install it as a Claude Code plugin
/plugin marketplace add tw93/kami
/plugin install kami@kami
```

## Common Directives

| Directive | Use for |
|-----------|---------|
| `callout` | Info, tip, warning, and danger alerts |
| `panel` | Side-by-side code comparison |
| `tabs` | Switchable content blocks |
| `timeline` | Stories told in order |
| `folding` | Collapsible sections |
| `grid` | Multi-column layouts |
| `photo` / `gallery` | Photo frames and galleries |
| `copy` | One-click copy blocks |
| `mermaid` | Flowcharts and architecture diagrams |
| `ann` | Handwritten arrows and margin notes |
| `ghcard` | GitHub repo and user cards |

There are 39 more. See `SKILL.md` for the full reference.

## License

MIT

</details>
