# cristiancm.com

This repository contains the source code and content for [cristiancm.com](https://cristiancm.com). 

Built with **11ty**, a lightweight static site generator that transforms Markdown content into static HTML. **Keep things simple**, just content as Markdown and templates as HTML/Nunjucks.

## Local Development

```bash
npm i
npm run dev # live preview
```

Access `http://localhost:8080`.

## Build

Generates static files in `_site/`.

```bash
npm run build
```

## Deploy to Vercel

1. Push to GitHub
2. Connect the repo to Vercel
3. Vercel automatically detects 11ty
4. Done!

## Project Structure

- `index.md` - Home page content (written in Markdown)
- `_includes/` - Layout templates that use fields defined in Markdown front matter
  - `base.html` - Base template that renders content and injects variables like `title`, `layout`, etc.
- `style.css` - Styling
- `.eleventy.js` - 11ty configuration
- `package.json` - Dependencies
- `_site/` - Generated static files (build output)

## How It Works

Content is written in Markdown files (e.g., `index.md`) with YAML front matter that defines:
- `layout` - which template in `_includes/` to use for rendering
- `title` - page title
- `permalink` - custom URL path

Templates in `_includes/` access these fields via Nunjucks template syntax and render the Markdown content as HTML.

### Example

**index.md:**
```markdown
---
layout: base.html
title: Cristian C.M. Home
permalink: /
---

# cristiancm.com

Welcome to my site
```

**_includes/base.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>{{ title }}</title>
</head>
<body>
  {{ content | safe }}
</body>
</html>
```

The Markdown is processed into HTML and inserted into `content`, while front matter fields are available as template variables.