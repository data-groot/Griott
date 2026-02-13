# Contexts

React context providers for app-wide state.

## DashboardContext

- **File:** `DashboardContext.tsx`
- **Provides:** Modal open/close state for:
  - Create Workspace modal
  - Getting Started panel
- **Used by:** `App.tsx` (AppModals), Header (to open modals), Dashboard (Getting Started button), WorkspaceProgress (Create Workspace button).

## WorkspacesContext

- **File:** `WorkspacesContext.tsx`
- **Provides:**
  - `workspaces` – list of workspaces (seed from `mockData` + user-created from `storage`)
  - `refreshWorkspaces()` – reload workspaces from storage
  - `addWorkspace(workspace)` – add a workspace, persist to localStorage, set as selected, and refresh list
- **Used by:** Dashboard (StatCards, WorkspaceProgress), CreateWorkspaceModal (on create), App (for modal callbacks).
- **Persistence:** Uses `lib/storage.ts` (`getWorkspaces`, `getCreatedWorkspaces`, `setCreatedWorkspaces`, `setSelectedWorkspaceId`, accordion state).

Both providers wrap the app in `App.tsx` (DashboardProvider → WorkspacesProvider).
