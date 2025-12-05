# Tasks: Hugo-Based Blog Integrated at /blog Route

**Feature**: Hugo-Based Blog Integrated at /blog Route  
**Branch**: `004-hugo-blog`  
**Created**: 2025-01-27  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Summary

This document contains the complete, dependency-ordered task breakdown for implementing a Hugo-based blog integrated at the `/blog` route. Tasks are organized by user story priority (P1 stories first, then P2), with setup and foundational tasks preceding user story implementation.

**Total Tasks**: 45  
**User Stories**: 5 (3 P1, 2 P2)  
**MVP Scope**: User Stories 1-3 (P1 stories) provide complete blog functionality with design consistency

## Implementation Strategy

**MVP First**: Implement User Stories 1-3 (P1) to deliver core blog functionality with design consistency. User Stories 4-5 (P2) add responsive design and navigation integration.

**Incremental Delivery**:
1. **Phase 1-2**: Setup and foundational infrastructure
2. **Phase 3**: Blog listing page (US1)
3. **Phase 4**: Individual post pages (US2)
4. **Phase 5**: Design consistency (US3)
5. **Phase 6**: Responsive design (US4)
6. **Phase 7**: Navigation integration (US5)
7. **Phase 8**: Polish and edge cases

## Dependencies

**User Story Completion Order**:
- US1 (Blog Discovery) → US2 (Post Reading) → US3 (Design Consistency) → US4 (Responsive) → US5 (Navigation)
- US1 and US2 can be partially parallel (templates can be created together)
- US3 depends on US1 and US2 (needs templates to style)
- US4 depends on US3 (responsive styles build on base styles)
- US5 can be parallel with US3 (header/footer are independent components)

**Parallel Execution Opportunities**:
- Theme directory structure creation (T005-T007) can be parallel
- Template creation (T012-T013) can be parallel after base template exists
- Header and footer partials (T030-T031) can be parallel
- Responsive breakpoints (T033-T034) can be parallel

## Task List

### Phase 1: Setup

**Goal**: Initialize Hugo blog project structure and verify Hugo installation

**Independent Test**: Run `hugo version` command succeeds, `blog/` directory structure exists with required subdirectories

- [X] T001 Verify Hugo installation and version compatibility
- [X] T002 Create blog directory structure at repository root (`blog/` directory)
- [X] T003 Initialize Hugo site in blog directory using `hugo new site . --force`
- [X] T004 Create content directory structure (`blog/content/posts/`)

---

### Phase 2: Foundational

**Goal**: Configure Hugo site settings and create theme structure foundation

**Independent Test**: Hugo config file exists with correct settings, theme directory structure exists, Hugo can build empty site to `dist/blog/`

- [X] T005 Create Hugo configuration file `blog/config.toml` with baseURL, publishDir, paginate, theme settings
- [X] T006 Create theme directory structure `blog/themes/neonic-blog/` with layouts, static, archetypes subdirectories
- [X] T007 Create theme subdirectories: `blog/themes/neonic-blog/layouts/_default/`, `blog/themes/neonic-blog/layouts/partials/`, `blog/themes/neonic-blog/static/css/`
- [X] T008 Verify Hugo build outputs to `dist/blog/` directory successfully

---

### Phase 3: User Story 1 - Blog Discovery and Navigation

**Goal**: Users can access blog listing page at `/blog` route displaying blog posts with title, excerpt, date, and read more links

**Independent Test**: Navigate to `/blog` route, verify blog listing page displays with list of blog posts, each post shows title, excerpt/preview, publication date, and link to read more

- [X] T009 [US1] Create base template `blog/themes/neonic-blog/layouts/_default/baseof.html` with HTML structure, head section, and main content block
- [X] T010 [US1] Create blog listing template `blog/themes/neonic-blog/layouts/_default/list.html` displaying posts with title, excerpt, date, and read more links
- [X] T011 [US1] Create sample blog post `blog/content/posts/welcome-post.md` with front matter (title, date, slug, excerpt) and markdown content
- [X] T012 [US1] Create additional sample blog posts (minimum 6 posts) to test pagination functionality
- [X] T013 [US1] Verify blog listing page displays correctly at `/blog` route with post previews

---

### Phase 4: User Story 2 - Blog Post Reading Experience

**Goal**: Users can read individual blog posts with proper formatting and readability

**Independent Test**: Click on blog post from listing page, verify individual post page displays full content with proper formatting (headings, paragraphs, lists, links, code blocks), text is readable with proper contrast and spacing

- [X] T014 [US2] Create single post template `blog/themes/neonic-blog/layouts/_default/single.html` displaying full post content with title, date, author (if provided), and content
- [X] T015 [US2] Update sample blog posts with markdown formatting examples (headings, paragraphs, lists, links, code blocks)
- [X] T016 [US2] Verify individual post pages display correctly at `/blog/{post-slug}` URLs
- [X] T017 [US2] Verify markdown formatting renders correctly (headings, paragraphs, lists, links, code blocks)

---

### Phase 5: User Story 3 - Design Consistency and Visual Integration

**Goal**: Blog design matches neonic theme with consistent colors, typography, spacing, and visual elements

**Independent Test**: Navigate between main website and blog section, verify blog uses same neonic theme (dark backgrounds, cyan/fuchsia accents), typography and spacing match main website, interactive elements use same styling

