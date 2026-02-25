# Tailr

[![TypeScript](https://img.shields.io/badge/TypeScript-%5E5.0-blue?logo=typescript)](https://www.typescriptlang.org/) [![Node.js](https://img.shields.io/badge/Node-18.x-green?logo=node.js)](https://nodejs.org/) [![Prisma](https://img.shields.io/badge/Prisma-7.x-2bbc8a?logo=prisma)](https://www.prisma.io/) [![Postgres](https://img.shields.io/badge/Postgres-13+-blue?logo=postgresql)](https://www.postgresql.org/)

> Tailr is a desktop-first resume/CV builder: a React/Vite frontend paired with a TypeScript Express backend (Prisma + Postgres). This repository highlights production-ready backend engineering: typed DB access, connection pooling, auth integration, layered services, and operational build strategies.

![demo](https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif)

---

## Why this project (backend focus)

- Demonstrates practical backend engineering: TypeScript-driven safety, Prisma schema design, a custom DB adapter with `pg.Pool` to manage connections, and a build strategy that keeps Prisma client resolution predictable across dev and prod.
- Shows tradeoffs and pragmatic choices: JSON payloads for flexible CV content, generated Prisma client location for reliable compiled outputs, and middleware-based concerns (auth, rate-limiting, validation).

---

## Tech stack

- Backend: Node.js, Express, TypeScript
- ORM: Prisma (Postgres) with `@prisma/adapter-pg` and `pg` pooling
- Auth: Clerk
- Frontend: React + Vite (context), Redux
- Notifications (client): react-toastify

---

## Architecture

- Monorepo: `client/` (frontend) and `server/` (backend).
- Server layout (src):
  - `src/server.ts`, `src/app.ts` — app bootstrap and route mounting
  - `src/lib/prisma.ts` — Prisma client factory handling dev vs compiled locations and pooling
  - `src/middleware/*` — auth, rate limiting, and helpers
  - `src/modules/*` — domain folders (controllers → services → repositories)
  - `src/generated/prisma` — generated Prisma client (compiled into `dist/src/generated/prisma`)

Request flow (example: update CV):

1. Express route receives request and runs middleware (auth, rate limit).
2. Controller validates input and calls appropriate service.
3. Service orchestrates business logic and calls repository.
4. Repository uses Prisma client to interact with Postgres.

---

## Prisma & build strategy

- We generate the Prisma client into `server/src/generated/prisma` during development so `tsc` compiles it into `dist/src/generated/prisma` for production.
- `src/lib/prisma.ts` attempts to load the generated client from several locations (compiled and source) and falls back to `@prisma/client` where appropriate. This pattern keeps runtime import paths robust across `ts-node` dev and compiled `dist` production.
- CI recommendation: run `npx prisma generate` before `npm run build` (or add it into the `build` script) to ensure generated client is present.

---

## Setup & Run (local development)

Prereqs: Node 18+, PostgreSQL

Server:

```bash
cd server
npm install
# set server/.env with DATABASE_URL and Clerk keys
npx prisma generate
npx prisma migrate dev   # or `npx prisma db push` for quick iteration
npm run dev
```

Client:

```bash
cd client
npm install
# set VITE_CLERK_PUBLISHABLE_KEY in client/.env
npm run dev
```

Production build (server):

```bash
cd server
npx prisma generate
npm run build
npm start
```

Example `server/.env`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/tailr_dev
CLERK_SECRET=pk_test_XXXXXXXXXXXXXXXX
```

---

## APIs & data model (summary)

- Important endpoints:
  - `GET /api/cvs` — list the authenticated user's CVs
  - `GET /api/cvs/:id` — retrieve a single CV owned by the user
  - `POST /api/cvs` — create a new CV (owner = authenticated user)
  - `PATCH /api/cvs/:id` — update CV content (owner-checked)
  - `DELETE /api/cvs/:id` — delete CV (owner-checked)

- Data model (Prisma):
  - `User` (id, firstName, lastName, email, clerkId, timestamps)
  - `Cv` (id, userId, name, jobTitle, company, content: Json, timestamps)

Design note: storing `content` as JSON gives frontend flexibility for templates/sections while preserving relational owners and indexes.

---

## Security, validation & reliability

- Auth: Clerk integration enforces identity; middleware extracts `clerkUserId` for downstream checks.
- Authorization: services/repositories confirm `userId` ownership prior to mutations.
- Rate limiting & global guards protect endpoints from abuse.
- Input validation occurs at controller/service boundaries; Prisma ensures parameterized queries to avoid injection.

---

## Observability & scaling

- Logging: critical errors and lifecycle events are logged — swap in pino/winston for structured logs.
- Metrics: instrument controllers/services for request durations, DB latency; export Prometheus metrics in production.
- Scaling: keep app stateless; use connection pooling (`pg.Pool`) and consider PgBouncer for large horizontal scale to avoid DB connection limits.

---

## Tests & CI

- Add unit tests for services and repositories (Jest/Vitest) and integration tests for routes (supertest).
- CI recommended steps:
  1.  `npm ci`
  2.  `npx prisma generate`
  3.  `npm run build`
  4.  `npm test`

Suggested `server` `package.json` build script for CI:

```json
"scripts": {
	"build": "npx prisma generate && tsc"
}
```

---

## Key accomplishments & interview topics

- Implemented a robust Prisma generation and resolution strategy to support both dev and compiled runtimes.
- Used `pg.Pool` + `PrismaPg` to manage Postgres connections safely in cloud environments.
- Enforced auth & authorization with Clerk and service-layer ownership checks.
- Built a modular `controller → service → repository` structure for maintainability and testability.
- Added operational concerns: rate limiting, error handling, and build-time generation for production predictability.

Interview prompts you can discuss:

1. Explain the `prisma.ts` runtime resolution approach and why it's needed.
2. Discuss Postgres pooling strategies and why PgBouncer or `pg.Pool` matters for scaling.
3. Walk through how you validate and authorize a CV update request.
4. Compare storing CV content as JSON vs normalized tables.
5. Outline how you'd add tracing and Prometheus metrics to this app.

---

## Contributing

- Open issues for bugs or feature requests.
- Send PRs with tests and a clear description of changes.

---

## License

This repository is provided as-is. Add a license file if you intend to publish.
