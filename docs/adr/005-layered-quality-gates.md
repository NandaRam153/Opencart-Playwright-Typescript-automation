# ADR 005: Layered quality gates (CI, tags, Husky)

**Status:** Accepted  
**Date:** 2026-06-26

## Context

The project previously used a single GitHub Actions workflow that ran typecheck, lint, credential validation, and the full Playwright suite on every push and PR. That model was slow for PR feedback and did not distinguish fast signal (static + API + smoke) from full regression.

## Decision

Introduce **layered quality gates**:

| Gate       | Mechanism                                                         | When                                                   |
| ---------- | ----------------------------------------------------------------- | ------------------------------------------------------ |
| Static     | `npm run verify:static` (build + typecheck + lint + format:check) | PR, push, nightly, pre-push hook                       |
| SUT health | `npm run verify:sut` (`scripts/sut-health-check.mjs`)             | Before browser tests in CI                             |
| API        | `npm run verify:api`                                              | PR only                                                |
| Smoke      | `npm run verify:smoke` (`@smoke` Playwright tag)                  | PR only                                                |
| Wishlist   | `npm run verify:wishlist` (`@wishlist` tag)                       | Same-repo PRs with secrets; full suite on push/nightly |
| Full       | `npm run verify:full`                                             | Push to `main`/`master`, nightly cron                  |

Implementation:

- Workflow: [.github/workflows/quality-gates.yml](../../.github/workflows/quality-gates.yml)
- Documentation: [docs/QUALITY-GATES.md](../QUALITY-GATES.md)
- Local hooks: Husky `pre-commit` (`lint-staged`), `pre-push` (`verify:static`)

PR-equivalent local command: `npm run verify`.

## Consequences

**Positive**

- Faster PR feedback (8 smoke + 3 API vs 22 full tests).
- Clear mapping from job names to branch protection rules.
- Fork PRs skip wishlist job without failing when secrets are unavailable.

**Negative**

- Maintainers must configure branch protection with the new job names.
- Contributors need to understand `@smoke` vs full suite coverage.

## Compliance

- Smoke tag applied to: home functional, API suite, Tablets integration, hybrid cart/login, order E2E.
- Wishlist tag applied to: `WishListFlow.spec.ts` only.
- `seed.spec.ts` remains excluded via `testIgnore`.
