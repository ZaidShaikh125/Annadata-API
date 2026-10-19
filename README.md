# Annadata API

Canonical NestJS + PostgreSQL backend for Annadaata mobile and internal admin applications.

## Current foundation

- Versioned API prefix: `/api/v1`
- PostgreSQL persistence through TypeORM with migrations in `database/migrations/`
- Microsoft Entra access-token validation for admin session exchange
- Approved-admin allowlist keyed by immutable Entra object ID
- Opaque server-side admin sessions with revocation
- Append-only administrative audit records
- Dashboard contract backed by canonical database aggregates
- Inventory invariant constraint: `reserved + collected + unavailable <= total`
- Swagger contract at `/docs` when the API is running

## Local setup

1. Copy `.env.example` to `.env` and provide a PostgreSQL `DATABASE_URL`.
2. Configure the Entra tenant, audience, and required scope.
3. Apply migrations through the deployment migration process; do not use TypeORM synchronization.
4. Install dependencies with `npm install`.
5. Run `npm run typecheck`, `npm run migration:validate`, and `npm run build`.

The API intentionally fails closed when database or Entra configuration is missing. It does not provide development admin bypasses or seed privileged accounts automatically.
