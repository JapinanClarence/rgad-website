# CLAUDE.md

## Project Overview

`rgad-website` is a TypeScript/React monorepo for the Gender Research and Development (GAD) platform. It contains two Next.js applications:

- `apps/web` — public-facing website/journal platform.
- `apps/admin` — authenticated administrative dashboard.

Shared functionality is organized under `packages/` and consumed by both applications through npm workspaces.

The repository uses:

- Next.js `14.2.3`
- React `18`
- TypeScript `5`
- Tailwind CSS `3.4.x`
- Supabase (`@supabase/supabase-js` + `@supabase/ssr`)
- Radix UI
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- Turborepo
- npm workspaces

Do not introduce a different framework, package manager, or monorepo tool unless explicitly requested.

---

## Repository Structure

```text
rgad-website/
├── apps/
│   ├── web/                    # Public Next.js application
│   │   ├── app/                # Next.js App Router routes/pages
│   │   ├── components/         # Web-specific components
│   │   ├── constants/          # Web-specific constants
│   │   ├── lib/                # Web-specific utilities
│   │   ├── services/           # Data/service functions
│   │   ├── types/              # Web-specific types
│   │   ├── assets/images/      # Web-specific static images
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── admin/                  # Admin Next.js application
│       ├── app/                # Admin App Router routes
│       ├── components/layout/  # Admin layout components
│       ├── lib/                # Admin-specific utilities
│       ├── scripts/            # Admin scripts
│       ├── next.config.js
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── assets/                 # Shared image/assets package
│   ├── supabase/               # Shared Supabase client/server/types
│   ├── types/                  # Shared domain TypeScript types
│   └── ui/                     # Shared React UI component package
│
├── package.json                # Root workspace + Turbo configuration
├── turbo.json                  # Turborepo task configuration
├── package-lock.json
├── .gitignore
└── README.md
```

The root workspace includes both `apps/*` and `packages/*`.

---

## Root Commands

Run commands from the repository root unless there is a specific reason to work inside an app.

```bash
npm install
npm run dev
npm run build
npm run lint
npm run dev:web
npm run dev:admin
```

### Development

Run both applications:

```bash
npm run dev
```

Run only the public web app:

```bash
npm run dev:web
```

The web application runs on port `3000`.

Run only the admin app:

```bash
npm run dev:admin
```

The admin application runs on port `3001`.

### Build and lint

```bash
npm run build
npm run lint
```

The root scripts delegate to Turborepo.

Do not run `npm install` inside individual workspaces unless there is a specific dependency-management reason. Prefer managing workspace dependencies from the root.

---

# Monorepo Rules

## Dependency Direction

Use this dependency direction:

```text
                 ┌──────────────────┐
                 │   packages/*     │
                 │ shared code      │
                 └────────┬─────────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
         apps/web                apps/admin
```

Shared packages must not import application-specific code from `apps/web` or `apps/admin`.

For example:

```text
GOOD:
apps/web      ──► @gad/ui
apps/admin    ──► @gad/ui

BAD:
@gad/ui       ──► apps/web/lib/...
@gad/ui       ──► apps/admin/components/...
```

Keep application-specific business logic inside the appropriate app.

---

# Shared Packages

## `@gad/ui`

Location:

```text
packages/ui/
```

This is the shared React UI package used by both applications.

Current exports include:

- `Button`
- `Skeleton`
- `SlimBar`
- `ProgressProvider`
- `useProgress`
- related progress types

The package also contains reusable UI components such as:

```text
packages/ui/
├── context/
│   └── progress-context.tsx
├── lib/
│   └── utils.ts
├── badge.tsx
├── button.tsx
├── card.tsx
├── separator.tsx
├── skeleton.tsx
├── slim-bar.tsx
├── index.ts
└── package.json
```

Import shared UI through:

```ts
import { Button } from "@gad/ui";
```

Do not recreate an existing shared component in an application unless the new component is intentionally application-specific.

### Important: UI package imports

The shared UI package must not depend on application path aliases such as:

```ts
import { cn } from "@/lib/utils";
```

