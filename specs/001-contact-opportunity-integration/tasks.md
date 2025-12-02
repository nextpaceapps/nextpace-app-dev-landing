---
description: "Task list for Integrate ContactModal with Opportunity API"
---

# Tasks: Integrate ContactModal with Opportunity API

**Input**: Design documents from `/specs/001-contact-opportunity-integration/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are OPTIONAL - only included if explicitly requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create contracts directory and add openapi.yaml in specs/001-contact-opportunity-integration/contracts/openapi.yaml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T002 [P] Define API constants (URL, TenantID) in src/components/ContactModal.tsx
- [x] T003 [P] Define TypeScript interfaces for form data and component state in src/components/ContactModal.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Submit Contact Request (Priority: P1) 🎯 MVP

**Goal**: As a website visitor, I want to send my project inquiry via the contact form so that the NextPace team can follow up with me.

**Independent Test**: Open the modal, fill in valid email and project details, click Send. Verify success message appears and API request is made.

### Implementation for User Story 1

- [x] T004 [US1] Implement maxLength validation on textarea in src/components/ContactModal.tsx
- [x] T005 [US1] Add isSubmitting state to ContactModal component in src/components/ContactModal.tsx
- [x] T006 [US1] Replace mock submission with fetch API call in handleSubmit in src/components/ContactModal.tsx
- [x] T007 [US1] Implement success state transition on 2xx response in src/components/ContactModal.tsx
- [x] T008 [US1] Disable submit button during submission in src/components/ContactModal.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Handle Submission Errors (Priority: P2)

**Goal**: As a website visitor, I want to be notified if my request fails to send so that I can try again or contact the team via other means.

**Independent Test**: Disconnect network or mock API error, attempt submission. Verify error feedback is visible.

### Implementation for User Story 2

- [x] T009 [US2] Add error state to ContactModal component in src/components/ContactModal.tsx
- [x] T010 [US2] Implement error handling in fetch catch block and non-2xx responses in src/components/ContactModal.tsx
- [x] T011 [US2] Render generic error message when error state is present in src/components/ContactModal.tsx
- [x] T012 [US2] Ensure form data is preserved on error in src/components/ContactModal.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Reset Form State (Priority: P3)

**Goal**: As a website visitor, I want to start with a fresh form if I close and reopen the contact modal, so I'm not confused by previous attempts.

**Independent Test**: Open modal, type text, close modal, reopen modal. Verify fields are empty.

### Implementation for User Story 3

- [x] T013 [US3] Implement form reset logic in handleClose function in src/components/ContactModal.tsx
- [x] T014 [US3] Ensure error state and isSubmitting are reset on close in src/components/ContactModal.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T015 Remove unused simulation code (setTimeout) in src/components/ContactModal.tsx
- [x] T016 [P] Verify standard title and source fields are sent correctly in payload in src/components/ContactModal.tsx
- [x] T017 Run manual verification steps from quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1 logic
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Integrates with US1/US2 logic

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

