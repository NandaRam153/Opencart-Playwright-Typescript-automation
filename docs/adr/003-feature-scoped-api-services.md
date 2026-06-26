# ADR 003: Feature-scoped HTTP services

**Status:** Accepted  
**Date:** 2026-06-26

## Context

`OpenCartApiClient` combined catalog search, cart add, and static Playwright assertions in one class under `src/api/`. That mixed transport, domain behavior, and test assertions, and lived outside feature boundaries.

## Decision

Split HTTP integration by feature:

| Feature | Service | Assertions |
| ------- | ------- | ---------- |
| catalog | `CatalogService.searchHtml()` | `assertProductInHtml`, `assertNoSearchResults` |
| cart | `CartService.addProduct()` | `assertCartAddRejected` |

Shared pieces:

- Route constants: `shared/services/routes/openCartRoutes.ts`
- Response types: `shared/services/http/types.ts` (e.g. `CartAddResponse`)

API tests import services from feature barrels. Hybrid tests use `page.request` with `CartService` so browser session cookies stay aligned with UI verification.

## Consequences

**Positive**

- Services align with feature module ownership.
- Assertion helpers live beside the service they validate, not in presentation or a global client.
- `assertCartAddRejected` validates empty-array and error-payload rejection shapes.

**Negative**

- Two service classes instead of one; new HTTP domains need a new feature service (or extension of an existing one).

## Migration note

`OpenCartApiClient` and `src/api/` were removed. Use `CatalogService` / `CartService` and feature assertion helpers instead.
