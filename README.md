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
- Support, reports/exports, internal-team, settings, mobile-config, job, failed-event, health, and audit APIs
- Transactional outbox delivery with signed webhook dispatch, exponential retry, and dead-letter state
- Asynchronous report generation and permission-protected CSV downloads

## Local setup

1. Copy `.env.example` to `.env` and provide a PostgreSQL `DATABASE_URL`.
2. Configure the Entra tenant, audience, and required scope.
3. Apply migrations with a dedicated DDL credential: `npm run migration:run`. The runner records checksums and rejects changed applied migrations. Do not use TypeORM synchronization.
4. Install dependencies with `npm install`.
5. Run `npm run env:verify` to verify the real database schema plus Entra tenant discovery and signing keys.
6. Run `npm run typecheck`, `npm run migration:validate`, `npm test`, and `npm run build`.

The one-time first-Super-Admin bootstrap requires the explicit `BOOTSTRAP_*` values and `BOOTSTRAP_CONFIRM=CREATE_FIRST_SUPER_ADMIN`, then `npm run admin:bootstrap`. It refuses to run once an active Super Administrator exists.

Published mobile configuration is available from `GET /api/v1/mobile/config?platform=android&audience=all`. Only data-only, size-limited, versioned configuration is accepted. Event delivery requires `EVENT_DISPATCH_URL` and `EVENT_DISPATCH_SECRET`; missing provider configuration results in retry/dead-letter state rather than false success.

The API intentionally fails closed when database or Entra configuration is missing. It does not provide development admin bypasses or seed privileged accounts automatically.