`@/*` is application-specific in this repository.

Inside `packages/ui`, use package-relative imports, for example:

```ts
import { cn } from "./lib/utils";
```

or the appropriate relative path.

### UI package dependencies

Components in `@gad/ui` may use Radix UI, `class-variance-authority`, `clsx`, and `tailwind-merge`.

When adding a dependency that is required specifically by shared UI components, make sure the workspace/package dependency graph remains correct rather than relying accidentally on an application's dependency.

---

## `@gad/supabase`

Location:

```text
packages/supabase/
```

Files:

```text
client.ts
server.ts
types.ts
package.json
```

Exports:

```text
@gad/supabase
@gad/supabase/client
@gad/supabase/server
@gad/supabase/types
```

Use this package as the shared boundary for Supabase access.

Do not create duplicate Supabase client implementations inside `apps/web` or `apps/admin` unless there is an explicit framework-specific reason.

Be careful to distinguish:

- browser/client usage
- server usage
- authentication/session handling
- database generated types

Never expose service-role credentials to client-side code.

Never put secrets in source files.

---

## `@gad/types`

Location:

```text
packages/types/
```

Current domain type modules include:

```text
announcement.ts
issue.ts
reviewer.ts
summit.ts
index.ts
```

Use shared domain types from `@gad/types` when the same type is required by both applications.

Do not duplicate domain interfaces in `apps/web` and `apps/admin` when they represent the same underlying data.

---

## `@gad/assets`

Location:

```text
packages/assets/
```

This package provides shared images/assets.

Use the package export rather than duplicating the same asset in both applications.

---

# `apps/web`

## Purpose

`apps/web` is the public-facing website.

Current App Router areas include:

```text
app/
├── about/
├── announcements/
├── contact/
├── issue/
├── journal/
├── summit/
├── globals.css
├── layout.tsx
└── page.tsx
```

Web-specific components are organized by feature:

```text
components/
├── contact/
├── home/
├── journal/
├── layout/
└── summit/
```

Web data/service modules currently include:

```text
services/
├── announcement.ts
├── issue.ts
├── reviewer.ts
└── summit.ts
```

### Web aliases

The web application's TypeScript configuration defines:

```text
@/* → apps/web/*
```

Therefore:

```ts
import Something from "@/components/...";
```

means the import is relative to `apps/web`.

Do not use this alias from shared packages.

---

# `apps/admin`

## Purpose

`apps/admin` is the administrative application.

Its App Router uses route groups:

```text
app/
├── (auth)/
├── (dashboard)/
├── globals.css
├── layout.tsx
└── page.tsx
```

Admin-specific components are under:

```text
components/layout/
```

The admin application also has its own:

```text
lib/
scripts/
```

Keep admin-only functionality here unless it is genuinely reusable by the public web app.

The admin app already consumes:

```text
@gad/supabase
@gad/ui
@gad/assets
@gad/types
```

---

# Styling / Tailwind

Both applications use Tailwind CSS with CSS variables for semantic colors.

The public web app has additional GAD brand colors such as:

```text
gad-purple
gad-rose
gad-teal
gad-gold
gad-lavender
```

The shared UI components use semantic classes such as:

```text
bg-primary
text-primary-foreground
bg-card
text-card-foreground
text-muted-foreground
border-input
ring-ring
```

Preserve this semantic styling approach rather than hard-coding colors into reusable components.

## Tailwind content paths

The web Tailwind configuration already scans the shared UI package:

```text
../../packages/ui/**/*.{ts,tsx}
```

This is important because Tailwind needs to see class names used by shared components.

The admin Tailwind configuration currently scans its own `app` and `components` directories. If shared `@gad/ui` components are used in admin pages and their classes are not being generated, update the admin Tailwind content configuration to include the shared UI package.

Do not solve missing Tailwind classes by adding arbitrary duplicate styles to individual components.

---

# React / Next.js Rules

This repository uses the Next.js App Router.

Use:

```text
app/
```

for routes and layouts.

For components using:

