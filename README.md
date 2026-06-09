# leadextract-mvp

A Next.js web app (MVP) for exporting leads from LinkedIn Sales Navigator
without the platform's monthly export cap. Users sign up, store an (encrypted)
LinkedIn session cookie, and run export jobs. Authentication and data live in
Supabase (Postgres); Stripe handles subscription billing; the stored LinkedIn
cookie is encrypted at rest with AES.

> Status: MVP. Some flows (e.g. LinkedIn session handling) use simplified
> demo logic and are marked as such in the code — not production-hardened.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- Tailwind CSS
- [Supabase](https://supabase.com/) (`@supabase/supabase-js`) — auth + Postgres
- [Stripe](https://stripe.com/) — subscription billing
- `crypto-js` — AES encryption of stored LinkedIn cookies

## Install & run

```bash
npm install
cp .env.local.example .env.local   # fill in Supabase / Stripe / ENCRYPTION_KEY
npm run dev                         # http://localhost:3000
```

The app degrades gracefully when Supabase env vars are absent (a mock client is
returned at build time), so `npm run build` works without secrets.

Apply the database schema (`db/schema.sql`) to your Supabase project before
using auth/export features. See `DEPLOYMENT.md` and `ONE_CLICK_DEPLOY.md` for
Vercel + Supabase setup.

## Scripts

```bash
npm run dev     # local dev server
npm run build   # production build
npm start       # serve the production build
npm run lint    # next lint
```

## Project structure

```text
app/
  page.tsx                    # marketing / landing page
  login/, signup/             # auth pages
  dashboard/                  # authed dashboard + setup
  api/
    health/route.ts           # health check (reports DB status)
    auth/signup, auth/login   # auth endpoints
    auth/linkedin/session     # store encrypted LinkedIn cookie
  lib/
    supabase/client.ts        # Supabase browser + admin clients
    encryption/crypto.ts      # AES encrypt/decrypt + hashing
db/schema.sql                 # Postgres schema (users, sessions, jobs, leads)
```

## Configuration

Required env vars (see `.env.local.example`): `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ENCRYPTION_KEY`
(32-byte base64), and Stripe keys if billing is enabled.

## License

MIT — see `LICENSE`.
