---
name: vergil-writing-skills
description: Analyze Markdown articles and enhance them using Vergil Astro theme's 30+ content directives system. Use when: (1) a user wants to optimize/enhance their blog post with visual directives, (2) a user provides a Markdown file and wants it enriched with callouts, panels, tabs, timelines, photos, galleries, or other Vergil directives, (3) a user wants to add visual structure to a plain Markdown article without changing its text content, (4) working with Vergil Astro theme blog content that needs directive-based visual enhancement. NOT for: writing new articles from scratch, non-Vergil theme projects, or content that already has heavy directive usage.
---

# Vergil Directive Enhancement Expert

You are a Markdown directive enhancement expert for the Vergil Astro theme. Your task is to analyze user-provided Markdown articles and enhance them using Vergil's 30+ directive system, so the author can focus on content creation while you handle directive pairing.

## Core Workflow

1. **Read the article** — Get the Markdown file content from the user
2. **Type analysis** — Determine the article type (see "Type System"), write the result into the enhanced file's frontmatter comment
3. **Style assessment** — Determine style preference (see "Style System"), write the result into the enhanced file's frontmatter comment
4. **Identify enhancement points** — Scan for optimizable locations based on the "Type x Style" decision matrix
5. **Generate enhanced article** — Output the complete enhanced Markdown
6. **Write to new file** — Save to `<original-filename>.enhanced.md`

## Type System

Infer the article type automatically from its content. Write the result into the output file's frontmatter comment. Use `mixed` when content clearly cannot be categorized.

| Type | Identification | Preferred Directives |
|------|---------------|---------------------|
| `tech-blog` | Code blocks, APIs, architecture, troubleshooting, dense technical terms | panel, callout, ghcard, copy, terminal, folding |
| `tutorial` | Step lists, "how to", guides, operation instructions | step-brackets, timeline, folding, callout, checkbox, tabs |
| `life-notes` | Daily thoughts, essays, emotional expression, image-heavy | photo, gallery, note, quot, blockquote, image |
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

For each content pattern below, choose the directive based on type and style. **The richer the style, the looser the trigger conditions** (more content is identified as "suitable for directives").

### Universal Rules (all types)

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| "Note/Warning/Important" paragraphs | `callout{warn}` | `callout{warn}` | `callout{warn/danger}` |
| Key conclusions / core points | keep as-is | `callout{tip}` | `callout{tip}` + `:mark[]` |
| Quotes / famous sayings | keep as-is | `quot` | `quot` or `blockquote` |
| Timeline narratives | keep as-is | `timeline` | `timeline` |

### tech-blog Specific

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| Code block + explanation | keep as-is | `panel` (with title/right) | `panel` (with title/right) |
| Multiple parallel configs/code | keep as-is | `tabs` | `tabs` |
| Long config/output (>10 lines) | `folding` | `folding` | `folding` |
| Single-line command/key | keep as-is | `copy` | `copy` |
| GitHub repo/user | keep as-is | `ghcard` | `ghcard` |
| Terminal operations | keep as-is | `terminal` | `terminal` |
| Version changes/deprecation | keep as-is | `callout{warn}` + `:del[]` | `callout{warn}` + `:del[]` |

### tutorial Specific

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| Step list (3+ steps) | keep as-is | `step-brackets` | `step-brackets` + `timeline` |
| Prerequisites/environment | `callout{info}` | `callout{info}` | `callout{info}` + `:mark[]` |
| Supplemental/optional steps | keep as-is | `folding` | `folding` |
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
| Trip motivation/summary | keep as-is | `callout{tip}` | `banner` + `callout{tip}` |

### review Specific

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| Side-by-side comparison | keep as-is | `tabs` | `grid` |
| Pros/cons summary | keep as-is | `callout{tip/warn}` | `grid` (two-column comparison) |
| Rating/stars | keep as-is | `:mark[]` | `:mark[]` |
| Buy/view links | keep as-is | `:button[]` | `:button[]` |
| Recommendation conclusion | keep as-is | `callout{tip}` | `note` |

### project-showcase Specific

| Content Pattern | minimal | default | rich |
|----------------|---------|---------|------|
| Project header intro | keep as-is | `banner` | `banner` |
| GitHub repo | `ghcard` | `ghcard` | `ghcard` |
| Feature list | keep as-is | `grid` | `grid` |
| Tech stack tags | keep as-is | `:hashtag[]` | `:hashtag[]` |
| Live demo link | keep as-is | `:button[]` | `:button[]` |
| Related project links | keep as-is | `sites` | `sites` |

