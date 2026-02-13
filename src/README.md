# Source code overview

Entry point: `main.tsx` → `App.tsx` (routes and providers).

## Structure

| Folder        | Purpose |
|---------------|--------|
| **components/** | Reusable UI: Header, Modal, Dropdown, StatCard, WorkspaceProgress, FeedbackTab, GettingStartedModal, CreateWorkspaceModal. See [components/README.md](components/README.md). |
| **contexts/**   | React context: `DashboardContext` (modal open state), `WorkspacesContext` (workspaces list + add/refresh). See [contexts/README.md](contexts/README.md). |
| **data/**       | Seed data: `mockData.ts` (user, workspaces with Fit/Build/Launch modules). See [data/README.md](data/README.md). |
| **lib/**        | Persistence: `storage.ts` (localStorage for workspace selection, accordion state, profile, getting-started, feedback). See [lib/README.md](lib/README.md). |
| **pages/**      | Route-level views: Dashboard, AccountSettings, SectionPage, HowItWorks. See [pages/README.md](pages/README.md). |

## Key files (root of `src/`)

- **App.tsx** – Wraps app in `DashboardProvider` and `WorkspacesProvider`, defines `<Routes>`, renders global modals (CreateWorkspace, GettingStarted).
- **types.ts** – Shared TypeScript types: `GettingStartedStep`, `CreateWorkspaceForm`.
- **index.css** – Global styles (Tailwind directives, base styles).
- **vite-env.d.ts** – Vite client types reference.

## Routes (from App.tsx)

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/settings` | AccountSettings |
| `/fit/:page` | SectionPage (Fit section) |
| `/build/:page` | SectionPage (Build section) |
| `/launch/:page` | SectionPage (Launch section) |
| `/how-it-works` | HowItWorks |