- `useState`
- `useEffect`
- `useContext`
- browser APIs
- event handlers
- `usePathname`
- `useSearchParams`
- other client-only APIs

make the component a client component with:

```tsx
"use client";
```

Do not unnecessarily convert server components into client components.

The shared `SlimBar` and `ProgressProvider` are client-side functionality.

---

# Progress Loading UI

The shared UI package contains a page-transition progress system:

```text
@gad/ui
├── ProgressProvider
├── useProgress
└── SlimBar
```

`ProgressProvider` owns progress state.

`SlimBar` listens to Next.js App Router navigation-related changes and displays the progress bar.

When modifying this system:

- preserve the provider/context relationship
- do not create a second progress context in an app
- keep browser-only logic in client components
- preserve the safety timeout behavior
- avoid breaking navigation in either application

---

# Data Access Pattern

Prefer this general separation:

```text
UI / Page
   ↓
app-specific service
   ↓
@gad/supabase
   ↓
Supabase
```

For the public web application, service modules such as:

```text
services/issue.ts
services/announcement.ts
services/reviewer.ts
services/summit.ts
```

should remain the main place for feature-specific data retrieval logic.

If the same database operation becomes necessary in both applications, consider whether it belongs in a shared package instead of duplicating it.

Do not put arbitrary Supabase queries directly into many UI components.

---

# Authentication / Authorization

Authentication and authorization are application concerns, but database security must ultimately be enforced by Supabase/Postgres Row Level Security (RLS).

Never rely only on:

```text
if (user) { ... }
```

in the UI to protect administrative operations.

Client-side route guards are UX/security layers, not substitutes for database authorization.

When modifying admin CRUD operations:

1. Verify the authenticated session.
2. Use the appropriate Supabase client.
3. Ensure the database RLS policy permits the intended operation.
4. Do not expose privileged service-role credentials to the browser.

Public read access and authenticated write access are distinct concerns.

---

# Database / Domain Awareness

The project is a journal platform backed by Supabase.

Important domain concepts include:

- archive/issues
- articles
- authors/reviewers
- announcements
- summits

The public website presents journal content and related information, while the admin application is intended to manage platform content.

When modifying database-related code:

- inspect the existing Supabase types first
- reuse `@gad/types` where appropriate
- avoid inventing column names
- preserve existing relationships and foreign keys
- use the generated/shared database types when available
- check RLS implications before changing CRUD behavior

If a query fails, investigate the actual schema and generated types before changing the frontend data model to fit the error.

---

# Import Rules

## Application code

Inside `apps/web` and `apps/admin`, the `@/*` alias is available:

```ts
import { Something } from "@/components/...";
```

Use it for application-local imports when appropriate.

## Shared packages

Do not use application aliases from `packages/*`.

Use package-relative imports or explicit package imports.

For example:

```ts
// Good inside packages/ui
import { cn } from "./lib/utils";
```

Avoid:

```ts
// Bad inside packages/ui
import { cn } from "@/lib/utils";
```

---

# Component Placement Rules

Before creating a component, decide whether it is:

### Shared

Place it in:

```text
packages/ui/
```

if it is a reusable presentational/UI primitive that can reasonably be used by both applications.

Examples:

```text
Button
Card
Badge
Skeleton
Dialog
Input
Tabs
Progress bar
```

### Web-specific

Place it in:

```text
apps/web/components/
```

if it contains public-site-specific behavior, layout, or domain presentation.

Examples:

```text
journal article card
public navigation
public homepage section
summit-specific section
```

### Admin-specific

Place it in:

```text
apps/admin/components/
```

if it is specific to the admin dashboard.

Examples:

```text
admin sidebar
admin CRUD toolbar
admin dashboard widgets
admin-only form workflows
```

Do not put business-specific components into `@gad/ui` just because they happen to use Tailwind.

---

# Avoid Over-Abstraction

Do not create a shared package or utility for every small piece of code.

Share code when:

- both apps genuinely need it
- the API is stable enough to reuse
- sharing reduces duplication
- the code does not depend on one application's routing or business logic

Keep code local when:

- it is only used by one app
- it contains app-specific business rules
- moving it would create unnecessary coupling