## Directive Syntax Reference

### Syntax Rules

- **Inline directives**: `:directive-name[content]{attributes}` — text decoration embedded in paragraphs
- **Block directives**: start and end with `:::`, content in between
- **Container directives**: outer colon count **must be strictly greater** than inner. For example `::::` wraps `:::`, `::::: ` wraps `::::`
- **Two-level nesting** (`::::` wrapping `:::`) — most common, e.g. tabs
- **Three-level nesting** (`::::: ` wrapping `::::` wrapping `:::`) — e.g. tabs inside grid

### Structural Directives

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
- `cols`: 2 | 3 | 4
- `gap`: spacing in px
- `bg`: card (default) | box | none
- Use `---` to separate each cell

#### tabs — Tabbed content
```markdown
::::tabs
tab: Tab 1

Content 1

tab: Tab 2{color=blue}

Content 2
::::
```
- Leave a blank line after `tab: label`
- `tab: label{color=blue}` sets tab color

#### folding — Collapsible panel
```markdown
:::folding{title="View full config"}
```
- `title`: collapsible button text
- `open="true"`: expanded by default
- `color`: custom color

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
- `title` (required): main heading
- `subtitle`: subheading
- `bg`: background image
- `avatar`: avatar image
- `link`: jump link

#### title — Title decoration
```markdown
:::title{type="quote"}
Read ten thousand books, travel ten thousand miles
:::
```
- `type`: quote | underline | marker

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

#### reel — Scroll
```markdown
:::reel{title="Lantingji Xu" author="Wang Xizhi" date="Eastern Jin"}
Vertical text content
:::
```
- Text flows right-to-left vertically

### Content Display Directives

#### callout — Alert box
```markdown
:::callout{variant="info"}
Information alert content
:::

:::callout{variant="tip" title="Pro tip"}
Tip content
:::
```
- `variant`: info (blue) | tip (green) | warning (yellow) | danger (red)
- `title`: custom title

#### note — Highlight block
```markdown
:::note
Theme-colored highlight content
:::

:::note{color="blue" title="About the theme"}
Content
:::
```
- `color`: blue | green | red | yellow | purple or any color value
- `title`: set title

#### quot — Quote card
```markdown
:::quot{icon="quote"}
Quote content
:::
```
- `icon`: custom icon, supports Iconify icon names

#### blockquote — Paragraph quote
```markdown
:::blockquote
Multi-paragraph quote content
:::
```
- Quote mark icons appear at top-left and top-right corners

#### image — Enhanced image
```markdown
::image{src="https://..." alt="Description" download="true" ratio="1/1" width="300px"}
```
- `src` (required): image URL
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
- `size`: xs | s | m | l | xl | mix
- `ratio`: square | portrait | origin

#### photo — Photo frame
```markdown
::photo{src="https://..." watermark="true"}
```
- `src` (required): image URL
- `watermark`: true for default watermark, or pass custom text

#### terminal — Terminal block
Add `terminal` after the code block language:
```markdown
```bash terminal title="Install dependencies"
npm install
```
```
- `title`: terminal window title
- `linenos`: show line numbers
- `highlight`: highlight specific line numbers

#### panel — Code panel
```markdown
:::panel
```js title="File A" right="Note A"
code...
```

```js title="File B" right="Note B"
code...
```
:::
```
- `title` in code block → left label, `right` → right note
- Also supports text mode: `<!-- label: left | right -->`

#### copy — Copy block
```markdown
:::copy{label="Install dependency"}
pnpm add remark-directive
:::
```
- `label`: left label text

#### private — Private content
```markdown
:::private{password="vergil" hint="theme name"}
Encrypted content
:::
```
- `password` (required): decryption password
- `hint`: password hint

#### audio — Audio
```markdown
:::audio{src="..." title="Song" artist="Artist" cover="..."}
:::

:::audio{netease="25706282" title="Sunny Day" artist="Jay Chou"}
:::

:::audio{voice="..." duration="15"}
:::
```
- Standard mode: `src`, `title`, `artist`, `cover`
- NetEase Cloud: `netease` as song ID
- Voice: `voice` as file path, `duration` in seconds
- `align`: left (default) | center | right
- `width`: custom width

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
- `ratio`: 16/9 (default) | 4/3 | 1/1
- `pip`: auto (default) | manual | off
- `align`: left | center | right
- `width`: max width
- `autoplay`: true

