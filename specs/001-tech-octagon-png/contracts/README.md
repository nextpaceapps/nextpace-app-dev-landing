# Contracts: TechOctagon PNG Images

## Overview

This feature is frontend-only and does not involve any API contracts, external service integrations, or data exchange protocols.

## N/A - Frontend-Only Feature

No contracts are required because:
- All PNG images are static assets served from the `theme/images/` folder
- No API calls or external service integrations
- No data serialization/deserialization
- No inter-service communication

## Component Interface

The only "contract" is the React component interface:

```typescript
interface TechOctagonProps {
  label: string;
  color: 'cyan' | 'fuchsia';
  imagePath?: string;  // Optional override
}
```

This interface is enforced by TypeScript at compile time and does not require a formal contract document.

