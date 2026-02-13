# Pages

Route-level views. Routes are defined in `App.tsx`.

| Page | Route(s) | Description |
|------|----------|-------------|
| **Dashboard.tsx** | `/` | Main dashboard: Header, “Welcome, {username}!”, three StatCards (Workspaces, Users, Initiatives), WorkspaceProgress card, Getting Started button, FeedbackTab. |
| **AccountSettings.tsx** | `/settings` | Account settings: user profile form (name, phone, email, password mask). Data from `storage.ts` (`getUserProfile` / `setUserProfile`). |
| **SectionPage.tsx** | `/fit/:page`, `/build/:page`, `/launch/:page` | Generic section page for Fit, Build, or Launch; `:page` is the module slug (e.g. canvas, problem-map). Renders section content based on current segment and page param. |
| **HowItWorks.tsx** | `/how-it-works` | “How it works” content page. |

Dashboard is the main landing page; other pages are linked from the Header or from workspace progress items.
