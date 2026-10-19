# Annadaata Admin security hardening

## Enforced controls

- Microsoft Entra access tokens are checked for issuer, tenant, audience, lifetime, required API scope, and immutable `oid`.
- Entra identities must also exist in the active internal administrator allowlist.
- Browser-facing code receives only an opaque server-side session identifier. The Admin API accepts that session only as a Bearer credential, preventing cookie-based CSRF against API endpoints.
- Session revocation is authenticated; the former arbitrary unauthenticated revocation route no longer exists.
- Global DTO validation rejects unknown properties and invalid enum/UUID/date values.
- Global rate limiting, security headers, private no-store Admin responses, request IDs, and restricted CORS are enabled.
- Role assignment uses a controlled ten-role catalog. Administrators cannot change their own roles or suspend themselves, and the last active Super Administrator is protected.
- Sensitive exports are owner-scoped unless `reports.export.all` is granted, expire, and are delivered through an authenticated endpoint.
- Internal support notes are stored with `internal` visibility and are never included in mobile outbox payloads.
- Mobile configuration is versioned, size-limited, restricted to supported fields, and rejects executable content.
- Critical writes persist audit and outbox rows in the same database transaction.
- Workers claim rows with PostgreSQL pessimistic locking and `SKIP LOCKED`, retry with exponential backoff, and dead-letter after the configured attempt limit.
- Event dispatch uses an event ID plus HMAC-SHA256 signature. Secrets and full sensitive payloads are not exposed by operations APIs.

## Automated evidence

- Wrong tenant, missing API scope, absent allowlist, cookie credential rejection, wildcard RBAC, self-role modification, mobile executable configuration, DTO validation, and guarded Support HTTP routes are covered by Jest.
- Unauthenticated redirect, fail-closed Entra setup, and logout-cookie removal are covered by Playwright on desktop and mobile Chromium.
- Migration syntax/order, TypeScript, production builds, and production dependency severity are checked separately.

## Environment-dependent checks

Run `npm run migration:run` with the dedicated migration credential, followed by `npm run env:verify`. The verifier checks required PostgreSQL tables, database connectivity, the configured Entra tenant discovery issuer, and signing-key availability without printing secrets.

MFA/Conditional Access policy, real token exchange, production provider delivery, storage durability, backups, alerts, and database monitoring must be verified in the deployment environment. They cannot be truthfully certified from a checkout without its credentials and infrastructure.
