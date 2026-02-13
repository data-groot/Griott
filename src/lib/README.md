# Lib

Utilities and persistence.

## storage.ts

LocalStorage helpers for the PM Dashboard. All keys are prefixed to avoid collisions (e.g. `pm-dashboard-*`).

| Key / API | Purpose |
|-----------|--------|
| **selectedWorkspaceId** | Currently selected workspace (default: first workspace). |
| **accordionOpenStates** | Which workspace rows are expanded. `Record<workspaceId, boolean>`. |
| **createdWorkspaces** | User-created workspaces (seed workspaces come from `mockData`). |
| **userProfile** | Account Settings profile: firstName, lastName, phone, email, passwordMask. |
| **gettingStartedSteps** | Getting Started panel: list of steps with `completed` and `order`. |
| **feedbackOpen** | Whether the Feedback panel is open. |

**Derived:**

- `getWorkspaces()` returns seed workspaces + `getCreatedWorkspaces()` (used by `WorkspacesContext`).

**Used by:** WorkspacesContext, Dashboard (accordion state), AccountSettings (profile), GettingStartedModal, FeedbackTab.

No secrets are stored; use `.env` for API keys and never commit them.
