# Quality Gates

This project uses layered quality gates: local hooks, PR checks (fast), and main/nightly full regression.

## Gate matrix

| Gate              | Command / job                                                                       | Runs on                                      |
| ----------------- | ----------------------------------------------------------------------------------- | -------------------------------------------- |
| **Static**        | `npm run verify:static` (includes `test:unit`)                                      | PR, push, nightly, pre-push hook             |
| **SUT health**    | `npm run verify:sut`                                                                | PR, push, nightly (before browser tests)     |
| **PR tests**      | `verify:api` + `verify:smoke` (+ wishlist if secrets)                               | PR only — **single job** (no sharding)       |
| **Full**          | `playwright test --shard=1/2` and `--shard=2/2` (or with `--grep-invert @wishlist`) | Push to `main`/`master`, nightly — **2 VMs** |
| **Merge reports** | `playwright merge-reports` from shard blob artifacts                                | After `test-full` (push / nightly)           |

Workflow file: [.github/workflows/quality-gates.yml](../.github/workflows/quality-gates.yml)

**Design intent:** PRs get fast feedback (~5–15 min with browser cache). Full regression runs on merge to `main` and nightly — not duplicated on every PR job. Full suite uses Playwright `--shard` across **two** GitHub-hosted runners (`fail-fast: false`); blob reports are merged into one HTML artifact.

**Browser cache:** `~/.cache/ms-playwright` is keyed by the runner image (`ImageOS`, such as `ubuntu24` or `ubuntu26`) and `package-lock.json`. `runner.os` is `Linux` on every Ubuntu image, so a WebKit build cached on 24.04 would be restored on 26.04 and fail at launch (`libicuuc.so.74`, `libxml2.so.2`). There is no `restore-keys` prefix that drops the image.

Supporting scripts:

| Script                                   | Purpose                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `scripts/sut-health-check.mjs`           | HEAD/GET preflight against `BASE_URL` (retries, IPv4-first on CI)                                 |
| `scripts/verify-wishlist-credentials.sh` | Informational notice when credentials missing; workflow gates wishlist via `wishlist-secrets` job |

## Test tags

| Tag         | Purpose                                | Specs                                                                             |
| ----------- | -------------------------------------- | --------------------------------------------------------------------------------- |
| `@smoke`    | Fast PR UI/API signal                  | See [smoke inventory](#smoke-test-inventory) below                                |
| `@wishlist` | Authenticated flows (need credentials) | `WishListFlow.spec.ts`, `auth.setup.ts`, `StorageStateDemo.spec.ts` (see ADR-008) |
| `@mock`     | Browser `route.fulfill` demos          | `NetworkMockDemo.spec.ts` (ADR-009) — not part of smoke                           |

Run tagged subsets:

```sh
npm run verify:smoke
npm run verify:wishlist
npx playwright test --grep "@mock"
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
- Full Playwright suite (1/2)
- Full Playwright suite (2/2)
- Merge Playwright reports

Optional: do **not** block PR merge on the full-suite / merge-report jobs — let those run post-merge and on nightly only.

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

Scheduled at **05:00 UTC** every Monday (`cron: '0 5 * * 1'`). Same as push to `main`: sharded full suite when secrets exist; otherwise `--grep-invert @wishlist` on each shard.

## Sharding (full suite only)

| Concern   | Behavior                                                                                                                   |
| --------- | -------------------------------------------------------------------------------------------------------------------------- |
| Scope     | `test-full` matrix `shard: [1/2, 2/2]` only — PR job stays single-VM                                                       |
| Reporter  | CI uses `blob` + `github` (`playwright.config.ts`); merge job builds HTML                                                  |
| Artifacts | Per-shard `blob-report-*` (1 day); merged `playwright-report` (30 days); failed `test-results-*`                           |
| Local     | Do **not** shard for normal runs — use `npm run verify` / `verify:full`. Optional debug: `npx playwright test --shard=1/2` |

Workers stay at `1` in CI to limit load on the shared demo SUT; sharding scales **across machines**, not in-process parallelism.

## Operational notes

- Live SUT dependency: see README “System under test (SUT)”.
- CI uses `retries: 2` and `workers: 1` (`playwright.config.ts` when `CI=true`).
- Failed shard jobs upload `test-results-*`; merged HTML report is uploaded by **Merge Playwright reports**.
- Typecheck runs root `tsc --noEmit` only; `pw-core` is validated via `npm run build` (included in `verify:static`).
- Playwright **1.61.1** pinned across root, `pw-core`, and Docker (`v1.61.1-jammy`).

## Related ADRs

- [adr/005-layered-quality-gates.md](adr/005-layered-quality-gates.md)
- [adr/002-ci-wishlist-credentials.md](adr/002-ci-wishlist-credentials.md)
