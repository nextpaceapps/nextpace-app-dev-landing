# Quickstart: Integrate ContactModal with Opportunity API

## Overview
This feature connects the existing `ContactModal` component to the NextPace CRM API to submit real opportunities.

## Development Steps

1.  **Open `src/components/ContactModal.tsx`**.
2.  **Add Constants**:
    ```typescript
    const API_URL = 'https://nextpace-crm-api--nextpace-crm-api.europe-west4.hosted.app/api/v1/webhooks/opportunities';
    const TENANT_ID = '7b7b1b05c6384156a8048854efd7b87c';
    ```
3.  **Update State**: Add `isSubmitting` and `error`.
4.  **Modify `handleSubmit`**: Implement the `fetch` call.
5.  **Update UI**:
    - Add `maxLength={5000}` to textarea.
    - Show error message if `error` exists.
    - Disable button when `isSubmitting` is true.
6.  **Test**: Use the manual test steps in `spec.md`.

## Verification
- Submit a form -> Success screen.
- Submit with network off -> Error message.
- Reopen modal -> Form resets.

