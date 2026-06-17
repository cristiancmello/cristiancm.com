# cristiancm.com

**Personal portfolio and blog website** for Cristian C.M., a fullstack software engineer with 10 years of experience, based in Espírito Santo, Brazil.

## Project Overview

This is a **static site generator-based portfolio** built with **11ty (Eleventy)**, a lightweight and minimal static site generator that prioritizes simplicity and content-first approach.

### Key Characteristics
- **Framework**: 11ty v3.1.6 — lightweight static site generation
- **Content Format**: Markdown (`.md`) for pages and blog posts
- **Templating**: Nunjucks (`.html` templates in `_includes/`)
- **Styling**: Custom CSS with design system variables
- **Deployment**: Vercel (automatic detection and build)
- **Language**: Portuguese-BR for content

## Architecture

### Directory Structure
```
.
├── index.md                    # Home page content
├── learning-in-public.md       # Blog list page
├── .eleventy.js               # 11ty configuration
├── style.css                  # Global styling with CSS variables
├── _includes/                 # Layout templates
│   ├── base.html             # Base template for home page
│   ├── blog-list.html        # Template for blog list page
│   └── blog-post.html        # Template for individual blog posts
├── posts/                     # Blog posts
│   ├── tdd-na-pratica.md
│   └── jornada-tdd-producao.md
├── _site/                     # Build output (generated)
├── package.json               # Dependencies
└── README.md                  # Project documentation
```

### How It Works

1. **Content as Markdown**: Pages and blog posts are written in Markdown with YAML frontmatter
   - Frontmatter defines `layout` (which template to use), `title`, `permalink`, and custom metadata (e.g., `date`, `excerpt`, `isPlaylist`)

2. **11ty Processing**:
   - Reads Markdown files and processes frontmatter
   - Applies specified Nunjucks template layout
   - Renders Markdown content as HTML
   - Generates static HTML files in `_site/`

3. **Template Variables**: Templates access frontmatter fields via Nunjucks syntax
   - Example: `{{ title }}` in template accesses the `title` field from frontmatter
   - `{{ content | safe }}` renders the processed Markdown as HTML

4. **Collections**: 11ty's `addCollection()` feature groups blog posts
   - `blog` collection: all files matching `posts/*.md`, sorted by `date` descending

5. **Filters**: Custom 11ty filters for date formatting
   - `dateDisplay`: Formats date in Portuguese-BR locale (e.g., "16 de junho de 2026")
   - `dateFilter`: Converts date to ISO string for `datetime` attributes

### Styling

CSS uses a **design system approach** with CSS variables:
- **Color palette**: background, text, secondary text, border, accent (blue), hover states
- **Typography**: System font stack (`-apple-system`, BlinkMacSystemFont, etc.)
- **Spacing scale**: `xs` through `2xl` for consistent margins/padding
- **Components**: hero section, menu, social links, blog list, post preview

**Current design**:
- Clean, minimal aesthetic centered on content
- Responsive layout (mobile-first with `clamp()` for fluid typography)
- Fixed navigation menu in top-right
- Hero section with personal introduction and social links
- Blog list with post previews (title, date, excerpt)

### Favicon

Custom SVG favicon (embedded in `base.html` and `blog-list.html`):
- Radial gradient blue sphere with "CCM" stamp effect
- No external file dependency (inlined SVG)
- Scalable and lightweight

## Recent Changes

Latest commits show evolution of the site:

1. **Blog Feature** (`2ca216e`): Added blog list and markdown examples
2. **Learning in Public Section** (`006d339`): Added "Learning in Public" menu item and initial content
3. **Favicon** (`0135dde`): Added custom SVG favicon
4. **Style Refactoring** (`8dd3cbe`): Refactored `style.css` (home page)
5. **Content Updates** (`ee2c10e`): Updated `index.md` and `style.css`

Earlier commits show foundational work:
- Nunjucks templating setup
- 11ty configuration
- 11ty initialization
- Social media links with security attributes (`rel="noopener noreferrer"`)

## Content

### Pages

#### Home (`index.md`)
- Navigation to "Learning in Public"
- Hero section with personal intro
- Skills: Backend (Java, Kotlin, Spring), Frontend (React, TypeScript)
- Current work: Cellphone Insurance at NTTDATA/C6Bank
- Experience: 10 years as software engineer
- Social links: GitHub, LinkedIn, Email

#### Learning in Public (`learning-in-public.md`)
- Uses `blog-list.html` template
- Lists all blog posts from `posts/` directory
- Posts sorted by date (newest first)
- Shows title, date, and excerpt
- Optional "PLAYLIST" badge if post has `isPlaylist: true` frontmatter

### Blog Posts

1. **tdd-na-pratica.md**: TDD in Practice (PT-BR)
2. **jornada-tdd-producao.md**: TDD Journey in Production (PT-BR)

Both are in Portuguese-BR, reflecting Cristian's "Learning in Public" philosophy.

## Development

### Local Setup
```bash
npm install
npm run dev       # Starts live server at http://localhost:8080
npm run build     # Generates _site/ output
npm run watch     # Watches for changes without serving
```

### Dependencies

**Main**:
- `@11ty/eleventy` (v3.1.6): Static site generator
- `markdown-it` (v14.2.0): Markdown parser
- `unified`, `remark-parse`, `remark-rehype`, `rehype-stringify`: Markdown → HTML pipeline
- `shiki` (v4.2.0): Syntax highlighting for code blocks

**Build System**: No build tool (webpack, vite, etc.) — pure 11ty

### Configuration (`.eleventy.js`)

- **Passthrough copy**: `style.css`, `favicon.svg`
- **Locale**: Portuguese-BR for date formatting
- **Collections**: `blog` collection for posts
- **Template engines**: Nunjucks for both Markdown and HTML files
- **Output**: Static files in `_site/`, served from root (`/`)

## Deployment

**Platform**: Vercel

**Process**:
1. Push to GitHub
2. Vercel automatically detects 11ty project
3. Vercel builds `_site/`
4. Site deployed automatically

No custom build commands needed — Vercel's auto-detection handles 11ty.

## Design Philosophy

- **Content First**: Markdown for simplicity and portability
- **Minimal Framework**: 11ty avoids bloat compared to Next.js, Gatsby, etc.
- **No Database**: Static generation for performance, security, and simplicity
- **Semantic HTML**: Clean templates with proper `<html>`, `<head>`, `<body>` structure
- **Accessibility**: Proper meta tags (charset, viewport), semantic navigation, datetime attributes
- **Performance**: No JavaScript (except 11ty build), static output, inlined SVG favicon

## Future Expansion

Potential areas for growth:
- **Blog post templates** (`blog-post.html`): Individual post pages with metadata, tags, related posts
- **CSS improvements**: Dark mode, animations, better mobile experience
- **Content expansion**: More blog posts, project showcase, CV section
- **RSS feed**: Using 11ty plugins for content distribution
- **Search**: Static site search (11ty + client-side search library)
