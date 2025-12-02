# Feature Specification: Integrate ContactModal with Opportunity API

**Feature Branch**: `001-contact-opportunity-integration`  
**Created**: 2025-12-01  
**Status**: Draft  
**Input**: User description: "integrate @src/components/ContactModal.tsx with https://nextpace-crm-api--nextpace-crm-api.europe-west4.hosted.app/docs/json opportunities endpoint. Create opportunity using 7b7b1b05c6384156a8048854efd7b87c tenant (NEXTPACEDEV)"

## Clarifications

### Session 2025-12-01
- Q: Should the frontend enforce the API's 5000-character limit for descriptions? → A: Yes, enforce limits with maxLength attributes.
- Q: How should API errors be presented to the user? → A: Display a generic, friendly failure message.
- Q: Should form state persist if the user closes and reopens the modal? → A: No, reset the form to a clean state upon reopening.
- Q: How should the tenant ID be managed in the application code? → A: Hardcode it as a constant within the codebase.
- Q: Where should the API integration logic reside? → A: Implement directly within the ContactModal component.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Submit Contact Request (Priority: P1)

As a website visitor, I want to send my project inquiry via the contact form so that the NextPace team can follow up with me.

**Why this priority**: This is the core functionality of the contact modal, essential for lead generation.

**Independent Test**: Open the modal, fill in valid email and project details, click Send. Verify success message appears and API request is made.

**Acceptance Scenarios**:

1. **Given** the contact modal is open and empty, **When** I enter a valid email and project description and click "SEND REQUEST", **Then** the system sends a request to the CRM API and displays the "Received!" success message.
2. **Given** the contact modal is open, **When** I click "SEND REQUEST" without filling required fields, **Then** the browser's native validation or form validation prevents submission (existing behavior).

---

### User Story 2 - Handle Submission Errors (Priority: P2)

As a website visitor, I want to be notified if my request fails to send so that I can try again or contact the team via other means.

**Why this priority**: Ensures users don't assume their message was sent when it wasn't, preventing lost leads.

**Independent Test**: Disconnect network or mock API error, attempt submission. Verify error feedback is visible.

**Acceptance Scenarios**:

1. **Given** the contact modal is open and filled, **When** I submit the form but the API returns an error (e.g., 500), **Then** the system stays on the form view and displays a user-friendly error message (e.g., "Something went wrong. Please try again.").

---

### User Story 3 - Reset Form State (Priority: P3)

As a website visitor, I want to start with a fresh form if I close and reopen the contact modal, so I'm not confused by previous attempts.

**Why this priority**: Improves user experience by preventing stale data or error states from persisting across sessions.

**Independent Test**: Open modal, type text, close modal, reopen modal. Verify fields are empty.

**Acceptance Scenarios**:

1. **Given** I have entered data or received an error in the contact modal, **When** I close and immediately reopen the modal, **Then** the form fields are empty and no error messages are displayed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST transmit the contact form data to the NextPace CRM Opportunity service upon form submission.
- **FR-002**: The transmission MUST include the specific tenant identifier for NEXTPACEDEV.
- **FR-003**: System MUST map the user's email address to the CRM's client email field.
- **FR-004**: System MUST map the user's project requirements to the CRM's opportunity description field.
- **FR-005**: System MUST include a standard title (e.g., "Website Inquiry") for the opportunity.
- **FR-006**: System MUST identify the source of the inquiry as "NextPace Website".
- **FR-007**: System MUST display a success confirmation to the user ONLY after the CRM successfully accepts the data.
- **FR-008**: System MUST display a generic, user-friendly error message (e.g., "Something went wrong...") if the transmission fails, suppressing raw API details.
- **FR-009**: System MUST prevent duplicate submissions while the transmission is in progress.
- **FR-010**: System MUST enforce a 5000-character maximum length on the project requirements input to match API constraints.
- **FR-011**: System MUST reset all form fields and error states to their initial values whenever the modal is opened.
- **FR-012**: System MUST implement the API logic directly within the ContactModal component (no external service file).

### Assumptions

- The CRM API endpoint is `https://nextpace-crm-api--nextpace-crm-api.europe-west4.hosted.app/api/v1/webhooks/opportunities`.
- The required Tenant ID is `7b7b1b05c6384156a8048854efd7b87c`.
- The CRM service creates the opportunity immediately or queues it reliably.
- The Tenant ID is non-sensitive public information and can be stored in client-side constants.

## Key Entities *(include if feature involves data)*

- **Opportunity**: A record in the external CRM system representing a potential client project.
- **Webhook Payload**: The JSON structure sent to the CRM API containing tenant ID, client details, and opportunity information.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of valid submissions result in a verified opportunity record in the CRM.
- **SC-002**: System initiates the data transmission within 200ms of user interaction.
- **SC-003**: Users receive visible feedback (success or error) for 100% of submissions.
