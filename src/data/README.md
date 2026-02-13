# Data

Seed and shape of dashboard data.

## mockData.ts

Single source of truth for **user** and **workspaces** (seed data). User-created workspaces are stored in `lib/storage.ts` and merged at runtime.

### Exports

- **user** – `{ username, email }`.
- **workspaces** – array of seed workspaces (default: 3).
- **createDefaultWorkspace(id, name, summary)** – factory for a new workspace with default Fit/Build/Launch module items.

### Types (exported)

- **User** – username, email.
- **Workspace** – id, name, summary, progressPercent, modules (fit/build/launch), counts (initiatives).
- **WorkspaceModules** – fit, build, launch (each array of ModuleItem).
- **ModuleItem** – id, title, subtitle, status (`done` | `in_progress` | `todo`).
- **WorkspaceCounts** – initiatives (number).

### Module items

Each workspace has three lists: **Fit**, **Build**, **Launch**. Each item has a status for the checklist UI. New workspaces get a copy of the default module lists via `createDefaultWorkspace`.

Persistence: only **selectedWorkspaceId** and **accordion open state** (and user-created workspaces) are persisted in `storage.ts`. This file is read-only seed data.