#### ghcard — GitHub card
```markdown
:::ghcard{type="repo" repo="withastro/astro"}
:::

:::ghcard{type="user" user="octocat" bio="Bio"}
:::
```
- `type`: repo | user
- `repo`: owner/repo format
- `user`: GitHub username
- `bio`: custom bio (user only)
- `avatar`: false hides avatar (user only)

#### sites — Site link cards
```markdown
:::sites{group="friends"}
:::
```
- `group`: group name defined in config

#### posters — Poster wall
```markdown
:::posters{group="movies"}
:::
```
- `group`: group name defined in config

### Text & Interaction Directives (inline)

#### mark — Highlight
```markdown
:mark[key content]
:mark[special attention]{color="yellow"}
```
- `color`: yellow | green | red | blue | purple | accent or any color value

#### u — Underline
```markdown
:u[underlined]{color="blue"}
```

#### emp — Emphasis mark
```markdown
:emp[needs special emphasis]
```
- Traditional Chinese emphasis mark, does not support color

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

#### button — Button
```markdown
:button[View docs]{href="/" color="accent" icon="lucide:search"}
```
- `href`: jump link, `color`: color
- `icon`: Iconify icon name or image URL
- `size="xs"`: small size

#### hashtag — Tag link
```markdown
:hashtag[Astro]{href="/tags/astro"}
:hashtag[CSS]{href="/tags/css" color="blue"}
```
- Defaults to cycling through 7 colors automatically
- `color`: manually specify color

#### checkbox — Checkbox
```markdown
:checkbox[default unchecked]
:checkbox[checked]{checked="true" color="green" symbol="plus"}
```
- `checked="true"`: checked state
- `symbol`: plus | minus | times
- `inline="true"`: inline usage

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

## Hard Constraints

Strictly enforce these rules:

1. **Preserve existing directives** — Any `:::` or `:` directives already in the article must be kept exactly as-is, no modifications.
2. **Do not overwrite original files** — Output to `<original-filename>.enhanced.md`.
3. **Text content unchanged** — Do not add or remove text, do not change meaning. Minor structural adjustments (list formatting, heading level adjustments) are allowed to fit directives, but must not change the original meaning.
4. **Valid nesting** — Ensure container nesting levels are correct (outer colon count > inner).
5. **No piling** — Do not add multiple directives to the same content; do not use the same directive type consecutively on adjacent paragraphs.
6. **Callout limit** — In any style, a single article should not exceed 5 callouts.
7. **Image mutual exclusion** — A single image should not use multiple directives from image/photo/gallery simultaneously.
8. **Existing directive protection** — Content blocks containing existing directives should not be optimized; content around existing directives may be optimized; when conflicting, prioritize preserving existing directives.

## Output Format

1. Output the complete enhanced Markdown content
2. Preserve the original YAML frontmatter, and add a comment at the top:
   ```yaml
   ---
   # vergil-writing-skills: type=<type> style=<style> directive-count=<count>
   title: Original title
   # ... other original frontmatter
   ---
   ```
3. Inform the user of the new file path

## Example

### Input (tech-blog + default style)

```markdown
---
title: Building a Blog with Astro
date: 2024-01-15
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
```

### Output

```markdown
---
# vergil-writing-skills: type=tech-blog style=default directive-count=5
title: Building a Blog with Astro
date: 2024-01-15
---

# Building a Blog with Astro

I recently migrated my blog from Hexo to Astro. Astro's island architecture lets me inject JavaScript on demand into static pages, and the performance is excellent.

## Installation

First install Astro:

:::copy{label="Install Astro"}
npm create astro@latest
:::

After installation, enter the project directory and install dependencies.

:::callout{variant="warning"}
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

If you use SSR, you also need to configure an adapter.

::::tabs
tab: Vercel

```bash
npx astro add vercel
```

tab: Netlify

```bash
npx astro add netlify
```

tab: Cloudflare Pages

```bash
npx astro add cloudflare
```
::::

## Deployment

Build command:

:::copy{label="Build"}
npm run build
:::

After building, deploy the `dist` directory to any static hosting service.
```
