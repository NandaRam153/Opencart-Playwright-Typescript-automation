# Verification checklist

Use this checklist before opening a PR or after significant refactors. Commands assume the repo root and a reachable SUT (`BASE_URL`, default `https://awesomeqa.com/ui/`).

## Quick PR-equivalent run

```sh
npm run verify
```

Runs: `verify:static` → `verify:sut` → `verify:api` → `verify:smoke`.

## Full local regression

```sh
npm run verify:full
```

Runs static checks, SUT health, then the full Playwright suite (22 tests; `seed.spec.ts` excluded).

## Step-by-step

| Step                    | Command                   | What it validates                                           |
| ----------------------- | ------------------------- | ----------------------------------------------------------- |
| 1. Lint                 | `npm run lint`            | ESLint + layer boundary rules (`eslint.config.mjs`)         |
| 2. Typecheck            | `npm run typecheck`       | Root project TypeScript (`tsc --noEmit`)                    |
| 3. Unit / library build | `npm run build`           | `@opencart-auto/pw-core` compiles (`packages/pw-core`)      |
| 4. Format               | `npm run format:check`    | Prettier (included in `verify:static`)                      |
| 5. SUT health           | `npm run verify:sut`      | HEAD request to `BASE_URL` (`scripts/sut-health-check.mjs`) |
| 6. API tests            | `npm run verify:api`      | 3 HTTP specs in `src/tests/api/`                            |
| 7. Smoke E2E            | `npm run verify:smoke`    | 8 `@smoke`-tagged specs                                     |
| 8. Wishlist E2E         | `npm run verify:wishlist` | `@wishlist` spec (needs `.env` credentials locally)         |

### Unit tests

There is **no separate Jest/Vitest suite**. The `pw-core` workspace package is the shared library under test:

- **Compile gate:** `npm run build` (also runs on `postinstall` and `pretest`).
- **Behavior gate:** Playwright specs exercise assertions, `Wait`, and page objects indirectly.

## Smoke test inventory (`@smoke`)

| Spec                                 | Layer       | Covers (refactored components)                                   |
| ------------------------------------ | ----------- | ---------------------------------------------------------------- |
| `HomePageFunctionalityCheck.spec.ts` | functional  | `HomePage`, `Header`, `Footer`, `Ribbon`                         |
| `StoreRoutes.spec.ts` (×2)           | api         | `CatalogService`                                                 |
| `CartAdd.spec.ts`                    | api         | `CartService`, cart assertions                                   |
| `TabletsCategory.spec.ts`            | integration | `Ribbon`, `ProductListingPage`                                   |
| `CartApiToUi.spec.ts`                | hybrid      | `CartPage`, `Header`, `sessionCartService`                       |
| `LoginNegative.spec.ts`              | hybrid      | `LoginPage`, auth state                                          |
| `OrderCreation.spec.ts`              | e2e         | Full guest checkout (`CheckoutPage`, `OrderPlacementResultPage`) |

Tagged subsets: see [QUALITY-GATES.md](QUALITY-GATES.md).

## Accessibility and responsive behavior

Automated smoke tests use **role- and label-based locators** (`getByRole`, `getByPlaceholder`, `getByTitle`) aligned with accessibility best practices. There is no dedicated axe-core integration in CI today.

### Manual / exploratory checks (affected components)

When changing **home**, **catalog**, **checkout**, or **auth** presentation:

| Viewport | Width × height | What to verify                                                                        |
| -------- | -------------- | ------------------------------------------------------------------------------------- |
| Desktop  | 1280 × 720     | Header search, cart, checkout, wishlist, ribbon category links                        |
| Tablet   | 768 × 1024     | Ribbon navigation, product listing headings                                           |
| Mobile   | 375 × 667      | Header cart/checkout/wishlist; ribbon categories may collapse (OpenCart SUT behavior) |

**Login page:** email field, password field, and Login button should be discoverable via roles at desktop width.

**Known SUT limitations (not regressions from this repo):**

- Mobile: ribbon category links are hidden until the store menu expands.
- Some product **Add to Cart** buttons lack an accessible name at certain widths; tests scope to product cards where needed.

Use [IronBee DevTools](https://marketplace.visualstudio.com/) (browser MCP) or Playwright trace viewer for interactive a11y snapshots when debugging.

## CI parity

GitHub Actions workflow: [.github/workflows/quality-gates.yml](../.github/workflows/quality-gates.yml).

| Event                     | Jobs                                                                  |
| ------------------------- | --------------------------------------------------------------------- |
| Pull request              | Static → SUT → API + smoke (+ wishlist on same-repo PRs with secrets) |
| Push to `main` / `master` | Static → SUT → full suite                                             |
| Nightly 06:00 UTC         | Same as push to main                                                  |

## When verification fails

| Failure             | Likely cause                                                                           |
| ------------------- | -------------------------------------------------------------------------------------- |
| `verify:sut`        | Demo store down or network blocked                                                     |
| API / smoke timeout | SUT latency; CI uses `retries: 2`, `workers: 1`                                        |
| Wishlist (CI)       | Missing or placeholder `TEST_USER_EMAIL` / `TEST_USER_PASSWORD` secrets                |
| `format:check`      | Run `npm run format` and commit                                                        |
| Layer ESLint        | Cross-feature or presentation→services import — see [ARCHITECTURE.md](ARCHITECTURE.md) |

Failed CI uploads `test-results/` traces and HTML reports as artifacts.
