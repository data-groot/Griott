# PM Dashboard

React + Vite + TypeScript + Tailwind CSS dashboard matching the main Dashboard layout: top header bar, welcome heading, left stat cards, Workspace Progress accordion, Feedback pill, and Getting Started floating button.

---

## Exact terminal commands

From the project root (e.g. `velociti PM Dashboard`):

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Main Dashboard layout (screenshot 1)

- **Top header bar**: Logo/name placeholder (“PM Dashboard”), nav items (Fit, Build, Launch, Files with dropdowns), workspace selector dropdown (right), icons (chat, help), user avatar dropdown.
- **Page title**: “Welcome, {username}!” large heading.
- **Left sidebar**: Stat cards — Workspaces, Users, Initiatives (big numbers from data).
- **Main card**: “Workspace Progress” with “Create Workspace” link/button on the right.
- **Workspace Progress**: Accordion list of workspaces; each expands to Fit / Build / Launch columns with checklist items and status icons (done, in progress, todo).
- **Right side**: Fixed vertical “Feedback” pill button.
- **Bottom-right**: Fixed “Getting Started” floating button.

---

## Project structure (all file contents live in this repo)

```
velociti PM Dashboard/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── vite.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── types.ts
│   ├── data/
│   │   └── mockData.ts          # user, workspaces (single source of truth)
│   ├── lib/
│   │   └── storage.ts           # selectedWorkspaceId, accordion states, profile, etc.
│   ├── contexts/
│   │   └── DashboardContext.tsx # modal open state (Create Workspace, Getting Started)
│   ├── components/
│   │   ├── Header.tsx           # Top bar: logo, Fit/Build/Launch/Files, workspace dropdown, chat/help, user
│   │   ├── Dropdown.tsx         # Reusable dropdown (ESC to close)
│   │   ├── Modal.tsx            # Centered modal (ESC to close)
│   │   ├── StatCard.tsx         # Left sidebar stat cards
│   │   ├── WorkspaceProgress.tsx# Main card + accordion (Fit/Build/Launch columns)
│   │   ├── FeedbackTab.tsx      # Fixed right Feedback pill + panel
│   │   ├── GettingStartedModal.tsx  # Slide-out panel + floating button
│   │   └── CreateWorkspaceModal.tsx# Create Workspace form modal
│   └── pages/
│       ├── Dashboard.tsx        # Main dashboard page (layout above)
│       └── AccountSettings.tsx  # /settings
└── reference/                   # Screenshots (UI reference only)
```

---

## Key files (summary)

- **`src/data/mockData.ts`**: `user` (`username`, `email`), `workspaces` (id, name, summary, progressPercent, modules.fit/build/launch, counts.initiatives). Module items: id, title, subtitle, status (`done` | `in_progress` | `todo`).
- **`src/lib/storage.ts`**: Persists `selectedWorkspaceId`, accordion open states, user profile, getting-started steps, feedback open. Reads/writes localStorage.
- **`src/components/Header.tsx`**: Renders logo “PM Dashboard”, Fit/Build/Launch (dropdowns), Files link, workspace selector, chat icon, help icon, user avatar dropdown (signed in as, Account Settings, Sign out). On `/`, sub-bar with “Dashboard” and “How it works”.
- **`src/pages/Dashboard.tsx`**: Renders Header, “Welcome, {username}!”, three StatCards (Workspaces, Users, Initiatives), WorkspaceProgress card, GettingStartedButton, FeedbackTab.
- **`src/components/WorkspaceProgress.tsx`**: “Workspace Progress” title + “Create Workspace” button; accordion of workspaces from `mockData`; expanded rows show three columns (Fit, Build, Launch) with checklist items and status icons. Accordion state persisted via `storage.ts`.

All of the above files exist in the repo with full contents; open them in your editor to see the complete code.

---

## Tech stack

- **React 18** + **Vite 5** + **TypeScript**
- **Tailwind CSS** (Inter font, primary blue palette)
- **lucide-react** (icons)
- **react-router-dom** (/, /settings)

---

## Data and persistence

- **Source of truth**: `src/data/mockData.ts` (user, 3 sample workspaces with modules and counts).
- **Stat cards**: Workspaces = `workspaces.length`, Users = 1, Initiatives = sum of `workspace.counts.initiatives`.
- **Persisted in localStorage**: Selected workspace id, accordion open/closed state per workspace, user profile (Account Settings), getting-started step completion, feedback panel open.

---

## Accessibility

- Keyboard navigation and focus management.
- **ESC** closes dropdowns and modals (Dropdown, Modal, Getting Started panel, Feedback panel).
