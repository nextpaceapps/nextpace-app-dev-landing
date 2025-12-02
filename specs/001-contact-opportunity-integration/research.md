# Research: Integrate ContactModal with Opportunity API

## Decisions

### API Integration Strategy
- **Decision**: Implement `fetch` logic directly within `ContactModal.tsx`.
- **Rationale**: The integration is specific to this component and effectively single-use. Creating a shared service abstraction is premature optimization (YAGNI).
- **Alternatives**:
    - *Shared Service*: Better for testing and reuse, but adds boilerplate for a single call.
    - *Custom Hook*: Good for separation of concerns, but might be overkill for this simple form.

### Configuration Management
- **Decision**: Hardcode Tenant ID (`7b7b1b05c6384156a8048854efd7b87c`) and API URL as constants.
- **Rationale**: The ID is public (embedded in client code anyway) and specific to the environment described in the spec. No immediate need for environment variables.
- **Alternatives**:
    - *Environment Variables*: Standard for secrets/config, but adds build-step complexity not strictly required here.

### Error Handling
- **Decision**: Display generic "Something went wrong" message.
- **Rationale**: Detailed API errors are not user-friendly and could expose system details.
- **Alternatives**:
    - *Toast Notifications*: Could be used, but inline error near the button is clearer for modal forms.

### Form Reset
- **Decision**: Reset form state completely on modal open/close.
- **Rationale**: Prevents confusion from previous sessions.
- **Alternatives**:
    - *Persist State*: Useful for long forms, but this is a short contact form where "fresh start" is usually preferred.

