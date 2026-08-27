# Meubelia Storefront

Next.js 16 frontend for the Meubelia e-commerce platform — customer storefront
and admin dashboard UI. It consumes the Laravel REST API from the separate
`meubelia_back` repository and owns presentation only.

See [CLAUDE.md](CLAUDE.md) for the full architecture and engineering guidelines.

## Requirements

- Node.js 20+
- A running Meubelia API (default `http://localhost:8000`)

## Setup

```sh
npm install
cp .env.example .env.local
npm run dev                  # http://localhost:3000
```

## Checks

```sh
npm run typecheck
npm run lint
npm run build
```

## Conventions

- **API access** goes through `src/lib/api.ts`. Do not call `fetch` against the
  backend from components; add feature-specific helpers on top of `apiFetch`.
  Failures throw `ApiError`, which carries the HTTP status and field errors.
- **Types** for the API envelope live in `src/types/api.ts` and mirror
  `App\Support\ApiResponse` in the backend.
- **Configuration** is read through `src/lib/env.ts`. Only values that are safe
  to ship to the browser may use the `NEXT_PUBLIC_` prefix — never a secret.
- **Server Components by default.** Add `"use client"` only where client-side
  behaviour genuinely requires it.
