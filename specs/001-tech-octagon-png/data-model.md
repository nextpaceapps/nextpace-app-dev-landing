# Data Model: TechOctagon PNG Images

## Overview

This feature involves minimal data modeling as it primarily deals with UI rendering and static asset references. The main entities are image references and component state.

## Entities

### TechOctagonImageReference

Represents the mapping between technology labels and their corresponding PNG image files.

**Attributes**:
- `label: string` - Technology name displayed to users (e.g., "C#", ".NET", "Google Cloud")
- `imagePath: string` - Path to PNG file in `theme/images/` folder (e.g., "csharp.png", "gcloud.png")
- `color: 'cyan' | 'fuchsia'` - Octagon border color scheme

**Relationships**:
- One-to-one with PNG image file in filesystem
- Many-to-one with TechOctagon component instances

**Example**:
```typescript
{
  label: "Google Cloud",
  imagePath: "/theme/images/gcloud.png",
  color: "cyan"
}
```

### TechOctagonComponentState

Represents the internal state of a TechOctagon component instance.

**Attributes**:
- `imageLoaded: boolean` - Whether PNG image successfully loaded
- `imageError: boolean` - Whether image failed to load or is missing
- `showFallback: boolean` - Whether to display animated cube fallback

**State Transitions**:
1. Initial: `imageLoaded=false, imageError=false, showFallback=false`
2. Image loads successfully: `imageLoaded=true, imageError=false, showFallback=false`
3. Image fails to load: `imageLoaded=false, imageError=true, showFallback=true`

**Validation Rules**:
- `showFallback` MUST be `true` when `imageError` is `true`
- `imageLoaded` and `imageError` cannot both be `true` simultaneously

## Image Mapping Configuration

### Static Mapping Object

```typescript
const TECH_IMAGE_MAP: Record<string, string> = {
  'C#': 'csharp.png',           // or actual filename
  '.NET': 'dotnet.png',          // or actual filename
  'Google Cloud': 'gcloud.png',
  'Firebase': 'firebase.png',
  'AWS': 'aws.png',
  // Add mappings for all technologies displayed in TechOctagon
};
```

**Validation**:
- All keys must match technology labels used in TechOctagon components
- All values must correspond to actual PNG files in `theme/images/` folder
- Missing mappings result in fallback display

## Component Props Interface

```typescript
interface TechOctagonProps {
  label: string;           // Technology name
  color: 'cyan' | 'fuchsia';  // Border color scheme
  imagePath?: string;     // Optional: override default mapping
}
```

## No Persistent Storage

This feature does not require:
- Database storage
- API endpoints
- Server-side state
- User preferences persistence

All data is:
- Static (image file references)
- Component-local state (loading/error states)
- Runtime-only (no persistence needed)

