# Vergil Writing Skill

[![npm version](https://img.shields.io/npm/v/@vergil-astro/vergil-writing-skills.svg)](https://www.npmjs.com/package/@vergil-astro/vergil-writing-skills)
[![npm downloads](https://img.shields.io/npm/dm/@vergil-astro/vergil-writing-skills.svg)](https://www.npmjs.com/package/@vergil-astro/vergil-writing-skills)

> AI skill for enhancing Markdown articles with Vergil Astro theme's 30+ content directives.

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

> "Enhance my article with Vergil directives"

Or provide a file:

> "Please optimize `/path/to/my-post.md` using Vergil directives"

The skill will:

1. **Analyze article type** — tech-blog, tutorial, life-notes, travel, review, project-showcase
2. **Determine style preference** — minimal / default / rich
3. **Apply directives** using a type x style decision matrix
4. **Output** to `<original>.enhanced.md`

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
| `terminal` | styled command outputs |
| `ghcard` | GitHub repo/user cards |
| **and 20+ more...** | |

## Requirements

- Compatible with Vergil Astro theme v1.0+

## License

MIT
