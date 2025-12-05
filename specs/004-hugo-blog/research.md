# Research: Hugo-Based Blog Integrated at /blog Route

**Feature**: Hugo-Based Blog Integrated at /blog Route  
**Date**: 2025-01-27  
**Phase**: 0 - Outline & Research

## Research Tasks

### 1. Hugo Integration with React SPA

**Task**: Research best practices for integrating Hugo static site generator with React SPA, specifically building Hugo to a subdirectory and serving alongside React app.

**Findings**:
- Hugo can be configured to build to a specific subdirectory using `baseURL` and `publishDir` configuration
- For Firebase Hosting, Hugo can build to `dist/blog/` while React builds to `dist/`
- Firebase hosting configuration can serve both React app (SPA) and Hugo blog (static HTML) from same `dist/` directory
- Hugo handles its own routing within the `/blog` path, generating static HTML files
- React app uses client-side routing with fallback to `index.html`, Hugo blog uses server-side routing with actual HTML files
- Build process: Hugo builds first to `dist/blog/`, then React builds to `dist/`, both coexist in deployment

**Decision**: Hugo builds to `dist/blog/` subdirectory using `publishDir = "../dist/blog"` in Hugo config. React app builds to `dist/` root. Firebase hosting serves both from `dist/` directory, with Hugo blog accessible at `/blog/*` routes.

**Rationale**: This approach keeps builds separate, allows Hugo to handle its own routing, and integrates seamlessly with Firebase Hosting. The subdirectory approach is standard for multi-site deployments.

**Alternatives considered**:
- Embedding Hugo content in React: More complex, loses Hugo's static generation benefits, requires custom build process
- Separate subdomain: Requires DNS configuration, breaks integration, creates separate site
- Hugo generates React components: Overly complex, defeats purpose of using Hugo for static generation

---

### 2. Hugo Theme Customization for Neonic Design

**Task**: Research how to create custom Hugo theme matching neonic design system (dark backgrounds, cyan/fuchsia accents, typography, spacing).

**Findings**:
- Hugo themes are self-contained directories with `layouts/`, `static/`, `archetypes/` subdirectories
- Custom themes can be created by copying base theme or starting from scratch
- Hugo uses Go templates for layouts (`.html` files)
- SCSS/CSS can be included in `static/css/` directory and referenced in templates
- Hugo supports template inheritance via `baseof.html` layout
- Design tokens (colors, spacing) can be defined in SCSS variables matching neonic theme
- Hugo templates can include partials for reusable components (header, footer)

**Decision**: Create custom Hugo theme `blog/themes/neonic-blog/` with:
- `layouts/baseof.html` - Base template with header/footer partials
- `layouts/_default/list.html` - Blog listing page template
- `layouts/_default/single.html` - Individual post template
- `static/css/main.scss` - Custom stylesheet using neonic theme variables
- `layouts/partials/header.html` - Static HTML version of React app header
- `layouts/partials/footer.html` - Static HTML version of React app footer

**Rationale**: Custom theme provides full control over design and ensures exact match with neonic theme. Using SCSS allows reuse of design tokens from main website. Partials enable header/footer reuse across all pages.

**Alternatives considered**:
- Using existing Hugo theme and overriding: Less control, harder to match exact design
- Inline styles in templates: Less maintainable, harder to match design system
- External CSS framework: Adds dependency, may not match neonic theme exactly

---

### 3. Hugo Configuration for /blog Route and Pagination

**Task**: Research Hugo configuration for building to `/blog` subdirectory, flat URL structure (`/blog/post-slug`), and pagination (5 posts per page).

**Findings**:
- Hugo `baseURL` should be set to site's base URL (e.g., `https://nextpace.dev`)
- `publishDir` can be set to `../dist/blog` to build to subdirectory
- Hugo content structure: `content/posts/` directory with markdown files
- Front matter in markdown files controls metadata (title, date, slug, excerpt)
- Hugo pagination configured in `config.toml` with `paginate` setting (default 10, can be set to 5)
- URL structure controlled by `permalinks` configuration or front matter `slug` field
- Flat URL structure achieved by setting `permalinks.posts = "/blog/:slug"` or using `slug` in front matter

