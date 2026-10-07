# Vergil Writing Skill

[![npm version](https://img.shields.io/npm/v/@vergil-astro/vergil-writing-skills.svg)](https://www.npmjs.com/package/@vergil-astro/vergil-writing-skills)
[![npm downloads](https://img.shields.io/npm/dm/@vergil-astro/vergil-writing-skills.svg)](https://www.npmjs.com/package/@vergil-astro/vergil-writing-skills)

> AI skill for writing, typesetting and enhancing Markdown articles on the Vergil Astro theme. It takes its writing and typesetting rules from [kami](https://github.com/tw93/kami) and adds Vergil's 51 content directives where they carry meaning.

## Supported Agents

| Agent | Config Directory | Install via `vg` |
|-------|-----------------|------------------|
| Claude Code | `.claude/skills/vergil-writing/SKILL.md` | `vg skill install --ai claude` |
| Codex CLI | `.codex/skills/vergil-writing/SKILL.md` | `vg skill install --ai codex` |
| Cursor | `.cursor/skills/vergil-writing/SKILL.md` | `vg skill install --ai cursor` |
| Gemini CLI | `.gemini/skills/vergil-writing/SKILL.md` | `vg skill install --ai gemini` |
| OpenClaw | via `openclaw skills install` | `vg skill install --ai openclaw` |

## Quick Install

Via [Vergil CLI](https://github.com/vergil-astro/vergil-cli):

```bash
# Auto-detect agents and install
vg skill install

# Install to a specific agent
vg skill install --ai claude
vg skill install --ai codex

# Install globally (applies to all projects)
vg skill install --global

# List installed skills
vg skill list

# Uninstall
vg skill uninstall --ai claude
```

## Manual Install

### Claude Code

```bash
# Project-local
mkdir -p .claude/skills/vergil-writing
cp SKILL.md .claude/skills/vergil-writing/SKILL.md

# Global
mkdir -p ~/.claude/skills/vergil-writing
cp SKILL.md ~/.claude/skills/vergil-writing/SKILL.md
```

### Codex / Cursor / Gemini

Replace `.claude` with `.codex`, `.cursor`, or `.gemini`:

```bash
mkdir -p .codex/skills/vergil-writing
cp SKILL.md .codex/skills/vergil-writing/SKILL.md
```

### OpenClaw

```bash
openclaw skills install vergil-writing-skills.skill
```

## What It Does

Once installed, ask your agent:

> "帮我排版一下 `src/content/blog/my-post.md`"

> "Enhance my article with Vergil directives"

> "Write a post about migrating from Hexo to Astro, based on these notes"

The skill works in two modes:

- **enhance** (default): your wording stays. It fixes typesetting (headings, paragraphs, lists, tables, CJK spacing and punctuation), adds directives, and writes `<original>.enhanced.md`. Writing problems it finds are listed for you, not rewritten
- **write**: drafts or rewrites prose following kami's writing rules, with frontmatter ready for `src/content/blog/` and `draft: true`. Nothing gets invented: missing facts are left as `[TODO]`

Either way it picks the article type (tech-blog, tutorial, life-notes, travel, review, project-showcase) and a style (minimal / default / rich), then adds directives from a type × style matrix.

### Works better with kami

[kami](https://github.com/tw93/kami) is a document typesetting system by Tw93. This skill carries a digest of its writing and typesetting rules, and when the kami skill is also installed, the agent reads kami's full references (writing rules, anti-patterns, the subtractive rule for decoration, diagram selection). kami's own templates, colors and PDF pipeline aren't used: the Vergil theme decides how the article looks.

```bash
# Any agent that reads ~/.agents/skills (Claude Code, Codex, Cursor ...)
npx skills add tw93/kami -a claude-code codex cursor -g -y

# Or as a Claude Code plugin
/plugin marketplace add tw93/kami
/plugin install kami@kami
```

### Directive Examples

| Directive | Use For |
|-----------|---------|
| `callout` | info / tip / warning / danger alerts |
| `panel` | side-by-side code comparison |
| `tabs` | switchable content blocks |
| `timeline` | chronological narratives |
| `folding` | collapsible sections |
| `grid` | multi-column layouts |
| `photo` / `gallery` | enhanced image presentation |
| `copy` | one-click copy blocks |
| `mermaid` | flowcharts and architecture diagrams |
| `ghcard` | GitHub repo/user cards |
| **and 40 more...** | |

## Requirements

- Compatible with Vergil Astro theme v1.0+

## License

MIT
