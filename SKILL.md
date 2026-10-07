---
name: vergil-writing-skills
description: Write, typeset and enhance Markdown articles for the Vergil Astro theme. Uses kami (github.com/tw93/kami) as the writing and typesetting reference and Vergil's 51 content directives for visual structure. Use when: (1) a user wants a blog post or doc for a Vergil site drafted, rewritten, polished or typeset (写文章 / 润色 / 排版), (2) a user provides a Markdown file and wants it enriched with callouts, panels, tabs, timelines, photos, galleries, diagrams, or other Vergil directives, (3) a user wants a plain Markdown article to read better without changing what it says, (4) working with Markdown under a Vergil site's src/content/. NOT for: non-Vergil theme projects, or PDF, slides and other print documents (use kami itself for those).
---

# Vergil Writing & Typesetting Expert

You help authors publish Markdown articles on the Vergil Astro theme. Work in three layers, in this order:

1. **Writing**: what the article says. Reference: kami's writing rules.
2. **Typesetting**: how the Markdown is structured: headings, paragraphs, lists, tables, emphasis, CJK punctuation and spacing. Reference: kami's typesetting judgment, adapted to web articles.
3. **Directives**: Vergil's 51 content directives, added only where they carry meaning.

A directive never fixes a writing or typesetting problem. A wall of text stays a wall of text inside a callout.

## Modes

| Mode | When | The author's wording |
|------|------|----------------------|
| `enhance` (default) | The user hands over an existing article to optimize, enhance or 排版 | Untouched. Only typesetting edits (see Hard Constraints); writing problems are reported, not fixed |
| `write` | The user asks to draft, rewrite, expand or polish prose | Written with the Writing Rules. Never invent facts, numbers, versions, quotes or links |

## Core Workflow

1. **Read** the article, or for `write` mode the brief and materials
2. **Pick the mode**, then the article type ("Type System") and style ("Style System")
3. **Writing pass** (`write` mode only): apply «Writing Rules»
4. **Typesetting pass**: apply «Typesetting Rules»
5. **Directive pass**: add directives from the "Type × Style" decision matrix
6. **Review pass**: check the kami anti-patterns and the Hard Constraints, fix what fails
7. **Write the file**: `enhance` → `<original-filename>.enhanced.md`; `write` → the path the user named, otherwise `src/content/blog/<slug>.md`

## kami as the Reference

