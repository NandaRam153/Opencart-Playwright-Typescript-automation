# Quality Gates

This project uses layered quality gates: local hooks, PR checks (fast), and main/nightly full regression.

## Gate matrix

| Gate           | Command / job                               | Runs on                                            |
| -------------- | ------------------------------------------- | -------------------------------------------------- |
| **Static**     | `npm run verify:static`                     | PR, push, nightly, pre-push hook                   |
| **SUT health** | `npm run verify:sut`                        | PR, push, nightly (before browser tests)           |
| **API**        | `npm run verify:api`                        | PR only                                            |
| **Smoke**      | `npm run verify:smoke` (`@smoke` tag)       | PR only                                            |
| **Wishlist**   | `npm run verify:wishlist` (`@wishlist` tag) | PR when repo secrets exist; always on push/nightly |
| **Full**       | `npm run verify:full`                       | Push to `main`/`master`, nightly schedule          |

Workflow file: [.github/workflows/quality-gates.yml](../.github/workflows/quality-gates.yml)

## Test tags

| Tag         | Purpose                                | Specs                                                                               |
| ----------- | -------------------------------------- | ----------------------------------------------------------------------------------- |
| `@smoke`    | Fast PR UI/API signal                  | Functional home check, API suite, Tablets integration, hybrid cart/login, order E2E |
| `@wishlist` | Authenticated flow (needs credentials) | `WishListFlow.spec.ts`                                                              |

Run tagged subsets:

```sh
npm run verify:smoke
npm run verify:wishlist
npx playwright test --grep @smoke
```

## Local commands

```sh
npm run verify:static   # build + typecheck + lint + format:check
npm run verify:sut      # HEAD request to BASE_URL
npm run verify:api      # API tests only
npm run verify:smoke    # @smoke tagged tests
npm run verify:wishlist # @wishlist (needs .env credentials locally or skips)
npm run verify          # static + sut + api + smoke (PR-equivalent)
npm run verify:full     # static + sut + full Playwright suite
```

## Git hooks (Husky)

| Hook           | Action                                            |
| -------------- | ------------------------------------------------- |
| **pre-commit** | `lint-staged` — ESLint + Prettier on staged files |
| **pre-push**   | `npm run verify:static`                           |

Install hooks after clone: `npm ci` (runs `prepare` → Husky).

## Branch protection (GitHub settings)

Require these checks before merging to `main` / `master`:

**Pull requests**

- Static analysis
- SUT health
- API tests
- Smoke tests (@smoke)
- Wishlist E2E (@wishlist) — optional if secrets configured; skipped on forks without secrets

**Direct push / nightly**

- Static analysis
- SUT health
- Full Playwright suite

Configure at: **Settings → Branches → Branch protection rules → Require status checks**.

## Fork and contributor workflow

- Fork PRs **do not** receive repository secrets; the Wishlist job is skipped (not failed).
- Static, SUT health, API, and smoke gates still apply — sufficient for most changes.
- Maintainers merging to `main` trigger the **full suite** including wishlist (secrets required on push).

## Nightly regression

Scheduled at **06:00 UTC** daily (`cron: '0 6 * * *'`). Runs the same gates as push to `main`: full Playwright suite against the live demo store.

## Operational notes

- Live SUT dependency: see README “System under test (SUT)”.
- CI uses `retries: 2` and `workers: 1` (`playwright.config.ts` when `CI=true`).
- Failed CI uploads `test-results/` and HTML report artifacts.
