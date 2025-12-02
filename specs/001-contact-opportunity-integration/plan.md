# Implementation Plan - Integrate ContactModal with Opportunity API

**Feature**: Integrate ContactModal with Opportunity API
**Status**: DRAFT

## Technical Context

### Architecture
- **Component**: `ContactModal.tsx`
- **Service**: `ContactModal` (API logic internal)
- **Integration**: REST API (POST) to external CRM webhook endpoint.
- **State Management**: React `useState` for form fields (`email`, `projectIdea`) and UI states (`isOpen`, `step`, `isSubmitting`, `error`).

### Dependencies
- **Internal**: `framer-motion` (animations), `lucide-react` (icons).
- **External**: `fetch` API (browser native).
- **Environment**: Hardcoded constants for Tenant ID and API Endpoint.

### Existing Code Analysis
- **File**: `src/components/ContactModal.tsx`
- **Current Behavior**: Simulates submission with `setTimeout`.
- **Changes Required**:
  - Replace simulation with actual `fetch` call.
  - Add `maxLength` to textarea.
  - Add error state handling and display.
  - Add resetting logic on open/close.
  - Define constants for API configuration.

## Constitution Check

### [PRINCIPLE_1_NAME]
N/A (Template constitution)

### [PRINCIPLE_3_NAME]
N/A (Template constitution) - Standard React testing patterns apply.

## Phase 0: Research & Decisions

No significant unknowns requiring deep research. The API endpoint, payload structure, and authentication method (Tenant ID) are defined in the spec.

- **Decision**: Use `fetch` directly in `handleSubmit`.
- **Rationale**: Simple, single-use integration does not warrant a separate service layer yet.
- **Decision**: Hardcode Tenant ID.
- **Rationale**: Public ID, no security risk, simplifies configuration for this phase.

## Phase 1: Design & Contracts

### Data Model

#### Payload (JSON)

```json
{
  "tenantId": "7b7b1b05c6384156a8048854efd7b87c",
  "title": "Website Inquiry",
  "description": "User provided project details...",
  "source": "NextPace Website",
  "email": "user@example.com"
}
```

#### Component State

```typescript
interface ContactModalState {
  step: 'form' | 'success';
  isSubmitting: boolean;
  error: string | null;
  formData: {
    email: string;
    projectIdea: string;
  };
}
```

### Contracts

#### API Endpoint

- **URL**: `https://nextpace-crm-api--nextpace-crm-api.europe-west4.hosted.app/api/v1/webhooks/opportunities`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Success**: `201 Created` (or 2xx)
- **Failure**: `4xx` or `5xx`

## Phase 2: Implementation Steps

### Step 1: Update Component State & Validation
- Add `isSubmitting` and `error` states.
- Add `maxLength={5000}` to textarea.
- Implement reset logic in `handleClose` (or `useEffect` on `isOpen`).

### Step 2: Implement API Integration
- Replace `setTimeout` in `handleSubmit` with `fetch`.
- Construct JSON payload using constants.
- Handle `response.ok` check.
- Transition to `success` step on 2xx.
- Set `error` state on failure.

### Step 3: Error UI
- Render error message if `error` state is present.
- Ensure `isSubmitting` disables the submit button.

### Step 4: Cleanup
- Remove simulation code.
- Verify `onClose` resets everything.
