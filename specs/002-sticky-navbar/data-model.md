# Data Model: Sticky Navigation Bar

**Feature**: 002-sticky-navbar  
**Date**: 2025-12-01

## Overview

This is a UI-only feature with no data model changes. This document describes the component state simplification and styling model.

## Component State Model

### Before (Current State)

```typescript
// Navbar.tsx - Current implementation
const [hidden, setHidden] = useState(false);
const { scrollY } = useScroll();

useMotionValueEvent(scrollY, "change", (latest) => {
  const previous = scrollY.getPrevious() ?? 0;
  if (latest > previous && latest > 150) {
    setHidden(true);
  } else {
    setHidden(false);
  }
});
```

**State Properties**:
- `hidden: boolean` - Controls visibility animation
- `scrollY: MotionValue<number>` - Tracks scroll position

### After (Target State)

```typescript
// Navbar.tsx - Simplified implementation
// No state needed - navbar always visible
// No scroll detection hooks
```

**State Properties**: None (stateless component for visibility)

## Component Props Model

No changes to component interface:

```typescript
interface SharedProps {
  onOpenContact: () => void;
}

// Usage remains the same:
<Navbar onOpenContact={handleOpenContact} />
```

## Style Model

### CSS Class: `.nav`

**Current Styles**:
```scss
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 40;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid $border-default;
  // No border-radius
  // No transition property
}
```

**Target Styles**:
```scss
.nav {
  position: fixed;           // ✅ Keep - required for sticky behavior
  top: 0;                     // ✅ Keep - anchors to top
  width: 100%;                 // ✅ Keep - full width
  z-index: 40;                // ✅ Keep - proper layering
  background: rgba(0, 0, 0, 0.5);  // ✅ Keep - existing background
  backdrop-filter: blur(12px);      // ✅ Keep - glass effect
  border-bottom: 1px solid $border-default;  // ✅ Keep - existing border
  
  // NEW: Rounded bottom corners
  border-radius: 0 0 0.75rem 0.75rem;
  
  // NEW: Smooth transitions
  transition: all 0.3s ease-in-out;
}
```

**Style Properties**:
- `border-radius`: `0 0 0.75rem 0.75rem` (top-left: 0, top-right: 0, bottom-right: 12px, bottom-left: 12px)
- `transition`: `all 0.3s ease-in-out` (property: all, duration: 300ms, timing: ease-in-out)

### Animation Model

**Before (Current)**:
```typescript
// framer-motion variants
variants={{
  visible: { y: 0 },
  hidden: { y: "-100%" },
}}
animate={hidden ? "hidden" : "visible"}
transition={{ duration: 0.35, ease: "easeInOut" }}
```

**After (Target)**:
```typescript
// No animation variants needed
// Component always renders in visible state
// CSS handles any visual transitions
```

**Animation Properties**:
- Type: CSS transitions (not JavaScript animations)
- Duration: 300ms (0.3s)
- Timing Function: ease-in-out
- Properties: All CSS properties (border-radius, background, opacity, etc.)

## Layout Model

### Positioning

```
┌─────────────────────────────────────┐
│  Viewport Top (0px)                 │
├─────────────────────────────────────┤
│  Navbar (fixed, z-index: 40)       │ ← Always visible
│  Height: 4rem (64px)               │
│  Border-radius: bottom corners only │
├─────────────────────────────────────┤
│  Page Content (starts below navbar) │
│  (should have top padding/margin)    │
└─────────────────────────────────────┘
```

### Responsive Behavior

- **Desktop**: Full navbar with links visible
- **Mobile (< 768px)**: Navbar remains fixed, links hidden (existing responsive behavior)
- **All viewports**: Navbar stays fixed at top with rounded corners

## Validation Rules

### Style Validation

1. **Border-radius**: Must be `0 0 0.75rem 0.75rem` (rounded bottom corners only)
2. **Transition**: Must include `all 0.3s ease-in-out`
3. **Position**: Must remain `fixed` with `top: 0`
4. **Z-index**: Must remain `40` or higher to stay above content

### Behavior Validation

1. **Visibility**: Navbar must be visible at all scroll positions
2. **No hiding**: Navbar must never disappear when scrolling down
3. **Smooth transitions**: All visual changes must complete within 300ms
4. **Content access**: Navigation links and "Start Project" button must always be accessible

## Edge Cases

### Rapid Scrolling
- **Requirement**: Navbar remains stable and visible
- **Implementation**: No scroll listeners = no performance impact from rapid scrolling

### Mobile Viewports
- **Requirement**: Navbar remains accessible and appropriately sized
- **Implementation**: Existing responsive styles handle this, rounded corners apply to all viewports

### Page Load
- **Requirement**: Navbar visible immediately with new styling
- **Implementation**: CSS loads with page, no JavaScript delay

### Scroll Direction Changes
- **Requirement**: Navbar remains stable without flickering
- **Implementation**: No state changes = no flickering possible

## Dependencies

### Style Dependencies
- `styles/_variables.scss` - Uses `$border-default` variable
- SCSS module system - For scoped styling

### Component Dependencies
- `framer-motion` - May keep import but remove scroll-based usage
- `lucide-react` - No changes (icons)
- React - No changes

## Migration Notes

### Breaking Changes
None - this is a UX improvement that maintains all existing functionality.

### Backward Compatibility
✅ Fully backward compatible - improves UX without breaking changes.

### Rollback Plan
If issues arise, revert to previous version:
1. Restore `hidden` state and scroll detection logic
2. Remove `border-radius` and `transition` from `.nav`
3. Restore animation variants

