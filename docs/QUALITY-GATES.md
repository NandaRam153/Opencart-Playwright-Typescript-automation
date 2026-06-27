# Quality Gates

This project uses layered quality gates: local hooks, PR checks (fast), and main/nightly full regression.

## Gate matrix

| Gate           | Command / job                               | Runs on                                            |
| -------------- | ------------------------------------------- | -------------------------------------------------- |
| **Static**     | `npm run verify:static`                     | PR, push, nightly, pre-push hook                   |
| **SUT health** | `npm run verify:sut`                        | PR, push, nightly (before browser tests)           |
| **API**        | `npm run verify:api`                        | PR only                                            |
| **Smoke**      | `npm run verify:smoke` (`@smoke` tag)       | PR only                                            |
| **Wishlist**   | `npm run verify:wishlist` (`@wishlist` tag) | Same-repo PRs with secrets; always on push/nightly |
| **Full**       | `npm run verify:full`                       | Push to `main`/`master`, nightly schedule          |

Workflow file: [.github/workflows/quality-gates.yml](../.github/workflows/quality-gates.yml)

Supporting scripts:

| Script                                   | Purpose                                 |
| ---------------------------------------- | --------------------------------------- |
| `scripts/sut-health-check.mjs`           | HEAD preflight against `BASE_URL`       |
| `scripts/verify-wishlist-credentials.sh` | Fail-fast credential check in CI/Docker |

## Test tags

| Tag         | Purpose                                | Specs                                              |
| ----------- | -------------------------------------- | -------------------------------------------------- |
| `@smoke`    | Fast PR UI/API signal                  | See [smoke inventory](#smoke-test-inventory) below |
| `@wishlist` | Authenticated flow (needs credentials) | `WishListFlow.spec.ts`                             |

Run tagged subsets:

```sh
npm run verify:smoke
npm run verify:wishlist
npx playwright test --grep @smoke
```

### Smoke test inventory

| File                                                      | Tag location |
| --------------------------------------------------------- | ------------ |
| `src/tests/functional/HomePageFunctionalityCheck.spec.ts` | test         |
| `src/tests/api/CartAdd.spec.ts`                           | test         |
| `src/tests/api/StoreRoutes.spec.ts`                       | describe     |
| `src/tests/integration/TabletsCategory.spec.ts`           | describe     |
| `src/tests/hybrid/CartApiToUi.spec.ts`                    | test         |
| `src/tests/hybrid/LoginNegative.spec.ts`                  | test         |
| `src/tests/e2e/OrderCreation.spec.ts`                     | test         |

**Total:** 8 tests (3 API + 5 browser).

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

Full checklist: [VERIFICATION.md](VERIFICATION.md).

## Git hooks (Husky)

| Hook           | Action                                            |
| -------------- | ------------------------------------------------- |
| **pre-commit** | `lint-staged` — ESLint + Prettier on staged files |
| **pre-push**   | `npm run verify:static`                           |

Install hooks after clone: `npm ci` (runs `prepare` → Husky).

`lint-staged` config in `package.json`:

- `*.{ts,mjs,js}` → ESLint fix + Prettier
- `*.{json,md,yml,yaml}` → Prettier

## Branch protection (GitHub settings)

Require these checks before merging to `main` / `master`:

**Pull requests**

- Static analysis
- SUT health
- API tests
- Smoke tests (@smoke)
- Wishlist E2E (@wishlist) — optional if secrets configured; skipped on fork PRs

**Direct push / nightly**

- Static analysis
- SUT health
- Full Playwright suite

Configure at: **Settings → Branches → Branch protection rules → Require status checks**.

## Fork and contributor workflow

- Fork PRs **do not** receive repository secrets; the Wishlist job is **skipped** when `head.repo != base.repo`.
- Static, SUT health, API, and smoke gates still apply — sufficient for most changes.
- Maintainers merging to `main` trigger the **full suite** including wishlist (secrets required on push).

Details: [CONTRIBUTING.md](CONTRIBUTING.md).

## Nightly regression

Scheduled at **06:00 UTC** daily (`cron: '0 6 * * *'`). Runs the same gates as push to `main`: full Playwright suite against the live demo store.

## Operational notes

- Live SUT dependency: see README “System under test (SUT)”.
- CI uses `retries: 2` and `workers: 1` (`playwright.config.ts` when `CI=true`).
- Failed CI uploads `test-results/` and HTML report artifacts.
- Typecheck runs root `tsc --noEmit` only; `pw-core` is validated via `npm run build` (included in `verify:static`).

## Related ADRs

- [adr/005-layered-quality-gates.md](adr/005-layered-quality-gates.md)
- [adr/002-ci-wishlist-credentials.md](adr/002-ci-wishlist-credentials.md)
