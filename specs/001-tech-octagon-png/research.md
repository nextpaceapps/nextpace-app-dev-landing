# Research & Decisions: TechOctagon PNG Images

## Overview

This document consolidates research findings and technical decisions for implementing PNG image support in TechOctagon components.

## Research Tasks

### Image Loading in React/Vite

**Decision**: Use Vite's static asset imports for PNG images  
**Rationale**: 
- Vite handles static assets efficiently, providing optimized paths and cache-busting
- TypeScript support for image imports via `?url` suffix or direct import
- No additional dependencies required
- Supports both development and production builds

**Alternatives considered**:
- Public folder with direct paths: Less type-safe, harder to detect missing files at build time
- External CDN: Unnecessary complexity for local assets
- Base64 encoding: Increases bundle size, not suitable for multiple images

### Image Sizing and Consistency

**Decision**: Use CSS `object-fit: contain` with fixed container dimensions  
**Rationale**:
- Maintains aspect ratio automatically (FR-004)
- Ensures consistent visual size across all logos (FR-003, FR-006)
- Works with transparent backgrounds (FR-005)
- Supports high-DPI displays via `srcset` or 2x resolution images (FR-007)

**Alternatives considered**:
- Fixed width/height with `object-fit: cover`: May crop logos
- CSS transforms: More complex, harder to maintain consistency
- Canvas-based rendering: Overkill for static images

### Animated Cube Fallback Implementation

**Decision**: Extract and adapt the hero section's animated cube logic into a reusable component  
**Rationale**:
- Reuses existing, proven animation code
- Maintains visual consistency with hero section
- Uses default colors (cyan/fuchsia mix) as specified in clarifications
- Canvas-based animation performs well at small scale

**Implementation approach**:
- Create `AnimatedCube` component based on Hero.tsx particle system
- Scale down particle count and cube size for octagon container
- Use same color scheme (random cyan/fuchsia particles)
- Maintain rotation animation loop

**Alternatives considered**:
- Static placeholder icon: Less visually appealing, doesn't match site aesthetic
- SVG fallback: Doesn't match hero section's animated style
- External animation library: Unnecessary dependency

### Error Handling Strategy

**Decision**: Use React `onError` handler on `<img>` elements to detect loading failures  
**Rationale**:
- Native browser API, no dependencies
- Immediately triggers on network errors or corrupted files
- Simple state management (boolean flag)
- Works for both missing files and loading failures

**Alternatives considered**:
- Pre-checking file existence: Not possible in browser environment
- Retry logic: Unnecessary complexity, immediate fallback preferred per clarifications
- Loading state with timeout: Adds delay, not required per spec

### Image Naming Convention

**Decision**: Map technology labels to lowercase filenames with hyphens (e.g., "Google Cloud" → "gcloud.png")  
**Rationale**:
- Existing images follow this pattern (gcloud.png, nodejs.png, etc.)
- Simple string transformation: `label.toLowerCase().replace(/\s+/g, '')` or manual mapping
- Type-safe with TypeScript const object

**Implementation**:
```typescript
const imageMap: Record<string, string> = {
  'C#': 'csharp.png',  // or 'c-sharp.png' depending on actual filename
  '.NET': 'dotnet.png',
  'Google Cloud': 'gcloud.png',
  'Firebase': 'firebase.png',
  'AWS': 'aws.png',
  // ... etc
};
```

## Technical Constraints

- **Image format**: PNG only (as specified)
- **File location**: `theme/images/` folder (as specified)
- **Container size**: Existing `.techIcon` dimensions (6rem × 6rem from Services.module.scss)
- **Performance**: Images must load within 1 second (SC-005)
- **Display support**: High-DPI displays up to 2x pixel density (SC-004)

## Open Questions Resolved

1. ✅ **Image loading method**: Vite static imports
2. ✅ **Sizing approach**: CSS `object-fit: contain` with fixed container
3. ✅ **Fallback implementation**: Reuse hero cube animation
4. ✅ **Error detection**: React `onError` handler
5. ✅ **Naming mapping**: Manual mapping object

## Dependencies

- **No new dependencies required**: Uses existing React, framer-motion, and browser APIs
- **Existing assets**: PNG images already in `theme/images/` folder

## Performance Considerations

- PNG images should be optimized for web (reasonable file sizes)
- Consider lazy loading if many TechOctagon components render simultaneously
- Canvas animation for fallback is lightweight (small particle count)

