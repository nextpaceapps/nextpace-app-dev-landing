# Research: Sticky Navigation Bar with Rounded Corners

**Feature**: 002-sticky-navbar  
**Date**: 2025-12-01  
**Purpose**: Resolve technical decisions for implementing sticky navbar with rounded corners and smooth transitions

## Research Questions

### Q1: How to remove scroll-based hide behavior while maintaining smooth transitions?

**Decision**: Remove all scroll detection logic and animation variants, keep CSS transitions for visual polish.

**Rationale**: 
- Current implementation uses framer-motion's `useScroll` and `useMotionValueEvent` to detect scroll direction
- The requirement explicitly states navbar should NOT disappear, so all hide/show logic should be removed
- CSS transitions are sufficient for smooth visual changes (border-radius, background opacity changes if any)
- Removing JavaScript scroll listeners improves performance

**Alternatives Considered**:
- Keep scroll detection but always show navbar: Rejected - unnecessary complexity
- Use CSS-only solution: Accepted - simpler and more performant

**Implementation**:
- Remove `const [hidden, setHidden] = useState(false)`
- Remove `const { scrollY } = useScroll()`
- Remove `useMotionValueEvent(scrollY, "change", ...)` handler
- Remove animation variants `visible: { y: 0 }` and `hidden: { y: "-100%" }`
- Simplify `motion.nav` to always render in visible state
- Use CSS `transition` property for any visual changes

---

### Q2: What border-radius value should be used for rounded corners?

**Decision**: Use `border-radius: 0 0 0.75rem 0.75rem` (rounded bottom corners only, 12px radius).

**Rationale**:
- Navigation bar is fixed at top, so rounding bottom corners creates a "floating" effect
- 0.75rem (12px) provides noticeable rounding without being excessive
- Matches modern design patterns (similar to cards, modals)
- Consistent with existing design system (other elements use similar radius values)
- Top corners remain square to align with viewport edge

**Alternatives Considered**:
- Round all corners (`border-radius: 0.75rem`): Rejected - top corners should align with viewport
- Smaller radius (0.5rem / 8px): Rejected - less visually apparent
- Larger radius (1rem / 16px): Rejected - may look too rounded for a navbar
- Round only bottom-left (`border-radius: 0 0 0 0.75rem`): Rejected - asymmetric, less polished

**Implementation**:
```scss
.nav {
  border-radius: 0 0 0.75rem 0.75rem; // Top-left, top-right, bottom-right, bottom-left
}
```

---

### Q3: How to ensure smooth transitions for all visual changes?

**Decision**: Add CSS `transition` property to `.nav` element with `all 0.3s ease-in-out`.

**Rationale**:
- CSS transitions are hardware-accelerated and performant
- `all` property covers border-radius, background, opacity, transform changes
- 0.3s (300ms) duration meets success criteria (<300ms) and feels smooth
- `ease-in-out` timing function provides natural acceleration/deceleration
- Consistent with existing transition patterns in the codebase (other elements use 0.3s)

**Alternatives Considered**:
- Specific properties only (`transition: border-radius 0.3s`): Rejected - may miss other visual changes
- Longer duration (0.5s): Rejected - exceeds success criteria and feels slow
- Shorter duration (0.2s): Rejected - may feel abrupt
- JavaScript-based transitions: Rejected - CSS is more performant and simpler

**Implementation**:
```scss
.nav {
  transition: all 0.3s ease-in-out;
}
```

---

### Q4: Should framer-motion be completely removed or kept for future use?

**Decision**: Keep framer-motion import but remove current scroll-based usage. Simplify component to use standard `nav` element or keep `motion.nav` without animation variants.

**Rationale**:
- Framer-motion may be useful for future enhancements (hover effects, menu animations)
- Removing it entirely requires changing import and component structure
- Can simplify to `motion.nav` without variants (always visible)
- Or change to standard `nav` element if no animation needed
- Keeping import has minimal bundle size impact if already in use elsewhere

**Alternatives Considered**:
- Remove framer-motion entirely: Rejected - may need for future features, minimal benefit
- Keep with simplified usage: Accepted - maintains flexibility
- Change to standard HTML `nav`: Acceptable alternative if no animations needed

**Implementation**:
- Option A: Keep `motion.nav` without variants (simpler, maintains import)
- Option B: Change to standard `nav` element (cleaner, removes dependency on framer-motion for this component)

**Recommendation**: Option A - Keep `motion.nav` for consistency and future flexibility.

---

### Q5: How to ensure navbar doesn't obstruct page content?

**Decision**: Verify existing `position: fixed` and `z-index: 40` are correct. Ensure page sections have appropriate top padding/margin.

**Rationale**:
- Navbar already uses `position: fixed` which is correct
- `z-index: 40` should be sufficient for layering
- Page content should have top padding equal to navbar height (4rem / 64px) to prevent overlap
- This is likely already handled in existing layout

**Alternatives Considered**:
- Increase z-index: Not needed unless conflicts arise
- Add padding-top to body: May already exist, verify in implementation

**Implementation**:
- Verify `position: fixed` and `z-index: 40` in `.nav`
- Check that first page section (Hero) has appropriate top spacing
- Test on mobile viewports to ensure no overlap

---

## Summary of Decisions

| Decision | Value | Rationale |
|----------|-------|-----------|
| Remove scroll hide logic | Yes | Requirement explicitly states navbar must stay visible |
| Border-radius | `0 0 0.75rem 0.75rem` | Rounded bottom corners, 12px radius |
| Transition duration | `0.3s` | Meets <300ms criteria, smooth feel |
| Transition timing | `ease-in-out` | Natural acceleration/deceleration |
| Keep framer-motion | Yes | Maintain flexibility, minimal impact |
| Content spacing | Verify existing | Ensure no overlap with fixed navbar |

## Implementation Notes

- All changes are CSS and component logic modifications
- No new dependencies required
- No API changes needed
- Backward compatible (improves UX without breaking changes)
- Performance improvement (removes scroll listeners)