---

# Styling Conventions

Prefer existing semantic Tailwind tokens and existing component variants.

For example, the shared `Button` already supports variants such as:

```text
default
destructive
outline
secondary
ghost
link
gad
```

and sizes such as:

```text
default
sm
lg
xl
icon
```

Reuse those variants rather than introducing one-off button implementations.

When adding a new shared UI variant, update the shared component and its exported types instead of duplicating the component in an application.

---

# Git / Change Safety

Before modifying code:

1. Inspect the existing implementation.
2. Identify whether the change belongs in `apps/*` or `packages/*`.
3. Check consumers of the code being changed.
4. Preserve existing APIs unless a breaking change is intentional.
5. Run the smallest relevant validation command.
6. Run a full build/lint when the change affects shared packages or workspace configuration.

When changing a shared package, test both applications because a change to `@gad/ui`, `@gad/types`, `@gad/supabase`, or `@gad/assets` can affect both apps.

Do not make unrelated refactors while implementing a focused task.

---

# Validation Checklist

For UI changes:

```bash
npm run lint
npm run build
```

For shared package changes:

```bash
npm run lint
npm run build
```

Then verify both applications:

```bash
npm run dev:web
npm run dev:admin
```

Pay particular attention to:

- TypeScript errors
- Tailwind class generation
- Next.js server/client component boundaries
- package import resolution
- Supabase authentication/session behavior
- RLS failures
- hydration errors
- navigation behavior

---

# Common Pitfalls

## 1. Using `@/` inside shared packages

Do not do this:

```ts
import { cn } from "@/lib/utils";
```

inside `packages/ui`.

Use a package-relative import.

## 2. Assuming Tailwind automatically scans shared packages

Tailwind must scan the files containing the classes.

The web app already includes:

```text
../../packages/ui/**/*.{ts,tsx}
```

The admin app should also scan `packages/ui` when it consumes shared components whose classes need to be generated.

## 3. Putting business logic in `@gad/ui`

`@gad/ui` is for reusable UI and UI-related context/utilities, not journal CRUD logic.

## 4. Duplicating shared types

Before defining a new `Issue`, `Announcement`, `Reviewer`, or `Summit` type, check:

```text
packages/types/
```

## 5. Duplicating Supabase clients

Check:

```text
packages/supabase/
```

before creating a new client.

## 6. Client-side-only code in server components

If a component uses browser APIs or React client hooks, mark it as a client component and keep the client boundary as small as practical.

## 7. Weakening RLS to fix an application error

A Supabase permission error should trigger an investigation of:

- current user/session
- table RLS
- policy conditions
- Supabase client type
- operation being performed

Do not make a table public just to bypass an authorization problem.

---

# Preferred Agent Workflow

When given a task:

### Step 1 — Locate the feature

Determine whether the task belongs to:

```text
apps/web
apps/admin
packages/ui
packages/types
packages/supabase
packages/assets
```

### Step 2 — Inspect existing code

Find existing:

- components
- services
- types
- Supabase queries
- shared UI
- route/layout behavior

Reuse existing patterns.

### Step 3 — Identify dependencies

If changing a shared package, inspect both consumers.

If changing database behavior, inspect the shared Supabase types and related service code.

### Step 4 — Implement the smallest correct change

Avoid unrelated refactors.

### Step 5 — Validate

Run appropriate lint/build commands.

### Step 6 — Report important side effects

If a change requires:

- an environment variable
- an RLS policy
- a migration
- a Tailwind configuration update
- a dependency update
- a change in both applications

state that explicitly.

---

# Current Architectural Principle

The most important architectural rule for this repository is:

```text
Applications contain application-specific behavior.
Packages contain reusable behavior.
```

In particular:

```text
apps/web
    ↓
public website behavior

apps/admin
    ↓
administrative behavior

packages/ui
    ↓
shared UI

packages/types
    ↓
shared domain types

packages/supabase
    ↓
shared Supabase integration

packages/assets
    ↓
shared static assets
```

Maintain this separation as the project grows.
