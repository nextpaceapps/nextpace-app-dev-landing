# Implementation Tasks: Sticky Navigation Bar with Rounded Corners

**Feature**: 002-sticky-navbar  
**Branch**: `002-sticky-navbar`  
**Created**: 2025-12-01  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Summary

This feature modifies the navigation bar to remain fixed at the top with rounded corners and smooth transitions. Tasks are organized by user story to enable independent implementation and testing.

**Total Tasks**: 8  
**MVP Scope**: User Story 1 (T001-T003) - Core sticky navbar functionality  
**Estimated Time**: 15-30 minutes total

## Dependencies

### User Story Completion Order

```
US1 (P1) → US2 (P2) → US3 (P2)
```

- **US1** (Persistent Navigation): Foundation - removes hide behavior, must complete first
- **US2** (Rounded Corners): Visual enhancement - depends on US1 (navbar must be visible)
- **US3** (Smooth Transitions): Visual polish - depends on US1 (navbar must be visible)

**Note**: US2 and US3 can be implemented in parallel after US1 is complete.

## Implementation Strategy

### MVP First Approach
- **Phase 1**: Implement US1 only (T001-T003) - Core functionality
- **Phase 2**: Add US2 and US3 (T004-T008) - Visual enhancements

### Incremental Delivery
1. **Increment 1**: Remove scroll hide logic (US1) - Delivers core value
2. **Increment 2**: Add rounded corners (US2) - Visual polish
3. **Increment 3**: Add smooth transitions (US3) - Final polish

## Phase 1: Setup

*No setup tasks required - modifying existing component*

## Phase 2: Foundational Tasks

*No foundational tasks required - feature modifies existing component*

## Phase 3: User Story 1 - Persistent Navigation Access (Priority: P1)

**Goal**: Remove scroll-based hide behavior so navigation bar remains visible at all times.

**Independent Test**: Scroll down the page past the initial viewport. Verify the navigation bar remains fixed at the top of the screen and is always visible regardless of scroll position.

**Acceptance Criteria**:
- Navigation bar remains fixed at top when scrolling down
- Navigation bar does NOT disappear at any scroll position
- Navigation links remain accessible
- "Start Project" button remains accessible

### Tasks

- [x] T001 [US1] Remove `useState` hook for `hidden` state from `src/components/Navbar.tsx`
- [x] T002 [US1] Remove `useScroll` and `useMotionValueEvent` imports and usage from `src/components/Navbar.tsx`
- [x] T003 [US1] Remove animation variants (`visible`/`hidden`) and simplify `motion.nav` element in `src/components/Navbar.tsx`

**Parallel Opportunities**: None - sequential dependency (T001 → T002 → T003)

**Files Modified**: `src/components/Navbar.tsx`

---

## Phase 4: User Story 2 - Visual Polish with Rounded Corners (Priority: P2)

**Goal**: Add rounded corners to navigation bar for modern, polished appearance.

**Independent Test**: View the navigation bar at the top of the page. Verify it displays with rounded corners on the bottom edges (12px radius).

**Acceptance Criteria**:
- Rounded corners visible on bottom edges of navigation bar
- Border-radius value is `0 0 0.75rem 0.75rem` (12px bottom corners)
- Corners are consistent across all browsers and viewports

### Tasks

- [x] T004 [P] [US2] Add `border-radius: 0 0 0.75rem 0.75rem` property to `.nav` class in `src/components/Navbar.module.scss`

**Parallel Opportunities**: T004 can be done in parallel with T005-T008 (different file)

**Files Modified**: `src/components/Navbar.module.scss`

---

## Phase 5: User Story 3 - Smooth Transition Effects (Priority: P2)

**Goal**: Ensure all visual changes to navigation bar occur with smooth transitions.

**Independent Test**: Scroll the page and observe any visual changes to the navigation bar. Verify all changes animate smoothly without abrupt jumps or flickering, completing within 300ms.

**Acceptance Criteria**:
- All visual changes transition smoothly
- Transitions complete within 300 milliseconds
- No stuttering or flickering during transitions
- Transition timing function is `ease-in-out`

### Tasks

- [x] T005 [P] [US3] Add `transition: all 0.3s ease-in-out` property to `.nav` class in `src/components/Navbar.module.scss`

**Parallel Opportunities**: T005 can be done in parallel with T004 (same file, different properties)

**Files Modified**: `src/components/Navbar.module.scss`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Verify functionality, test edge cases, and ensure no regressions.

### Verification Tasks

- [x] T006 Verify navigation links work correctly after changes in `src/components/Navbar.tsx`
- [x] T007 Verify "Start Project" button functionality works correctly in `src/components/Navbar.tsx`
- [x] T008 Test responsive behavior on mobile viewports (< 768px) and verify navbar remains accessible

**Parallel Opportunities**: T006, T007, and T008 can be done in parallel (different test scenarios)

**Files Verified**: `src/components/Navbar.tsx`, `src/components/Navbar.module.scss`, browser viewport testing

---

## Parallel Execution Examples

### After US1 Complete (T001-T003 done)

**Parallel Group 1**: Visual enhancements
- T004 [US2] + T005 [US3] - Can be done together (same file, different CSS properties)

### After All Implementation Tasks Complete

**Parallel Group 2**: Verification
- T006 + T007 + T008 - All verification tasks can run simultaneously

## Task Summary

| Phase | User Story | Task Count | Tasks |
|-------|------------|------------|-------|
| Phase 3 | US1 (P1) | 3 | T001-T003 |
| Phase 4 | US2 (P2) | 1 | T004 |
| Phase 5 | US3 (P2) | 1 | T005 |
| Phase 6 | Polish | 3 | T006-T008 |
| **Total** | | **8** | T001-T008 |

## Independent Test Criteria

### US1 - Persistent Navigation
- ✅ Scroll down page → Navbar remains visible at top
- ✅ Click navigation links → Links work correctly
- ✅ Click "Start Project" → Modal opens correctly

### US2 - Rounded Corners
- ✅ View navbar → Bottom corners are rounded (12px radius)
- ✅ Test on different browsers → Corners render consistently

### US3 - Smooth Transitions
- ✅ Observe navbar visual changes → Transitions complete smoothly (< 300ms)
- ✅ Test rapid interactions → No stuttering or flickering

## MVP Scope Recommendation

**Minimum Viable Product**: User Story 1 only (T001-T003)

**Rationale**: 
- US1 delivers core value (persistent navigation access)
- US2 and US3 are visual enhancements that can be added incrementally
- MVP can be tested and deployed independently

**MVP Tasks**: T001, T002, T003  
**MVP Time Estimate**: 10-15 minutes  
**MVP Test**: Scroll down page, verify navbar stays visible

## Notes

- All tasks modify existing files - no new files created
- Component props interface remains unchanged
- No breaking changes - fully backward compatible
- No API or backend changes required
- Manual visual testing recommended (no unit tests specified)