**Decision**: 
- Hugo config: `baseURL = "https://nextpace.dev"`, `publishDir = "../dist/blog"`
- Pagination: `paginate = 5` in config.toml
- URL structure: Use `slug` in front matter or `permalinks.posts = "/blog/:slug"` to achieve `/blog/post-slug` format
- Content structure: `content/posts/*.md` with front matter including title, date, slug, excerpt

**Rationale**: This configuration achieves the specified requirements: builds to `/blog` subdirectory, uses flat URL structure, and paginates at 5 posts per page. Front matter provides flexibility for content management.

**Alternatives considered**:
- Date-based URLs: More complex, doesn't match requirement for flat structure
- Different pagination count: 5 posts per page is specified requirement
- Different content structure: Standard Hugo `content/posts/` structure is conventional

---

### 4. Header and Footer Integration Approach

**Task**: Research how to create static HTML versions of React app header and footer for Hugo templates.

**Findings**:
- React components can be rendered to static HTML using server-side rendering or build-time rendering
- Alternative: Manually create HTML/CSS versions matching React component design
- Hugo partials (`layouts/partials/`) can include header and footer HTML
- Static HTML versions need to match React component structure, styling, and functionality
- Links in header/footer should use absolute paths or relative paths that work from `/blog` context
- CSS from React app can be extracted or recreated in Hugo theme's static directory

**Decision**: Create static HTML versions of header and footer in `blog/themes/neonic-blog/layouts/partials/`:
- `header.html` - Static HTML matching React Navbar component design
- `footer.html` - Static HTML matching React Footer component design
- Include same CSS classes and structure as React components
- Use SCSS variables from neonic theme for consistency
- Links use relative paths (e.g., `/` for home, `/blog` for blog listing)

**Rationale**: Static HTML partials ensure design consistency and work seamlessly with Hugo's static generation. Manual creation allows full control over HTML structure and ensures exact match with React components. SCSS variables ensure color/spacing consistency.

**Alternatives considered**:
- Iframe embedding: Breaks integration, accessibility issues, not SEO-friendly
- Separate header/footer: Would look disconnected, breaks user experience
- Generating from React components: More complex build process, adds dependency

---

### 5. Firebase Hosting Configuration for Hugo + React

**Task**: Research Firebase Hosting configuration to serve both React SPA and Hugo static blog from same deployment.

**Findings**:
- Firebase Hosting serves files from `public` directory (configured in `firebase.json`)
- Current setup: `public: "dist"` serves React app
- Hugo builds to `dist/blog/` subdirectory
- Firebase rewrites: React app uses `** → /index.html` for SPA routing
- Hugo blog files are actual HTML files, so no rewrite needed for `/blog/*` routes
- Firebase hosting serves static files directly, React SPA handles other routes
- Build process: Hugo builds first, then React builds, both output to `dist/`

**Decision**: 
- Firebase hosting configuration remains `public: "dist"`
- Hugo builds to `dist/blog/` before React build
- React build outputs to `dist/` root
- Firebase rewrites: `** → /index.html` (for React SPA) - Hugo blog routes work directly as static files
- Build script: Run Hugo build, then React build sequentially

**Rationale**: This approach leverages Firebase Hosting's static file serving for Hugo blog and SPA routing for React app. Both coexist in the same `dist/` directory without conflicts. Hugo's static HTML files are served directly, React app handles all other routes.

**Alternatives considered**:
- Separate Firebase sites: More complex deployment, separate domains/subdomains needed
- Proxy configuration: Unnecessary complexity, Firebase hosting handles this natively
- Different hosting: Current Firebase setup works well for this integration

---

## Summary

All research tasks completed. Key decisions:
1. **Integration**: Hugo builds to `dist/blog/` subdirectory, served alongside React app from `dist/` root
2. **Theme**: Custom Hugo theme `neonic-blog` with templates and SCSS matching neonic design system
3. **Configuration**: Hugo configured for `/blog` base path, flat URL structure (`/blog/post-slug`), pagination (5 posts per page)
4. **Header/Footer**: Static HTML partials matching React component design, using neonic theme SCSS variables
5. **Deployment**: Firebase Hosting serves both Hugo blog (static HTML) and React app (SPA) from same `dist/` directory

No blocking unknowns remain. Ready to proceed to Phase 1 design.

