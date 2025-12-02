# Data Model: Contact Opportunity Integration

## Entities

### Webhook Payload

The structure sent to the CRM Opportunity Webhook.

| Field | Type | Required | Description | Constraints |
|---|---|---|---|---|
| `tenantId` | UUID | Yes | The identifier for the tenant. | Must match `7b7b1b05c6384156a8048854efd7b87c` |
| `title` | String | Yes | The title of the opportunity. | Fixed: "Website Inquiry" |
| `description` | String | Yes | The user's project details. | Max 5000 chars |
| `source` | String | Yes | The source of the lead. | Fixed: "NextPace Website" |
| `email` | Email | Yes | The user's email address. | Valid email format |

### Component State

State managed within `ContactModal.tsx`.

| State | Type | Description |
|---|---|---|
| `step` | `'form' \| 'success'` | Controls the view mode (input form vs success message). |
| `isSubmitting` | `boolean` | Indicates if the API request is in progress. |
| `error` | `string \| null` | Holds the current error message to display, if any. |
| `formData` | `Object` | (Implicit via inputs) The current values of email and description. |

