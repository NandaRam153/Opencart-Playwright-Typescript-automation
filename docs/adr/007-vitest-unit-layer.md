# ADR 007: Vitest unit layer for pure state helpers

**Status:** Accepted  
**Date:** 2026-08-25

## Context

Playwright specs under `src/tests/` already cover UI, API, hybrid, and E2E behavior. A few feature **state** helpers (`requireProductId`, `requireCategory`, `getSearchTerm`, `getWishlistCredentials`, `assertWishlistCredentialsInCi`) have branching that is awkward to assert only through the browser. `packages/pw-core` remains Playwright-bound (`BasePage`, `Wait`, assertions) and does not need a second runner.

## Decision

Add **Vitest** as extra coverage for pure functions only:

| Concern          | Location                                                 |
| ---------------- | -------------------------------------------------------- |
| Unit tests       | `src/unit/<feature>/*.unit.test.ts`                      |
| Playwright tests | `src/tests/<layer>/*.spec.ts`                            |
| Runner           | `npm run test:unit` (`vitest run`)                       |
| Gate             | Included in `npm run verify:static` (no SUT, no browser) |

Unit tests import helpers from feature barrels (`src/features/catalog`, `src/features/auth`), not `presentation/` or `state/` internals. Page objects, HTTP services, and `pw-core` stay Playwright-only.

## Consequences

**Positive**

- Fast, deterministic checks for catalog ID/category guards and wishlist credential policy (ADR-002).
- Playwright `testDir` stays `./src/tests`; Vitest files cannot be mistaken for E2E specs.

**Negative**

- A second test runner and `vitest` devDependency to keep current.

## Compliance

- Do not place `*.unit.test.ts` under `src/tests/`.
- Do not unit-test page objects or `packages/pw-core` without a Playwright `page`.
