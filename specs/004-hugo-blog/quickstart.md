# Quickstart: Hugo-Based Blog Integrated at /blog Route

**Feature**: Hugo-Based Blog Integrated at /blog Route  
**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts

## Overview

This guide provides step-by-step instructions for setting up and implementing a Hugo-based blog that integrates with the React application at the `/blog` route, matching the neonic design theme.

## Prerequisites

- Hugo static site generator installed (latest stable version)
- Go programming language (required for Hugo)
- Node.js and npm (for React app build)
- Firebase CLI (for deployment)
- Access to website design system (neonic theme SCSS variables)

## Implementation Steps

### Step 1: Install Hugo

Install Hugo static site generator:

```bash
# Windows (using Chocolatey)
choco install hugo

# macOS (using Homebrew)
brew install hugo

# Linux
# Download from https://gohugo.io/installation/

# Verify installation
hugo version
```

### Step 2: Initialize Hugo Blog Structure

Create Hugo blog directory structure:

```bash
# From repository root
mkdir blog
cd blog

# Initialize Hugo site
hugo new site . --force

# Create content directory for posts
mkdir -p content/posts
```

### Step 3: Configure Hugo

Create `blog/config.toml`:

```toml
baseURL = "https://nextpace.dev"
title = "Next Pace Dev Blog"
languageCode = "en-us"
publishDir = "../dist/blog"
paginate = 5
theme = "neonic-blog"

[permalinks]
  posts = "/blog/:slug"

[params]
  description = "Next Pace Dev Blog - Development insights and updates"
```

### Step 4: Create Custom Theme

Create theme directory structure:

```bash
cd blog
mkdir -p themes/neonic-blog/{layouts/{_default,partials},static/css,archetypes}
```

Create base template `themes/neonic-blog/layouts/_default/baseof.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ if .IsHome }}{{ .Site.Title }}{{ else }}{{ .Title }} | {{ .Site.Title }}{{ end }}</title>
    <link rel="stylesheet" href="/blog/css/main.css">
</head>
<body>
    {{ partial "header.html" . }}
    <main>
        {{ block "main" . }}{{ end }}
    </main>
    {{ partial "footer.html" . }}
</body>
</html>
```

### Step 5: Create Blog Listing Template

Create `themes/neonic-blog/layouts/_default/list.html`:

```html
{{ define "main" }}
<div class="blog-container">
    <h1>Blog</h1>
    <div class="blog-posts">
        {{ range .Paginator.Pages }}
        <article class="blog-post-preview">
            <h2><a href="{{ .Permalink }}">{{ .Title }}</a></h2>
            <time datetime="{{ .Date }}">{{ .Date.Format "January 2, 2006" }}</time>
            <p>{{ .Params.excerpt | default .Summary }}</p>
            <a href="{{ .Permalink }}">Read more →</a>
        </article>
        {{ end }}
    </div>
    
    {{ if gt .Paginator.TotalPages 1 }}
    <div class="pagination">
        {{ if .Paginator.HasPrev }}
        <a href="{{ .Paginator.Prev.URL }}">← Previous</a>
        {{ end }}
        <span>Page {{ .Paginator.PageNumber }} of {{ .Paginator.TotalPages }}</span>
        {{ if .Paginator.HasNext }}
        <a href="{{ .Paginator.Next.URL }}">Next →</a>
        {{ end }}
    </div>
    {{ end }}
</div>
{{ end }}
```

### Step 6: Create Single Post Template

Create `themes/neonic-blog/layouts/_default/single.html`:

```html
{{ define "main" }}
<article class="blog-post">
    <header>
        <h1>{{ .Title }}</h1>
        <time datetime="{{ .Date }}">{{ .Date.Format "January 2, 2006" }}</time>
        {{ if .Params.author }}
        <span class="author">By {{ .Params.author }}</span>
        {{ end }}
    </header>
    <div class="content">
        {{ .Content }}
    </div>
    {{ if .Params.tags }}
    <footer class="tags">
        {{ range .Params.tags }}
        <span class="tag">{{ . }}</span>
        {{ end }}
    </footer>
    {{ end }}
</article>
{{ end }}
```

### Step 7: Create Header and Footer Partials

Create `themes/neonic-blog/layouts/partials/header.html`:

