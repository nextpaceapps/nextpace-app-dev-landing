# Implementation Plan: Sticky Navigation Bar with Rounded Corners

**Branch**: `002-sticky-navbar` | **Date**: 2025-12-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-sticky-navbar/spec.md`

## Summary

Modify the navigation bar component to remain fixed at the top of the viewport at all times (removing the current hide-on-scroll behavior), add rounded corners for visual polish, and ensure all visual changes occur with smooth transitions. This is a frontend-only UI enhancement that improves navigation accessibility and visual appeal.

## Technical Context

**Language/Version**: TypeScript 5.8.2, React 19.2.0  
**Primary Dependencies**: React, framer-motion (for animations), SCSS (for styling), Vite (build tool)  
**Storage**: N/A (UI-only feature)  
**Testing**: Manual visual testing, browser DevTools  
**Target Platform**: Web browsers (modern browsers with CSS3 support)  
**Project Type**: Web application (React SPA)  
**Performance Goals**: Smooth 60fps animations, transitions complete within 300ms  
**Constraints**: Must maintain existing functionality, preserve responsive design, no content overlap  
**Scale/Scope**: Single component modification affecting global navigation UX

### Architecture
- **Component**: `src/components/Navbar.tsx`
- **Styles**: `src/components/Navbar.module.scss`
- **Current Behavior**: Navigation bar hides when scrolling down (using framer-motion `y: "-100%"` animation)
- **Target Behavior**: Navigation bar remains fixed and visible at all scroll positions with rounded corners

### Dependencies
- **Internal**: 
  - `framer-motion` (currently used for scroll-based hide/show, will be repurposed for smooth transitions)
  - `lucide-react` (icons - no changes)
  - SCSS modules (styling system)
- **External**: None
- **Environment**: Browser-only feature

### Existing Code Analysis
- **File**: `src/components/Navbar.tsx`
- **Current Behavior**: 
  - Uses `useScroll` and `useMotionValueEvent` to detect scroll direction
  - Hides navbar when scrolling down past 150px (`setHidden(true)`)
  - Animates navbar out of view using `y: "-100%"` variant
- **File**: `src/components/Navbar.module.scss`
- **Current Styles**:
  - `position: fixed` already set (good foundation)
  - No border-radius on `.nav` element
  - Transitions exist on child elements but not on main container
- **Changes Required**:
  - Remove scroll-based hide logic from `Navbar.tsx`
  - Remove `hidden` state and related animation variants
  - Add `border-radius` to `.nav` in SCSS (bottom corners or all corners)
  - Add smooth transition properties to `.nav` for any visual state changes
  - Ensure z-index and positioning maintain proper layering

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Code Quality
- ✅ Single responsibility: Component handles navigation display only
- ✅ No unnecessary complexity: Simple CSS and state management changes
- ✅ Maintains existing API: Component props unchanged

### Performance
- ✅ No performance impact: Removing scroll listeners may improve performance
- ✅ Smooth animations: Using existing framer-motion infrastructure

### Accessibility
- ✅ Navigation remains accessible: Fixed positioning improves accessibility
- ✅ No content obstruction: Must verify spacing for content below navbar

**Status**: ✅ PASS - No violations

## Project Structure

### Documentation (this feature)

```text
specs/002-sticky-navbar/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── contracts/           # Phase 1 output (/speckit.plan command) - N/A for UI-only feature
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Navbar.tsx           # MODIFY: Remove hide-on-scroll logic
│   └── Navbar.module.scss   # MODIFY: Add border-radius and transitions
├── pages/                   # NO CHANGES
└── App.tsx                  # NO CHANGES (navbar usage unchanged)
```

**Structure Decision**: Single React component modification. No new files needed, only updates to existing Navbar component and styles.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - feature is straightforward UI enhancement.

## Phase 0: Research & Decisions

See [research.md](./research.md) for detailed research findings.

**Key Decisions**:
1. **Remove scroll-based hide logic**: Eliminate `useScroll`, `useMotionValueEvent`, and `hidden` state
2. **Apply rounded corners to bottom edges**: Use `border-radius` on bottom-left and bottom-right (0.75rem - 1rem range)
3. **Use CSS transitions for smoothness**: Leverage existing SCSS transition system (300ms duration, ease-in-out)
4. **Maintain framer-motion for future enhancements**: Keep import but remove current scroll-based usage

## Phase 1: Design & Contracts

### Data Model

This is a UI-only feature with no data model changes. Component state is simplified:

**Before**:
```typescript
const [hidden, setHidden] = useState(false);
const { scrollY } = useScroll();
// Scroll detection logic
```

**After**:
```typescript
// No state needed - navbar always visible
// Remove useScroll and useMotionValueEvent hooks
```

### Component Props

No changes to component interface:
```typescript
interface SharedProps {
  onOpenContact: () => void;
}
```

### Style Model

**CSS Changes**:
- Add `border-radius` property to `.nav` class
- Add `transition` property for smooth visual changes
- Ensure proper z-index and positioning

See [data-model.md](./data-model.md) for detailed styling specifications.

### Contracts

N/A - This is a UI-only feature with no API contracts.

## Phase 2: Implementation Steps

### Step 1: Remove Scroll-Based Hide Logic
- Remove `useState` for `hidden` state
- Remove `useScroll` hook import and usage
- Remove `useMotionValueEvent` hook import and usage
- Remove animation variants (`visible`/`hidden`)
- Simplify `motion.nav` to always render visible state

### Step 2: Update SCSS Styles
- Add `border-radius: 0 0 0.75rem 0.75rem` to `.nav` (rounded bottom corners)
- Add `transition: all 0.3s ease-in-out` to `.nav` for smooth transitions
- Verify `position: fixed` and `z-index: 40` remain correct
- Test that backdrop-filter and background remain functional

### Step 3: Verify Functionality
- Test navigation links work correctly
- Test "Start Project" button functionality
- Verify navbar doesn't obstruct page content
- Test on mobile viewports
- Verify smooth transitions during any visual changes

### Step 4: Cleanup
- Remove unused framer-motion imports if no longer needed (or keep for future use)
- Verify no console errors
- Test scroll behavior - navbar should remain visible at all times
