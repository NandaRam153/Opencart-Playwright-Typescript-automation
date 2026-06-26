# ADR 002: CI fail-fast for wishlist E2E credentials

**Status:** Accepted  
**Date:** 2026-06-26

## Context

The wishlist E2E test (`src/tests/e2e/WishListFlow.spec.ts`) requires a registered OpenCart demo user. Previously it used `test.skip()` when credentials were missing, which allowed CI to pass without exercising the only authenticated flow.

## Decision

- **Local runs:** If `TEST_USER_EMAIL` / `TEST_USER_PASSWORD` are unset or equal to `.env.example` placeholders, the wishlist test **skips** with an explanatory message.
- **CI runs (`CI=true`):** Missing or placeholder credentials cause an **immediate workflow failure** via:
  1. A GitHub Actions step that validates secrets before Playwright runs.
  2. `assertWishlistCredentialsInCi()` in `features/auth/state/credentials.ts` as a secondary guard.

Credential resolution for tests is centralized in `features/auth/testHelpers/wishlistCredentials.ts` (`resolveWishlistCredentialsForTest()`).

## Consequences

**Positive**

- CI signal reflects true coverage; no silent omission of authenticated E2E.
- Local developers without credentials are not blocked.

**Negative**

- Forks and PRs from contributors without configured secrets will fail CI until secrets are added or the workflow is adjusted.
- Docker runs with `CI=true` also require valid credentials in `.env` or environment.

## Configuration

Repository secrets: `TEST_USER_EMAIL`, `TEST_USER_PASSWORD` (Settings → Secrets and variables → Actions).