```html
<header class="blog-header">
    <nav>
        <a href="/">Home</a>
        <a href="/#services">Services</a>
        <a href="/#process">Process</a>
        <a href="/#pricing">Pricing</a>
        <a href="/blog">Blog</a>
        <a href="/#contact">Contact</a>
    </nav>
</header>
```

Create `themes/neonic-blog/layouts/partials/footer.html`:

```html
<footer class="blog-footer">
    <!-- Static HTML version matching React Footer component -->
    <!-- Include all footer columns: About Us, Projects, Solutions, Blog, Terms -->
</footer>
```

### Step 8: Create Theme Stylesheet

Create `themes/neonic-blog/static/css/main.scss`:

```scss
@import '../../../../styles/variables';

// Blog-specific styles matching neonic theme
.blog-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  background: $bg-main;
  color: $text-primary;
}

.blog-post-preview {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid $border-default;
  background: $bg-secondary;
  border-radius: 0.75rem;
  
  h2 a {
    color: $text-primary;
    text-decoration: none;
    
    &:hover {
      color: $primary;
    }
  }
}

// Add more styles matching neonic theme
```

### Step 9: Create Sample Blog Post

Create `blog/content/posts/first-post.md`:

```markdown
---
title: "Welcome to Our Blog"
date: 2025-01-27T10:00:00Z
slug: "welcome-to-our-blog"
excerpt: "Welcome to the Next Pace Dev blog where we share insights and updates."
author: "Next Pace Dev"
tags: ["announcement"]
draft: false
---

# Welcome to Our Blog

This is our first blog post. More content coming soon!
```

### Step 10: Build Hugo Blog

Build Hugo site:

```bash
cd blog
hugo --minify
```

This generates static HTML files in `dist/blog/` directory.

### Step 11: Update Build Script

Update `package.json` to include Hugo build:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "npm run build:blog && vite build",
    "build:blog": "cd blog && hugo --minify",
    "preview": "vite preview"
  }
}
```

### Step 12: Test Integration

1. Build Hugo blog: `npm run build:blog`
2. Build React app: `npm run build`
3. Verify `dist/blog/` contains Hugo-generated files
4. Verify `dist/` contains React app files
5. Test locally: `npm run preview` or `firebase serve`
6. Navigate to `/blog` route and verify blog displays correctly

### Step 13: Verify Design Consistency

1. Compare blog design with main website:
   - Colors match neonic theme
   - Typography matches main site
   - Spacing is consistent
   - Header/footer match React components
2. Test responsive behavior:
   - Mobile (< 768px): Single column layout
   - Tablet (768px-1023px): Adapted layout
   - Desktop (≥ 1024px): Full layout

## Content Management Workflow

### Creating a New Blog Post

1. Create new Markdown file in `blog/content/posts/`:
   ```bash
   cd blog
   hugo new posts/my-new-post.md
   ```

2. Edit front matter and content:
   ```markdown
   ---
   title: "My New Post"
   date: 2025-01-27T10:00:00Z
   slug: "my-new-post"
   excerpt: "Post excerpt here"
   draft: false
   ---
   
   # My New Post
   
   Content here...
   ```

3. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

## Testing Checklist

- [ ] Hugo blog builds successfully to `dist/blog/`
- [ ] Blog accessible at `/blog` route
- [ ] Blog listing page displays posts correctly
- [ ] Pagination works (when > 5 posts)
- [ ] Individual post pages display correctly
- [ ] Design matches neonic theme (colors, typography, spacing)
- [ ] Header and footer match React app components
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Markdown formatting renders correctly
- [ ] Links work correctly (internal and external)
- [ ] Images display correctly if included
- [ ] Code blocks render correctly if included

## Common Issues

1. **Hugo build fails**: Check Hugo version, verify config.toml syntax
2. **Blog not accessible**: Verify `publishDir` is set to `../dist/blog`, check Firebase hosting config
3. **Design inconsistencies**: Verify SCSS variables match neonic theme, check CSS compilation
4. **Header/footer mismatch**: Compare static HTML with React components, ensure CSS classes match
5. **Pagination not working**: Verify `paginate = 5` in config.toml, check template pagination logic

## Next Steps

After implementation:
1. Run `/speckit.tasks` to create detailed task breakdown
2. Create additional blog posts
3. Customize theme further if needed
4. Set up content authoring workflow
5. Configure RSS feed if desired (Hugo generates automatically)

