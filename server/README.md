# Tailr — Server

This is the Node/Express backend for Tailr. It uses TypeScript, Prisma (Postgres), and Clerk for auth.

Prerequisites

- Node.js 18+
- PostgreSQL (or a hosted Postgres instance)
- `npx` (comes with npm)

Local development

1. Clone the repo and change into the `server` folder:

```bash
git clone <repo-url>
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `server/` with at least the database connection string:

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
# other optional vars (Clerk keys, etc.)
```

4. Generate Prisma client (required before build/run):

```bash
npx prisma generate
```

5. Run migrations (if you use them) or push schema:

```bash
npx prisma migrate dev    # if you manage migrations
# or
npx prisma db push        # push schema without migrations
```

6. Run the server in development:

```bash
npm run dev
```

Production build & start

```bash
npm run build
npm start
```

Notes

- We generate the Prisma client into `src/generated` so the compiled `dist` contains the client. Ensure that `npx prisma generate` is run before `npm run build` in CI.
- If you prefer not to commit generated files, add `src/generated` and `dist/src/generated` to `.gitignore` and run `prisma generate` during CI/deploy.