[kami](https://github.com/tw93/kami) (by Tw93, MIT) is a typesetting system for documents. Vergil uses it as the reference for how to write and lay out an article. How the article looks is the Vergil theme's job.

If the `kami` skill is installed (for example `~/.agents/skills/kami/`, `~/.claude/skills/kami/`, or as a Claude Code plugin), read these parts before the writing and typesetting passes. Only these parts apply to web articles:

| kami file | Sections | Use for |
|-----------|----------|---------|
| `references/writing.md` | «Core principles», «Long Document» (both entries), «Coupling rules» | Writing pass, emphasis, numbers, punctuation |
| `references/anti-patterns.md` | Content Emptiness, Metric Fabrication, Visual Excess, Source Gaps, Tone Contamination | Review pass |
| `references/design.md` | «Subtractive rule», «Decoration density: subtractive by default» | Deciding whether a directive belongs at all |
| `references/diagrams.md` | §1 Selection, §7 AI-slop anti-patterns | Choosing and wording mermaid / echart diagrams |

Ignore the rest of kami: its templates, `build.py` and the PDF pipeline, `content.json`, fonts, colors (parchment, ink-blue), the no-bold and no-italic rules, and page density. The theme's skin and color scheme own fonts, colors and spacing, so never add inline styles or colors to imitate kami.

If kami is not installed, the digests in «Writing Rules» and «Typesetting Rules» are enough. Mention once that installing kami (https://github.com/tw93/kami#install) gives the full reference.

kami components map to Vergil like this:

| kami | Vergil |
|------|--------|
| Table (kami-table) | Plain Markdown table |
| Quote | `quot` / `blockquote` |
| Highlight `<span class="hl">` | `:mark[]` |
| Figure with caption | `::image{alt="..."}` (alt is the caption) / `gallery` |
| Diagrams (`assets/diagrams/`) | `mermaid` / `echart` |
| Code card | Fenced code block with `title` |
| Metric tiles | `grid` with one short number per cell |

## Writing Rules

Digest of kami `references/writing.md` and `references/anti-patterns.md`. In `write` mode, follow them. In `enhance` mode, don't rewrite; list the worst hits for the author at the end.

- **Data over adjectives.** State the number, the version, the date. If the exact figure is unknown, write an honest magnitude; never invent one
- **Say why.** Explain the judgment and the trade-off, not only the steps taken
- **Start with the first real claim.** No opener like「在当今快速发展的……」. The first sentence under a heading adds something the heading doesn't already say
- **Each `##` section stands alone**: claim, then evidence, then conclusion. If a reader asks "so what?" after the first paragraph, the paragraph failed
- **One claim, one proof, move on.** Don't repeat a point in different words
- **Own words.** Cut industry clichés and AI tone: 赋能, 打造一站式, 本质上, 这意味着, 值得注意的是, 不仅……而且, chains of em dashes (——). Use a colon or a full stop instead of a dash
- **Sources before phrasing.** Versions, release dates, "latest", product facts and prices come from the user's material or an official source. Pin time-sensitive facts ("as of 2026-04"). If sources conflict, ask
- **Terms.** Explain a term the first time it appears. In Chinese prose, at most one unexplained English term per sentence
- **Honest boundaries.** Don't claim what the author didn't do; credit collaborators

## Typesetting Rules

Applies in both modes. In `enhance` mode only the edits listed in Hard Constraint 3 are allowed.

**Structure**
- The title lives in frontmatter and the theme renders it. The body starts at `##`; remove a leading `#` heading that repeats the title. Don't skip levels; stop at `####` (the table of contents shows `##` to `####`)
- Headings are short and specific. In `write` mode, prefer a heading that states the point ("Islands cut our JS by 80%") over a label ("Performance")
- One idea per paragraph. Split a paragraph over roughly 250 Chinese characters or 150 English words at an idea boundary
- Parallel items (3 or more) become a list; steps become a numbered list; reasoning stays prose. Don't chop an argument into bullet fragments
- Comparing two or more things across two or more attributes → a table with short cells
- Fenced code always names its language; use `title` when the code is a file
- Every image has alt text. A caption adds what the image doesn't show (when, where, what to notice); it never restates the heading

**Emphasis**
- Bold or `:mark[]` only on a number or a distinctive phrase, never on adjectives
- At most one emphasis per 80-150 words, at most two per line. Short sections need none

**CJK typography**
- A space between Chinese and Latin letters or digits: `用 Astro 5 搭建`, `共 3 篇`. No space before `%`
- Full-width punctuation in Chinese sentences (，。：？！), half-width inside code, numbers and URLs
- `「」` for quotations in Chinese prose; `……` for ellipsis
- No `；` in short items (list items, table cells, captions): split the sentence or use a comma
- Numbers: `5,000+`, `90%`, `~10 万`. No false precision

## Type System

Infer the article type automatically from its content. Write the result into the output file's frontmatter comment. Use `mixed` when content clearly cannot be categorized.

| Type | Identification | Preferred Directives |
|------|---------------|---------------------|
| `tech-blog` | Code blocks, APIs, architecture, troubleshooting, dense technical terms | panel, callout, ghcard, copy, code-block titles, mermaid, folding |
| `tutorial` | Step lists, "how to", guides, operation instructions | step-brackets, timeline, folding, folders, callout, checkbox, tabs |
| `life-notes` | Daily thoughts, essays, emotional expression, image-heavy | photo, gallery, note, quot, blockquote, image, ann |
| `travel` | Travel, trips, locations, landscape photos | gallery, timeline, photo, banner, image |
| `review` | Reviews, comparisons, recommendations, ratings | grid, tabs, callout, image, note |
| `project-showcase` | Open source projects, portfolio, GitHub links | banner, ghcard, grid, sites, button |
| `mixed` | Cannot be clearly categorized, mixed content types | Use general directives conservatively |

## Style System

Infer style from existing directive density, writing style, and target audience. Write the result into the output file's frontmatter comment.

| Style | Strategy | Max per 1000 words | Typical Behavior |
|-------|----------|-------------------|------------------|
| `minimal` | Restrained, only at critical points | 2-3 | callout only for warnings, panel only for code comparison, rest stays as-is |
| `default` | Moderately rich, improves readability | 5-8 | callout for tips/warnings/key conclusions, tabs for parallel content, folding for long code |
| `rich` | Fully utilized, visually rich | 10-15 | grid layouts, timeline for journeys, photo for works, inline text directives |

## Directive Decision Matrix

First apply kami's subtractive rule: a directive earns its place only when it carries meaning: a warning, a state, a grouping, a comparison, or a relationship. If removing it would lose nothing, don't add it. Never add a directive for visual rhythm, and never to break up a long paragraph (split the paragraph instead).

For each content pattern below, choose the directive based on type and style. **The richer the style, the looser the trigger conditions** (more content is identified as "suitable for directives"). Cells like `callout{type=warn}` are shorthand for the full syntax in the reference below.

### Universal Rules (all types)

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| "Note/Warning/Important" paragraphs | `callout{type=warn}` | `callout{type=warn}` | `callout{type=warn/danger}` |
| Key conclusions / core points | keep as-is | `callout{type=tip}` | `callout{type=tip}` + `:mark[]` |
| Quotes / famous sayings | keep as-is | `quot` | `quot` or `blockquote` |
| Timeline narratives | keep as-is | `timeline` | `timeline` |
| LaTeX `$...$` / `$$...$$` without a math engine | add `katex: true` to frontmatter | same | same |

### tech-blog Specific

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| Code block + explanation | keep as-is | `panel` (with title/right) | `panel` (with title/right) |
| Multiple parallel configs/code | keep as-is | `tabs` | `tabs` |
| Long config/output (>10 lines) | `folding` | `folding` | `folding` |
| Single-line command/key | keep as-is | `copy` | `copy` |
| Code block for a named file | keep as-is | `title="file.ext"` | `title="file.ext"` |
| Shell block mixing commands and output | keep as-is | `$ ` before each command | `$ ` before each command |
| GitHub repo/user | keep as-is | `ghcard` | `ghcard` |
| ```` ```mermaid ```` fence (renders as plain code otherwise) | `mermaid` | `mermaid` | `mermaid` |
| ASCII-art flow / architecture diagram | keep as-is | keep as-is | `mermaid` (same nodes and edges only) |
| Version changes/deprecation | keep as-is | `callout{type=warn}` + `:del[]` | `callout{type=warn}` + `:del[]` |

### tutorial Specific

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| Step list (3+ steps) | keep as-is | `step-brackets` | `step-brackets` + `timeline` |
| Prerequisites/environment | `callout{type=info}` | `callout{type=info}` | `callout{type=info}` + `:mark[]` |
| Supplemental/optional steps | keep as-is | `folding` | `folding` |
| FAQ / several optional sections in a row | keep as-is | `folders` | `folders` |
| Multi-environment install | keep as-is | `tabs` | `tabs` |
| Task checklist | keep as-is | `:checkbox[]` | `:checkbox[]` |
| Success/failure states | keep as-is | `:checkbox{checked}` | `:checkbox{checked}` / `:radio{checked}` |

### life-notes Specific

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| Image group (3+ images) | keep as-is | `gallery` | `gallery` |
| Single edited photo | keep as-is | `photo` | `photo` |
| Single ordinary image | keep as-is | `image` | `image` |
| Emotional/theme emphasis | keep as-is | `:mark[]` | `:mark[]`, `:emp[]`, `:u[]` |
| Word followed by a short parenthetical gloss | keep as-is | keep as-is | `:ann[word]{note="gloss"}` |
| Insightful conclusion | keep as-is | `note` | `note` |
| Section banner | keep as-is | `banner` | `banner` |
| Poetry quote | keep as-is | `poetry` | `poetry` |

### travel Specific

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| Landscape photo group | keep as-is | `gallery` | `gallery` |
| Single featured photo | keep as-is | `photo` | `photo` |
| Itinerary timeline | keep as-is | `timeline` | `timeline` |
| Location/attraction intro | keep as-is | `grid` | `grid` |
| Trip motivation/summary | keep as-is | `callout{type=tip}` | `banner` + `callout{type=tip}` |

### review Specific

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| Side-by-side comparison | keep as-is | `tabs` | `grid` |
| Pros/cons summary | keep as-is | `callout{type=tip/warn}` | `grid` (two-column comparison) |
| Rating/stars | keep as-is | `:mark[]` | `:mark[]` |
| Buy/view links | keep as-is | `:button[]` | `:button[]` |
| Recommendation conclusion | keep as-is | `callout{type=tip}` | `note` |

### project-showcase Specific

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| Project header intro | keep as-is | `banner` | `banner` |
| GitHub repo | `ghcard` | `ghcard` | `ghcard` |
| Feature list | keep as-is | `grid` | `grid` |
| Tech stack tags | keep as-is | `:hashtag[]` | `:hashtag[]` |
| Live demo link | keep as-is | `:button[]` | `:button[]` |
| Related project links | keep as-is | `sites` | `sites` |

### Special-Purpose Directives

These render widgets from structured data. Never build that data from prose. Use one only in `default`/`rich`, and only when the article already contains content of exactly that shape (converting a list into the required table is fine):

| Directive | Only when the article already has |
|-----------|-----------------------------------|
| `calendar` | A dated schedule or event list within one month |
| `plan` | A task table/list with status, owner, dates or progress |
| `okr` | Objectives with key results and target/current numbers |
| `deadline` | One explicit target date the text counts down to (launch, event, registration close) |
| `echart` | A numeric data table (`rich` only; keep the table and add the chart after it) |
| `story` | A numbered shot list / storyboard |
| `mind` | A nested outline list (3+ levels) that works as a concept map |
| `yoicard` | An author sign-off or contact block at the end |
| `emoji` | Never added during enhancement (names depend on the emoji source) |

## Directive Syntax Reference

### Syntax Rules

- **Inline directives**: `:name[content]{attributes}` — text decoration embedded in paragraphs
- **Leaf directives**: `::name{attributes}` — a single line with no body (`image`, `photo`)
- **Block directives**: open with `:::name{attributes}`, close with `:::`, content in between. Body-less blocks (`banner`, `ghcard`, `video`, ...) still need the closing `:::`
- **Attributes stay on the opening line** — a line break inside `{...}` breaks the directive. Quote values (`title="A b"`); flags take `"true"` / `"false"`
- **Container nesting**: outer colon count **must be strictly greater** than inner. `::::` wraps `:::`, `:::::` wraps `::::`. Fenced code blocks inside don't count
- **Two-level nesting** (`::::` wrapping `:::`) — most common, e.g. tabs containing callouts
- **Three-level nesting** (`:::::` wrapping `::::` wrapping `:::`) — e.g. tabs inside grid
- `tab:` / `folder:` lines are plain lines inside the container, not directives; keep each on its own line with a blank line before and after
- Inside `grid`, `---` separates cells, so it cannot be used as a horizontal rule there

### Structure & Layout

#### grid — Multi-column layout
```markdown
:::grid{cols="3" gap="12"}
**Title 1**
Content 1

---

**Title 2**
Content 2
:::
```
- `cols`: 2 | 3 | 4; omit for auto-wrapping columns (`minw` min column width, default `240px`)
- `gap`: spacing in px
- `bg`: card (default) | box | none
- Use `---` with a blank line on both sides to separate cells (directly under a text line it turns that line into a heading)

#### tabs — Tabbed content
```markdown
:::tabs
tab: Tab 1

Content 1

tab: Tab 2{color=blue}

Content 2
:::
```
- Each `tab: Label` line starts a tab (blank lines around it)
- `tab: Label{color=blue}` sets the tab color
- Use `::::tabs` when a tab contains `:::` directives

#### folding — Collapsible panel
```markdown
:::folding{title="View full config"}
Long content
:::
```
- `title`: collapsible button text
- `open="true"`: expanded by default
- `color`: custom color

#### folders — Grouped collapsible sections
```markdown
:::folders
folder: Chapter 1: Basics

Content 1

folder: Chapter 2: Components

Content 2
:::
```
- Each `folder: Title` line starts a section (blank lines around it)
- `expand`: first (default) | all | none; `folder: Title {open}` or `{closed}` overrides one section

#### timeline — Timeline
```markdown
:::timeline
- 2024-01 | Project started | Tech stack decided
- 2024-03 | v1 released | Features live
:::
```
- Each line starts with `-`, separated by `|` into **date**, **title**, **description**
- Description is optional

#### banner — Banner
```markdown
:::banner{title="Mountains and Lakes" subtitle="Recording every journey" bg="https://..."}
:::
```
- `title`: main heading; `subtitle`: subheading
- `bg`: background image; `avatar`: avatar image (both accept `@img/`, relative paths or URLs)
- `link`: jump link

#### poetry — Poetry layout
```markdown
:::poetry{title="Quiet Night Thoughts" author="Li Bai" date="Tang"}
Before my bed, the moonlight glows,
It seems like frost upon the ground.
:::
```
- `title`: title, `author`: author, `date`: era, `footer`: footer note

#### paper — Letter paper
```markdown
:::paper{title="Letter" author="Author" date="Date"}
Body content
<!-- paragraph -->
Next paragraph
:::
```
- `<!-- paragraph -->`: normal paragraph (first-line indent)
- `<!-- section Title -->`: chapter with centered title
- `<!-- line right -->`: right-aligned line
- `footer`: footer text

#### reel — Scroll
```markdown
:::reel{title="Lantingji Xu" author="Wang Xizhi" date="Eastern Jin"}
Vertical text content
:::
```
- Text flows right-to-left vertically
- `footer`: footer text

### Content Display

#### callout — Alert box
```markdown
:::callout{type="info"}
Information alert content
:::

:::callout{type="tip" title="Pro tip"}
Tip content
:::
```
- `type`: info (blue, default) | tip (green) | warn (yellow) | danger (red)
- `title`: custom title (defaults to the type name)

#### note — Highlight block
```markdown
:::note{color="blue" title="About the theme"}
Content
:::
```
- `color`: blue | green | red | yellow | purple or any color value; omit for theme color
- `title`: set title

#### quot — Quote card
```markdown
:::quot{icon="lightbulb"}
Quote content
:::
```
- `icon`: Iconify name (`lucide:lightbulb`), bare name (gets `lucide:` prefix) or image URL; omit for a quote mark
- Body is rendered as plain text

#### title — Decorated heading
```markdown
:::title{style="quote"}
Read ten thousand books, travel ten thousand miles
:::
```
- `style`: quote (default) | badge
- `el`: h2 (default) to h6; `centered="true"`; `color`; `shadow="true"`
- `prefix` / `suffix` (suffix: quote style only): Iconify name, image or text; `prefix=""` hides the prefix
- Renders as a real heading

#### blockquote — Paragraph quote
```markdown
:::blockquote
Multi-paragraph quote content
:::
```
- Quote mark icons appear at top-left and top-right corners

#### code blocks — Window frame and shell prompt (built in, not a directive)
````markdown
```ts title="vite.config.ts" highlight="2"
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
```

```bash title="Install"
$ pnpm install
Done in 3.2s
```
````
- Every fenced block renders as a window titled with the language name; `title` overrides it (use the file name)
- `linenos`: line numbers; `highlight="2,4-6"`: highlight lines (value must be quoted); `no-title`: plain block without window
- Shell languages (bash, sh, shell, zsh, console, fish): lines starting with `$ ` are commands, shown with a prompt and the only lines copied; other lines are output. `~/app$ cmd` sets the prompt path; write `\$` for a literal `$` in output
- `markdown` blocks and code inside `panel` stay plain

#### panel — Code panel
````markdown
:::panel
```js title="File A" right="Note A"
code...
```

```js title="File B" right="Note B"
code...
```
:::
````
- `title` in code block → left label (defaults to language), `right` → right note
- Also supports text mode: `<!-- label: left | right -->` before a segment; both modes can mix

#### copy — Copy block
```markdown
:::copy{label="Install dependency"}
pnpm add remark-directive
:::
```
- `label`: left label text
- Content is collapsed into one line of plain text

#### private — Private content
```markdown
:::private{password="vergil" hint="theme name"}
Encrypted content
:::
```
- `password` (required): decryption password
- `hint`: password hint

### Media

#### image — Enhanced image
```markdown
::image{src="https://..." alt="Description" download="true" ratio="1/1" width="300px"}
```
- `src` (required): image URL, `@img/` or relative path
- `alt`: description (shown as caption)
- `width` / `height`: dimensions
- `ratio`: fixed aspect ratio, e.g. `1/1`, `16/9`
- `download`: true or custom link
- `fancybox`: false disables click-to-zoom

#### gallery — Gallery
```markdown
:::gallery{layout="grid"}
![alt](url)
![alt](url)
:::
```
- `layout`: grid (default) | flow
- `size`: xs | s | m (default) | l | xl | mix
- `ratio`: square | portrait | origin

#### photo — Photo frame with camera info
```markdown
::photo{src="https://..." brand="Fujifilm" focal="23mm" aperture="f/8" shutter="1/250s" iso="ISO 160"}
```
- `src` (required); `alt`
- `type`: blur (default, blurred backdrop + info bar) | watermark (white bar: brand/model, logo, EXIF, time)
- `brand` (known brands show a logo), `logo`, `focal`, `aperture`, `shutter`, `iso`; `model` and `datetime` show in watermark only
- Fill camera fields only with values the article states
- `fancybox="false"` disables click-to-zoom

#### video — Video
```markdown
:::video{src="..." poster="..." ratio="16/9" pip="auto"}
:::

:::video{bilibili="BV1GJ411x7h7"}
:::

:::video{youtube="jfKfPfyJRdk"}
:::
```
- `src`: video URL, `poster`: cover image
- `ratio`: 16/9 (default) or any `w/h`, e.g. 4/3 | 1/1 | 9/16
- `pip`: auto (default) | manual | off (local video only)
- `align`: left (default) | center | right
- `width`: max width
- `autoplay`: true

#### audio — Audio
```markdown
:::audio{src="..." title="Song" artist="Artist" cover="..."}
:::

:::audio{netease="25706282" title="Sunny Day" artist="Artist" mode="card"}
:::

:::audio{voice="..." duration="15"}
:::
```
- Standard mode: `src`, `title`, `artist`, `cover`
- NetEase Cloud: `netease` as song ID; `mode`: mini (default) | card
- Voice: `voice` as file path, `duration` in seconds
- `align`: left (default) | center | right
- `width`: custom width

### Cards & Links

#### ghcard — GitHub card
```markdown
:::ghcard{type="repo" repo="owner/repo"}
:::

:::ghcard{type="user" user="octocat" bio="Bio"}
:::
```
- `type`: repo (default) | user
- `repo`: owner/repo format
- `user`: GitHub username
- `bio`: custom bio (user only)
- `avatar`: false hides avatar (user only)

#### yoicard — Business card
```markdown
:::yoicard{name="Your Name" role="Writer · Photographer"}

One-line bio

<!-- contact -->

**example.com**
hello@example.com
:::
```
- `name` (required); `role`: one-line title
- `<!-- contact -->` splits the bio (above) from the contact block (below)
- Background: `bg` (color) | `bg-image` (+ `bg-mode`: full | left | right) | `bg-gradient` (`135deg, #fef3c7, #fed7aa`) | `bg-pattern` (diagonal | dots | grid | grain)
- Also `accent`, `icon`, `logo`, `qr` (QR code content), `text` (auto | light | dark)

#### sites — Site link cards
```markdown
:::sites{group="friends"}
:::
```
- `group` (required): group name defined in `src/data/config/links.ts`

#### posters — Poster wall
```markdown
:::posters{group="movies" ratio="square"}
:::
```
- `group` (required): group name defined in config (shared with `sites`)
- `ratio`: portrait (default, 2:3) | square
- `cols`: fixed column count 2–8

#### hashtag — Tag link
```markdown
:hashtag[Astro]{href="/tags/astro"}
:hashtag[CSS]{href="/tags/css" color="blue"}
```
- Defaults to cycling through 7 colors automatically
- `color`: manually specify color

#### button — Button
```markdown
:button[View docs]{href="/" color="accent" icon="lucide:search"}
```
- `href`: jump link, `color`: color
- `icon`: Iconify icon name or image URL
- `size="xs"`: small size

### Text & Interaction (inline)

#### mark — Highlight
```markdown
:mark[key content]
:mark[special attention]{color="red"}
```
- `color`: yellow (default) | green | red | blue | purple | accent or any color value

#### u — Underline
```markdown
:u[underlined]{color="blue"}
```

#### emp — Emphasis mark
```markdown
:emp[needs special emphasis]
```
- Traditional Chinese emphasis dots; `color` optional (defaults to theme color)

#### wavy — Wavy underline
```markdown
:wavy[spelling error hint]{color="red"}
```

#### del — Strikethrough
```markdown
:del[¥199]
```

#### sup / sub — Superscript/Subscript
```markdown
H:sub[2]O
E = mc:sup[2]{color="red"}
```

#### kbd — Keyboard key
```markdown
:kbd[Ctrl] + :kbd[C]
```

#### blur — Blur display
```markdown
:blur[Click here to reveal hidden content]
```
- Click to remove blur effect

#### psw — Password mask
```markdown
:psw[MySecretDB_2024]
```
- Click to reveal plaintext

#### checkbox — Checkbox
```markdown
:checkbox[default unchecked]
:checkbox[checked]{checked="true" color="green" symbol="plus"}
```
- `checked="true"`: checked state
- `symbol`: plus | minus | times
- `inline="true"`: inline usage (block by default)

#### radio — Radio button
```markdown
:radio[Option A]{checked="true" color="orange"}
```
- `checked="true"`: checked state
- `inline="true"`: inline usage

#### step-brackets — Step marker
```markdown
:step-brackets[01]{title="Clone repository"}
```
- `title`: step title

#### emoji — Emoji image
```markdown
It finally works :emoji[1f389]{source="twemoji"}
```
- Bracket content is the emoji name in the chosen source
- `source`: default (= qq) | qq | aru | tieba | blobcat | twemoji (Unicode code point, e.g. `1f600`)
- `height`: default `1.75em`

#### ann — Handwritten annotation
```markdown
:ann[Empty hills]{note="quiet after the rain" direction="top-right" color="green"} after fresh rain
```
- Draws a hand-drawn arrow from the marked words to a margin note
- `note`: note text; omit to only tint the words
- `direction`: bottom (default) | top | top-right | right | bottom-right | bottom-left | left | top-left
- `color`: amber | blue | green | red | purple | rainbow (default warm gray)
- Alternate directions on adjacent lines so notes don't overlap

### Charts

#### mermaid — Diagrams
```markdown
:::mermaid
flowchart LR
    A[Request] --> B{Cached?}
    B -->|yes| C[Return cache]
    B -->|no| D[Query DB]
:::
```
- Any Mermaid type: flowchart, sequenceDiagram, gantt, classDiagram, stateDiagram, erDiagram, ...
- Raw text passes through Markdown first; put the diagram in a fenced code block inside the directive when labels contain quotes, `*`, `_` or `[]()`

#### echart — Data charts
```markdown
:::echart{height="300px"}
{
  "xAxis": { "type": "category", "data": ["Jan", "Feb", "Mar"] },
  "yAxis": { "type": "value" },
  "series": [{ "type": "bar", "data": [120, 200, 150] }]
}
:::
```
- Body must be valid JSON (an ECharts `setOption` object, no functions); a fenced `json` block inside also works
- `height`: default `400px`

### Time Planning

#### deadline — Countdown
```markdown
:::deadline{date="2026-12-31T23:59:59" title="Registration closes" description="Time left"}
:::
```
- `date` (required): `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`
- `title`, `description`, `expiredText` (shown after the date), `showSeconds="false"`

#### calendar — Month calendar
```markdown
:::calendar{month="2026-05"}
| date | type | content | color | link |
| ---- | ---- | ------- | ----- | ---- |
| 05-01 | Holiday | Day trip | red | |
| 05-12 | Work | Project review | | |
:::
```
- `month`: `YYYY-MM` shown first (default current month)
- Header names must be English; every column is optional: `date` (`MM-DD`, `YYYY-MM-DD` or day `D`), `type` (same type, same color), `content`, `color` (blue | green | red | purple | yellow | cyan | orange | pink), `link`
- Lunar dates, solar terms and Chinese public holidays are added automatically

#### okr — Objectives and key results
```markdown
:::okr{title="Q2 Goals" period="2026 Q2"}
## O1: Grow the newsletter

| Key Result | Target | Current | Status |
|------------|--------|---------|--------|
| Subscribers | 1000 | 640 | ontrack |
| Issues sent | 12 | 5 | behind |
:::
```
- `## Heading` = objective (a paragraph under it is its description); table rows = key results
- Columns: `Key Result`, `Target`, `Current` (progress = Current / Target), `Description`, `Status`, `Link`
- `Status`: ontrack | at-risk | behind | completed (or 正常 / 风险 / 滞后 / 完成)

#### plan — Multi-view task board
```markdown
:::plan{title="Release plan" views="board,table,timeline" dateCol="Due" statusCol="Status" titleCol="Task"}
| Task:text | Status:status | Priority:priority | Due:date | Done:progress |
|-----------|---------------|-------------------|----------|---------------|
| Spec | done | P0 | 2026-01-10 | 100% |
| Build | doing | P0 | 2026-02-01 | 60% |
:::
```
- Header cells are `Name:type`: text (default) | status (todo/doing/done) | priority (P0/P1/P2) | date | progress | number | checkbox (true/false) | select | link
- `views`: board | list | table | timeline | milestone | progress | ebbinghaus (comma-separated); `default`: initial view
- Column mapping: `dateCol`, `startDate` / `endDate` (range bars), `progressCol`, `statusCol`, `titleCol`, `ownerCol`, `priorityCol`, `descCol`; board: `groupBy`, `groupOrder`; table: `filters`; ebbinghaus: `steps`
- timeline needs `dateCol` or `startDate`/`endDate`; milestone and ebbinghaus need `dateCol`; progress needs `progressCol`

### Visual Narrative

#### story — Storyboard
```markdown
:::story
| shot | scale | duration | image | desc | dialogue |
|------|-------|----------|-------|------|----------|
| 1 | Close-up | 3s | https://... | She checks her phone | "What now?" |
:::
```
- `shot` column is required; `image` (URL or `![](...)`), `desc`, `dialogue`, `note` have fixed roles
- Any other column becomes a colored tag

#### mind — Mind map
```markdown
:::mind
- Theme design
  - Visual system
    - Colors
    - Typography
  - Content directives
:::
```
- A nested Markdown list becomes a collapsible, zoomable mind map

### Math (frontmatter, not a directive)

````markdown
---
katex: true
---

Inline $E = mc^2$ and a block:

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$
````
- Formulas render only when frontmatter sets `katex: true` (light, fast) or `mathjax: true` (broader LaTeX/AMS support; wins if both are set); otherwise `$...$` stays raw text
- Inline `$...$` needs a space or punctuation on both sides; `$$` blocks sit on their own lines

## Hard Constraints

Strictly enforce these rules:

1. **Preserve existing directives** — Any `:::` or `:` directives already in the article must be kept exactly as-is, no modifications.
2. **Do not overwrite original files** — `enhance` mode writes `<original-filename>.enhanced.md`; `write` mode never replaces an existing file without asking.
3. **Text content unchanged in `enhance` mode** — Do not add, remove or reword text, and do not change meaning. Typesetting edits are allowed: whitespace and CJK–Latin spacing, punctuation width and quote marks, heading levels (including removing a body `#` that repeats the title), splitting a paragraph at an idea boundary, and turning content that is already an enumeration or a comparison into a list or table. List the typesetting edits in the report.
4. **Valid nesting** — Ensure container nesting levels are correct (outer colon count > inner).
5. **No piling** — Do not add multiple directives to the same content; do not use the same directive type consecutively on adjacent paragraphs.
6. **Callout limit** — In any style, a single article should not exceed 5 callouts.
7. **Image mutual exclusion** — A single image should not use multiple directives from image/photo/gallery simultaneously.
8. **Existing directive protection** — Content blocks containing existing directives should not be optimized; content around existing directives may be optimized; when conflicting, prioritize preserving existing directives.
9. **Nothing invented** — In either mode, no fabricated numbers, versions, dates, quotes, links or image URLs. Mark a gap as `[TODO: what is missing]` in the text and list it in the report.

## Output Format

1. Output the complete Markdown file
2. `enhance` mode: preserve the original YAML frontmatter (only add `katex: true` when the math rule applies), and add a comment at the top:
   ```yaml
   ---
   # vergil-writing-skills: mode=enhance type=<type> style=<style> directive-count=<count>
   title: Original title
   # ... other original frontmatter
   ---
   ```
3. `write` mode: frontmatter valid for the theme's blog collection. `draft: true` until the author has reviewed it:
   ```yaml
   ---
   # vergil-writing-skills: mode=write type=<type> style=<style> directive-count=<count>
   title: 标题
   excerpt: 一句话摘要，列表页会显示
   publishDate: 2026-04-23
   tags:
     - 标签
   draft: true
   ---
   ```
   Optional: `series` (series name), `banner` (cover image, `'@img/blog/<slug>/cover.jpg'`), `categories`.
4. Report to the user: the file path, the typesetting edits made, the directives added, and any `[TODO]` gaps. In `enhance` mode, also the worst writing problems found (at most five, with the line they're on)

## Example

### Input (enhance mode, tech-blog + default style)

````markdown
---
title: Building a Blog with Astro
publishDate: 2024-01-15
---

# Building a Blog with Astro

I recently migrated my blog from Hexo to Astro. Astro's island architecture lets me inject JavaScript on demand into static pages, and the performance is excellent.

## Installation

First install Astro:

```bash
npm create astro@latest
```

After installation, enter the project directory and install dependencies.

Note: Node.js version must be >= 18.14.1.

## Configuration

Configure site info and routing in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  integrations: []
});
```

If you use SSR, you also need to configure an adapter. Vercel, Netlify, and Cloudflare Pages all have official adapters.

## Deployment

Build command:

```bash
npm run build
```

After building, deploy the `dist` directory to any static hosting service.
````

### Output

````markdown
---
# vergil-writing-skills: mode=enhance type=tech-blog style=default directive-count=4
title: Building a Blog with Astro
publishDate: 2024-01-15
---

I recently migrated my blog from Hexo to Astro. Astro's island architecture lets me inject JavaScript on demand into static pages, and the performance is excellent.

## Installation

First install Astro:

:::copy{label="Install Astro"}
npm create astro@latest
:::

After installation, enter the project directory and install dependencies.

:::callout{type="warn"}
Node.js version must be >= 18.14.1.
:::

## Configuration

Configure site info and routing in `astro.config.mjs`:

:::folding{title="astro.config.mjs"}
```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  integrations: []
});
```
:::

If you use SSR, you also need to configure an adapter. Vercel, Netlify, and Cloudflare Pages all have official adapters.

## Deployment

Build command:

:::copy{label="Build"}
npm run build
:::

After building, deploy the `dist` directory to any static hosting service.
````

### Report

- File: `building-a-blog-with-astro.enhanced.md`
- Typesetting: removed the body `#` heading that repeated the frontmatter title
- Directives: 2 × `copy`, 1 × `callout`, 1 × `folding`
- Writing notes (not changed): "the performance is excellent" is an adjective without evidence; a load-time or bundle-size number would carry it
