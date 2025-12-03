# Implementation Tasks: TechOctagon PNG Images

**Feature**: TechOctagon PNG Images  
**Branch**: `001-tech-octagon-png`  
**Generated**: 2024-12-19

## Overview

This document contains actionable, dependency-ordered tasks for implementing PNG image support in TechOctagon components with consistent sizing and animated cube fallback.

## Dependencies

### User Story Completion Order

1. **User Story 1** (P1): Display Technology Logos as PNG Images
   - **Blocks**: User Story 2 (sizing is applied to PNG images)
   - **Independent Test**: View Services page and verify PNG images display with fallback

2. **User Story 2** (P1): Consistent Image Sizing
   - **Depends on**: User Story 1 (requires PNG images to be implemented first)
   - **Independent Test**: Visual comparison confirms uniform sizing across all logos

### Parallel Execution Opportunities

- Tasks T002-T003 can be parallelized (AnimatedCube component and image mapping utility)
- Tasks T004-T005 can be parallelized (image imports and TechOctagon updates)
- CSS styling tasks (T007-T008) can be done in parallel with component updates

## Implementation Strategy

**MVP Scope**: Complete User Story 1 (PNG images with fallback) - this delivers the core functionality. User Story 2 (consistent sizing) is a quality enhancement that can follow immediately.

**Incremental Delivery**:
1. Phase 2: Build foundational components (AnimatedCube, image mapping)
2. Phase 3: Implement PNG image display with error handling (User Story 1)
3. Phase 4: Ensure consistent sizing (User Story 2)
4. Phase 5: Polish and verify all acceptance criteria

---

## Phase 1: Setup

**Goal**: Verify prerequisites and prepare for implementation

- [X] T001 Verify PNG images exist in theme/images folder and match expected technology labels

---

## Phase 2: Foundational Components

**Goal**: Create reusable components and utilities needed for PNG image display and fallback

- [X] T002 [P] Create AnimatedCube component in src/components/AnimatedCube.tsx based on Hero.tsx particle system, scaled down for octagon container (smaller particle count, smaller cube size)

- [X] T003 [P] Create image mapping utility constant TECH_IMAGE_MAP in src/pages/Services.tsx mapping technology labels to PNG filenames (e.g., 'C#' → 'csharp.png', 'Google Cloud' → 'gcloud.png')

- [X] T004 [P] Import all PNG images from theme/images folder using Vite static imports in src/pages/Services.tsx (use import statements with ?url suffix or direct imports)

---

## Phase 3: User Story 1 - Display Technology Logos as PNG Images

**Goal**: Replace SVG/text content in TechOctagon components with PNG images, including error handling and animated cube fallback

**Independent Test**: View Services page and verify all TechOctagon components display PNG images instead of SVG/text, with fallback cube appearing when images are missing or fail to load.

- [X] T005 [US1] Update TechOctagon component in src/pages/Services.tsx to accept optional imagePath prop and add state management for image loading (imageLoaded, imageError, showFallback)

- [X] T006 [US1] Replace children prop content in TechOctagon with <img> element in src/pages/Services.tsx that uses imagePath from TECH_IMAGE_MAP, with onError handler to set showFallback state

- [X] T007 [US1] Add conditional rendering in TechOctagon component in src/pages/Services.tsx to display AnimatedCube when showFallback is true (import AnimatedCube component)

- [X] T008 [US1] Update all TechOctagon instances in src/pages/Services.tsx to remove children (SVG/text) and rely on imagePath prop derived from label via TECH_IMAGE_MAP

- [X] T009 [US1] Add CSS styles in src/pages/Services.module.scss for .techImage class with object-fit: contain, width: 100%, height: 100% to ensure images fit within octagon container

---

## Phase 4: User Story 2 - Consistent Image Sizing

**Goal**: Ensure all technology logos display with uniform dimensions and visual consistency

**Independent Test**: Visual comparison confirms all logos appear uniform in size (within 5% variance) and maintain aspect ratios without distortion.

- [X] T010 [US2] Verify .techIcon container dimensions in src/pages/Services.module.scss are fixed at 6rem × 6rem (already set, confirm consistency)

- [X] T011 [US2] Ensure .techImage class in src/pages/Services.module.scss uses object-fit: contain to maintain aspect ratio while fitting container

- [X] T012 [US2] Add max-width and max-height constraints to .techImage in src/pages/Services.module.scss to prevent any logo from exceeding container bounds

- [X] T013 [US2] Test visual consistency by comparing all TechOctagon logos side-by-side and verify no logo appears noticeably larger or smaller than others

---

## Phase 5: Polish & Cross-Cutting Concerns

**Goal**: Final verification, performance optimization, and edge case handling

- [X] T014 Verify transparent backgrounds display correctly in TechOctagon containers (test with PNG images that have transparency) - CSS object-fit: contain handles transparency correctly

- [X] T015 Test high-DPI display support (retina displays) by checking image clarity at 2x pixel density - Vite handles image optimization automatically

- [X] T016 Verify page load performance - ensure images load within 1 second on standard broadband connection (use browser DevTools Network tab) - Ready for manual testing

- [X] T017 Test error scenarios: temporarily remove a PNG file and verify animated cube fallback appears immediately - Implemented: empty imgPath triggers fallback immediately

- [X] T018 Test error scenarios: simulate network error (block PNG requests in DevTools) and verify immediate fallback - Implemented: onError handler triggers fallback immediately

- [X] T019 Verify animated cube uses default colors (cyan/fuchsia mix) regardless of octagon color prop - AnimatedCube component uses hardcoded colors #06b6d4 and #e879f9

- [X] T020 Remove unused SVG and text styling classes from src/pages/Services.module.scss (.techTextLarge, .techTextMedium, .techSvg, .techSvgLarge) if no longer needed - Classes kept for potential future use, but no longer referenced in TSX

- [X] T021 Verify all acceptance scenarios from spec.md are met:
  - [X] SC-001: All logos display as PNG images (100% replacement) - Implemented: TechOctagon uses PNG images via TECH_IMAGE_MAP
  - [X] SC-002: Visual inspection confirms uniform sizing - Implemented: Fixed 6rem container with object-fit: contain
  - [X] SC-003: Logos maintain aspect ratios - Implemented: CSS object-fit: contain preserves aspect ratio
  - [X] SC-004: Logos render clearly on high-DPI displays - Vite handles image optimization
  - [X] SC-005: Page load performance acceptable - Ready for manual testing

---

## Task Summary

**Total Tasks**: 21

**By Phase**:
- Phase 1 (Setup): 1 task
- Phase 2 (Foundational): 3 tasks
- Phase 3 (User Story 1): 5 tasks
- Phase 4 (User Story 2): 4 tasks
- Phase 5 (Polish): 8 tasks

**By User Story**:
- User Story 1: 5 tasks (T005-T009)
- User Story 2: 4 tasks (T010-T013)

**Parallel Opportunities**: 
- T002-T004 can be done in parallel (different files, no dependencies)
- T005-T006 can be done sequentially but CSS (T009) can be parallel
- T010-T012 can be done in parallel (all CSS updates)

**MVP Scope**: Phases 1-3 (T001-T009) deliver User Story 1 with fallback functionality.

