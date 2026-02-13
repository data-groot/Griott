# Components

Reusable UI components used across the app.

| Component | Purpose |
|-----------|--------|
| **Header.tsx** | Top bar: logo “PM Dashboard”, Fit/Build/Launch/Files nav (with dropdowns), workspace selector, chat/help icons, user avatar dropdown (Account Settings, Sign out). On `/`, shows sub-bar with “Dashboard” and “How it works”. |
| **Modal.tsx** | Centered modal overlay; ESC to close. Used as base for other modals. |
| **Dropdown.tsx** | Reusable dropdown (ESC to close). Used in Header for nav and workspace selector. |
| **StatCard.tsx** | Left-side stat card: label + big number (e.g. Workspaces, Users, Initiatives). |
| **WorkspaceProgress.tsx** | Main card: “Workspace Progress” title + “Create Workspace” button; accordion of workspaces; each row expands to Fit / Build / Launch columns with checklist items and status icons. Uses `storage.ts` for accordion open state. |
| **FeedbackTab.tsx** | Fixed vertical “Feedback” pill on the right; toggles a feedback panel. |
| **GettingStartedModal.tsx** | Slide-out panel + floating “Getting Started” button; step list with completion state from `storage.ts`. |
| **CreateWorkspaceModal.tsx** | Modal form to create a new workspace (name, solution, industry, problem, etc.); calls `addWorkspace` from `WorkspacesContext` and persists via `storage.ts`. |

All modals and dropdowns support keyboard (ESC to close) and focus management.
