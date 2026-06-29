# ADR 002: CI wishlist E2E credentials

**Status:** Accepted (amended 2026-06-28)  
**Date:** 2026-06-26

## Context

The wishlist E2E test (`src/tests/e2e/WishListFlow.spec.ts`) requires a registered OpenCart demo user. Previously it used `test.skip()` when credentials were missing, which allowed CI to pass without exercising the only authenticated flow.

## Decision

### Local runs

If `TEST_USER_EMAIL` / `TEST_USER_PASSWORD` are unset or equal to `.env.example` placeholders, the wishlist test **skips** with an explanatory message (`resolveWishlistCredentialsForTest()` in `src/fixtures/wishlistCredentials.ts`).

### GitHub Actions ([quality-gates.yml](../../.github/workflows/quality-gates.yml))

| Event                        | Secrets configured | Wishlist behavior                                        |
| ---------------------------- | ------------------ | -------------------------------------------------------- |
| **Pull request** (same repo) | Yes                | `verify:wishlist` runs inside **PR tests (API + smoke)** |
| **Pull request** (same repo) | No                 | Wishlist step skipped; API + smoke still run             |
| **Pull request** (fork)      | N/A (no secrets)   | Wishlist step skipped                                    |
| **Push to main / nightly**   | Yes                | Full `playwright test` suite                             |
| **Push to main / nightly**   | No                 | `playwright test --grep-invert @wishlist` (21 tests)     |

The `wishlist-secrets` job probes repository secrets; `scripts/verify-wishlist-credentials.sh` is an informational notice when invoked — it does **not** fail the workflow.

### When CI fails on missing credentials

`assertWishlistCredentialsInCi()` in `features/auth/state/credentials.ts` throws when `CI=true` and the `@wishlist` test actually runs without valid credentials (e.g. Docker with `CI=true` and no `.env` credentials).

Credential resolution for tests lives in `src/fixtures/wishlistCredentials.ts`, invoked by the `wishlistCredentials` fixture in `POMFixture`.

## Consequences

**Positive**

- PRs get fast feedback without blocking on wishlist secrets.
- Main/nightly still runs full regression when secrets exist; otherwise runs all non-wishlist tests.
- Local developers without credentials are not blocked.
- Fork PRs do not fail for missing secrets.

**Negative**

- Push to main without secrets silently omits `@wishlist` until secrets are added (workflow notice only).
- Docker `CI=true` runs fail on wishlist if credentials are absent (by design — full suite in container).

## Configuration

Repository secrets: `TEST_USER_EMAIL`, `TEST_USER_PASSWORD` (Settings → Secrets and variables → Actions).
