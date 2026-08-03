# AgentCRM browser-only UI demo

A standalone static Next.js app for reviewing the CRM UI and interactions without provisioning any backend services.

## Properties

- No database or Prisma
- No authentication
- No API, agent, cron, Redis, or environment variables
- Hardcoded companies, contacts, deals, tasks, and activity
- Temporary deal creation uses React memory only
- Every refresh resets the demo
- Static export suitable for Vercel

## Local

```sh
cd demo
bun install
bun run dev
```

## Vercel

Create a separate Vercel project from this repository and set **Root Directory** to `demo`.

Vercel should detect Next.js automatically. Keep the default install and build commands. No environment variables are required.