- [X] T018 [US3] Create theme stylesheet `blog/themes/neonic-blog/static/css/main.scss` importing neonic theme variables from `styles/_variables.scss`
- [X] T019 [US3] Implement blog container styles matching neonic theme (dark backgrounds, proper spacing, max-width)
- [X] T020 [US3] Style blog listing page elements (post previews, titles, dates, links) using neonic theme colors and typography
- [X] T021 [US3] Style blog post page elements (headings, paragraphs, lists, links, code blocks) using neonic theme colors and typography
- [X] T022 [US3] Implement hover effects and interactive element styling matching main website
- [X] T023 [US3] Verify design consistency between blog and main website (colors, typography, spacing, visual elements)

---

### Phase 6: User Story 4 - Responsive Blog Experience

**Goal**: Blog adapts appropriately to mobile devices, tablets, and desktop viewports

**Independent Test**: Access blog on mobile device (< 768px), verify layout adapts to single-column format, content is readable without horizontal scrolling, test tablet (768px-1023px) and desktop (≥ 1024px) layouts

- [X] T024 [US4] Implement mobile responsive styles for blog listing page (< 768px breakpoint)
- [X] T025 [US4] Implement mobile responsive styles for blog post pages (< 768px breakpoint)
- [X] T026 [US4] Implement tablet responsive styles (768px-1023px breakpoint) for blog listing and post pages
- [ ] T027 [US4] Verify responsive design works correctly on mobile, tablet, and desktop viewports
- [ ] T028 [US4] Verify no horizontal scrolling required on any device size, text remains legible

---

### Phase 7: User Story 5 - Blog Navigation and Integration

**Goal**: Blog integrates seamlessly with main website navigation (header and footer)

**Independent Test**: View blog pages, verify header matches main website navigation and allows return to other sections, footer matches main site footer design, links work correctly

- [X] T029 [US5] Review React Navbar component structure and styling from `src/components/Navbar.tsx` and `src/components/Navbar.module.scss`
- [X] T030 [US5] Create static HTML header partial `blog/themes/neonic-blog/layouts/partials/header.html` matching React Navbar design and functionality
- [X] T031 [US5] Review React Footer component structure and styling from `src/components/Footer.tsx` and `src/components/Footer.module.scss`
- [X] T032 [US5] Create static HTML footer partial `blog/themes/neonic-blog/layouts/partials/footer.html` matching React Footer design with all columns (About Us, Projects, Solutions, Blog, Terms)
- [X] T033 [US5] Update base template to include header and footer partials
- [X] T034 [US5] Style header and footer partials using neonic theme SCSS variables to match React components
- [X] T035 [US5] Verify header and footer display correctly on all blog pages and match main website design
- [X] T036 [US5] Verify navigation links work correctly (header links to main site sections, footer links functional)

---

### Phase 8: Polish & Cross-Cutting Concerns

**Goal**: Complete integration, build scripts, pagination, edge cases, and final validation

**Independent Test**: Build process works end-to-end, pagination displays correctly when > 5 posts, empty state displays when no posts, all edge cases handled appropriately

- [ ] T037 Implement pagination controls in blog listing template (page numbers or Next/Previous buttons) when total posts > 5
- [ ] T038 Implement empty state message in blog listing template when no posts exist
- [X] T039 Update `package.json` build scripts to include Hugo build (`build:blog` script, integrate into main `build` script)
- [X] T040 Verify Hugo build outputs correctly to `dist/blog/` before React build runs
- [X] T041 Verify Firebase hosting configuration serves both Hugo blog and React app correctly
- [ ] T042 Test blog accessibility (WCAG AA contrast ratios, semantic HTML, keyboard navigation)
- [ ] T043 Verify blog post URLs follow flat structure `/blog/post-slug` format
- [ ] T044 Test edge cases: very long posts, special characters in content, code snippets, images in posts
- [ ] T045 Final validation: verify all success criteria met (SC-001 through SC-009)

---

## Parallel Execution Examples

### Example 1: Theme Structure Creation (Phase 2)
Tasks T005, T006, T007 can be executed in parallel as they create different parts of the theme structure:
- T005: Config file (independent)
- T006: Theme directory (independent)
- T007: Theme subdirectories (depends on T006, but can be parallel with T005)

### Example 2: Template Creation (Phase 3-4)
After base template (T009) exists:
- T010 (list template) and T014 (single template) can be created in parallel
- Both depend on T009 but are independent of each other

### Example 3: Header/Footer Partials (Phase 7)
- T030 (header partial) and T032 (footer partial) can be created in parallel
- Both are independent components

### Example 4: Responsive Breakpoints (Phase 6)
- T024 (mobile listing) and T025 (mobile posts) can be parallel
- T026 (tablet styles) can be parallel with mobile styles

---

## Notes

- Hugo builds to `dist/blog/` subdirectory, React app builds to `dist/` root
- Blog uses flat URL structure: `/blog/post-slug`
- Pagination displays 5 posts per page
- Design must match neonic theme exactly (colors, typography, spacing)
- Header and footer are static HTML versions matching React components
- All content is stored as Markdown files in `blog/content/posts/`
- No tests required (manual testing and verification per spec requirements)

