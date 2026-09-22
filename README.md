# RGAD Website

A TypeScript and Next.js monorepo for the Gender Research and Development (GAD) platform. It contains a public journal website and an authenticated admin dashboard, sharing common code through npm workspaces.

## Overview

The platform is a journal site backed by Supabase. The public web app presents archive issues, articles, authors and reviewers, announcements, and summit information. The admin app is used to manage that content.

- `apps/web` public facing website and journal platform
- `apps/admin` authenticated administrative dashboard

Shared functionality lives under `packages/` and is consumed by both applications through npm workspaces.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- Radix UI
- Turborepo
- npm workspaces

## Repository Structure

```text
rgad-website/
├── apps/
│   ├── web/                # Public Next.js application (port 3000)
│   │   ├── app/             # App Router routes and pages
│   │   ├── components/      # Web-specific components
│   │   ├── constants/       # Web-specific constants
│   │   ├── lib/              # Web-specific utilities
│   │   ├── services/         # Data and service functions
│   │   ├── types/             # Web-specific types
│   │   └── assets/images/     # Web-specific static images
│   │
│   └── admin/               # Admin Next.js application (port 3001)
│       ├── app/               # App Router routes, grouped by (auth) and (dashboard)
│       ├── components/        # Admin-specific components
│       ├── lib/                # Admin-specific utilities
│       └── scripts/            # Admin scripts
│
├── packages/
│   ├── components/          # Shared React UI component package
│   ├── supabase/             # Shared Supabase client, server and types
│   ├── types/                  # Shared domain TypeScript types
│   ├── schema/                  # Shared validation schemas
│   ├── lib/                       # Shared utilities
│   ├── context/                    # Shared React context providers
│   └── assets/                      # Shared image and asset package
│
├── package.json              # Root workspace and Turbo configuration
├── turbo.json                 # Turborepo task configuration
└── package-lock.json
```

## Dependency Direction

Shared packages must not import application-specific code from `apps/web` or `apps/admin`.

```text
              packages/*
             (shared code)
                   |
        -----------------------
        |                     |
     apps/web             apps/admin
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 11 or later

### Installation

Install dependencies from the repository root. Do not run `npm install` inside individual workspaces unless there is a specific dependency management reason.

```bash
npm install
```

### Environment Variables

Create a `.env.local` file at the repository root with your Supabase project credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

### Development

Run both applications at once:

```bash
npm run dev
```

Run only the public web app, available at `http://localhost:3000`:

```bash
npm run dev:web
```

Run only the admin app, available at `http://localhost:3001`:

```bash
npm run dev:admin
```

### Build and Lint

```bash
npm run build
npm run lint
```

Root scripts delegate to Turborepo, which runs each task across the workspaces that need it.

## Styling

Both applications use Tailwind CSS with CSS variables for semantic colors, such as `bg-primary`, `text-primary-foreground`, `bg-card`, `text-card-foreground`, `text-muted-foreground`, `border-input`, and `ring-ring`.

The public web app also defines GAD brand colors:

```text
gad-purple
gad-rose
gad-teal
gad-gold
gad-lavender
```

Prefer existing semantic tokens and existing shared component variants over hard-coded colors or one-off implementations.

## Shared Packages

| Package | Purpose |
| --- | --- |
| `@gad/components` | Shared React UI primitives (Button, Card, Badge, Skeleton, progress bar, and related components) |
| `@gad/supabase` | Shared Supabase client, server, and generated types |
| `@gad/types` | Shared domain types (announcements, issues, reviewers, summits) |
| `@gad/schema` | Shared validation schemas |
| `@gad/lib` | Shared utility functions |
| `@gad/context` | Shared React context providers |
| `@gad/assets` | Shared images and static assets |

Import shared UI through the package name, for example:

```ts
import { Button } from "@gad/components";
```

## Contributing

1. Determine whether a change belongs in `apps/web`, `apps/admin`, or a shared package under `packages/`.
2. Inspect existing components, services, types, and Supabase queries before adding new ones.
3. If a change touches a shared package, check both applications for impact.
4. Run the relevant validation commands before opening a pull request:

```bash
npm run lint
npm run build
```

### Commit Messages

Commit messages follow gitmoji conventions with a short type prefix, for example:

```text
:sparkles: feat: add reviewer profile page
:bug: fix: correct pagination on the archive list
:recycle: refactor: simplify issue service queries
```

## License

No license has been declared for this repository yet.
