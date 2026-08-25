# Quality Gates

This project uses layered quality gates: local hooks, PR checks (fast), and main/nightly full regression.

## Gate matrix

| Gate           | Command / job                                         | Runs on                                  |
| -------------- | ----------------------------------------------------- | ---------------------------------------- |
| **Static**     | `npm run verify:static` (includes `test:unit`)        | PR, push, nightly, pre-push hook         |
| **SUT health** | `npm run verify:sut`                                  | PR, push, nightly (before browser tests) |
| **PR tests**   | `verify:api` + `verify:smoke` (+ wishlist if secrets) | PR only — **single job**                 |
| **Full**       | `playwright test` (or `--grep-invert @wishlist`)      | Push to `main`/`master`, nightly         |

Workflow file: [.github/workflows/quality-gates.yml](../.github/workflows/quality-gates.yml)

**Design intent:** PRs get fast feedback (~5–15 min with browser cache). Full regression runs on merge to `main` and nightly — not duplicated on every PR job.

Supporting scripts:

| Script                                   | Purpose                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `scripts/sut-health-check.mjs`           | HEAD/GET preflight against `BASE_URL` (retries, IPv4-first on CI)                                 |
| `scripts/verify-wishlist-credentials.sh` | Informational notice when credentials missing; workflow gates wishlist via `wishlist-secrets` job |

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
npm run verify:static   # build + typecheck + lint + format:check + unit
npm run verify:sut      # HEAD request to BASE_URL
npm run verify:api      # API tests only
npm run verify:smoke    # @smoke tagged tests
npm run verify:wishlist # @wishlist (needs .env credentials locally or skips)
npm run test:unit       # Vitest extras (also included in verify:static)
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

**Pull requests (minimum — fast merge path)**

- Static analysis
- SUT health
- PR tests (API + smoke)

Do **not** require old job names (“API tests”, “Smoke tests”, “Wishlist E2E”) if you updated the workflow — they are combined into **PR tests (API + smoke)**. Wishlist runs as a step inside that job when secrets exist.

**After merge (push to main)**

- Static analysis
- SUT health
- Full Playwright suite

Optional: do **not** block PR merge on “Full Playwright suite” — let that run post-merge and on nightly only.

Configure at: **Settings → Branches → Branch protection rules → Require status checks**.

## Fork and contributor workflow

- Fork PRs **do not** receive repository secrets; the wishlist step is **skipped** inside PR tests.
- Static, SUT health, and PR tests still apply — sufficient for most changes.
- Maintainers merging to `main` trigger the **full suite** (with wishlist when secrets exist; otherwise `--grep-invert @wishlist`).

Details: [CONTRIBUTING.md](CONTRIBUTING.md). Credential policy: [adr/002-ci-wishlist-credentials.md](adr/002-ci-wishlist-credentials.md).

## ESLint layer enforcement

`eslint.config.mjs` enforces:

- Presentation / state / services cannot import sibling features.
- Presentation cannot import services.
- Tests cannot import internal layer paths — use feature barrels for **state and services only**.
- Tests cannot import **presentation classes** from feature barrels — use `POMFixture` / `ApiFixture` instead.

Details: [ARCHITECTURE.md](ARCHITECTURE.md#import-rules).

## Nightly regression

Scheduled at **06:00 UTC** daily (`cron: '0 6 * * *'`). Same as push to `main`: full suite when secrets exist; otherwise `--grep-invert @wishlist`.

## Operational notes

- Live SUT dependency: see README “System under test (SUT)”.
- CI uses `retries: 2` and `workers: 1` (`playwright.config.ts` when `CI=true`).
- Failed CI uploads `test-results/` and HTML report artifacts.
- Typecheck runs root `tsc --noEmit` only; `pw-core` is validated via `npm run build` (included in `verify:static`).
- Playwright **1.61.1** pinned across root, `pw-core`, and Docker (`v1.61.1-jammy`).

## Related ADRs

- [adr/005-layered-quality-gates.md](adr/005-layered-quality-gates.md)
- [adr/002-ci-wishlist-credentials.md](adr/002-ci-wishlist-credentials.md)
