# Opencart Playwright Typescript Automation

Automated functional, integration, and end-to-end (E2E) testing for the OpenCart demo store using Playwright and TypeScript.

## Features

- **Feature modules** (`src/features/`) with presentation / state / services separation
- Page Object Model (POM) per domain: home, catalog, cart, auth, checkout, wishlist
- Custom Playwright fixtures for page/component injection
- `@opencart-auto/pw-core` workspace package (base classes, `SoftAssertions`, `HardAssertions`, `Wait`)
- Layered tests: functional, integration, E2E, API, and API/UI hybrid
- Environment-based configuration (`BASE_URL`, credentials via `.env`)
- TypeScript strict mode, ESLint, and Prettier
- HTML test reports, traces on failure, Docker support
- Layered GitHub Actions CI ([`.github/workflows/quality-gates.yml`](.github/workflows/quality-gates.yml))

## Documentation

| Document                                                               | Description                                                         |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)                           | System design, Mermaid diagrams, feature map, import rules          |
| [docs/QUALITY-GATES.md](docs/QUALITY-GATES.md)                         | CI jobs, test tags, Husky hooks, branch protection                  |
| [docs/VERIFICATION.md](docs/VERIFICATION.md)                           | Pre-PR verification checklist (lint, build, API, smoke, a11y notes) |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)                           | Fork/PR workflow, layer rules, adding features                      |
| [docs/test-generation-from-seed.md](docs/test-generation-from-seed.md) | Seed file and generator showcase workflow                           |
| [docs/adr/README.md](docs/adr/README.md)                               | ADR index and architectural decisions                               |
| [specs/test.plan.md](specs/test.plan.md)                               | Test scenarios and step definitions                                 |

## Project Structure

```
├── src/
│   ├── features/                 # Independent feature modules
│   │   ├── catalog/              # state · services · presentation
│   │   ├── cart/
│   │   ├── auth/
│   │   ├── checkout/
│   │   ├── home/
│   │   └── wishlist/
│   ├── shared/                   # Cross-cutting routes and HTTP types
│   ├── fixtures/
│   │   ├── fixtureHelpers.ts     # pageObject / service fixture factories
│   │   ├── wishlistCredentials.ts # wishlist E2E credential resolution + local skip
│   │   ├── POMFixture.ts         # UI page objects + sessionCartService + wishlistCredentials
│   │   └── ApiFixture.ts         # cartService + catalogService (API)
│   └── tests/
│       ├── seed.spec.ts          # Generator scaffold (excluded from test runs)
│       ├── functional/           # UI smoke / audit tests
│       ├── integration/          # Cross-component flow tests
│       ├── e2e/                  # Full user journeys
│       ├── api/                  # Pure HTTP route tests (Playwright request)
│       └── hybrid/               # API setup + UI verification
├── docs/
│   ├── ARCHITECTURE.md           # Diagrams, feature map, layer rules
│   ├── QUALITY-GATES.md          # CI matrix, tags, Husky
│   ├── VERIFICATION.md           # Pre-PR verification checklist
│   ├── CONTRIBUTING.md           # Fork/PR workflow
│   ├── test-generation-from-seed.md
│   └── adr/                      # ADRs (see adr/README.md)
├── scripts/
│   ├── sut-health-check.mjs      # SUT HEAD preflight (verify:sut)
│   └── verify-wishlist-credentials.sh
├── .husky/                       # pre-commit (lint-staged), pre-push (verify:static)
├── packages/
│   └── pw-core/                  # Shared library: BasePage, assertions, Wait
├── specs/
│   └── test.plan.md              # Test plan and scenario documentation
├── playwright.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── .prettierrc
├── .env.example
├── Dockerfile
└── docker-compose.yml
```

### Layer rules (per feature module)

| Layer            | Responsibility                             | May import from                                                       |
| ---------------- | ------------------------------------------ | --------------------------------------------------------------------- |
| **presentation** | Page objects, locators, UI actions         | Same feature `state` only                                             |
| **state**        | Test data, path constants, env credentials | `shared` routes/types, pw-core models                                 |
| **services**     | HTTP calls, API assertions                 | `shared`, same feature `state`                                        |
| **tests**        | Orchestration                              | Feature barrels (state/services), fixtures — not presentation classes |

Features stay independent — tests compose flows through fixtures and feature barrel exports, not cross-feature internal imports. ESLint enforces layer boundaries (`eslint.config.mjs`). See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for diagrams and the full feature map.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Playwright](https://playwright.dev/) **1.61.1** (installed via `npm ci`; browsers via `npx playwright install chromium`)
- [Docker](https://www.docker.com/) (optional, for containerized runs)

## Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/NandaRam153/Opencart-Playwright-Typescript-automation.git
    cd Opencart-Playwright-Typescript-automation
    ```

2. Install dependencies (also builds `pw-core` via `postinstall`):

    ```sh
    npm install
    ```

3. Configure environment variables:

    ```sh
    cp .env.example .env
    ```

    On Windows (PowerShell):

    ```powershell
    Copy-Item .env.example .env
    ```

    Edit `.env` and set:
    - `BASE_URL` — optional; defaults to `https://awesomeqa.com/ui/`
    - `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` — required for wishlist E2E locally; optional in GitHub Actions (see [docs/adr/002-ci-wishlist-credentials.md](docs/adr/002-ci-wishlist-credentials.md))

## Running Tests

### Locally

| Command               | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `npm test`            | Run all tests headless (builds `pw-core` via `pretest`) |
| `npm run test:headed` | Run with visible browser                                |
| `npm run test:debug`  | Run in Playwright debug mode                            |
| `npm run report`      | Open the HTML report                                    |

The suite runs **22 tests** (`seed.spec.ts` is excluded via `testIgnore`; wishlist E2E skips without valid credentials).

#### Run a specific test file

```sh
npx playwright test src/tests/functional/HomePageFunctionalityCheck.spec.ts
```

#### Run a test by title

```sh
npx playwright test -g "Order creation test"
```

#### Debug a specific test

```sh
npx playwright test src/tests/e2e/WishListFlow.spec.ts --debug
```

### Docker

Runs the **full suite** (functional, integration, E2E, API, and hybrid tests) inside the Playwright container. Requires outbound network access to the OpenCart demo store (`BASE_URL`).

```sh
npm run test:docker          # Build image and run all tests
npm run test:docker:api      # API tests only (no browser UI)
npm run test:docker:hybrid   # API/UI hybrid tests only
npm run test:docker:debug    # Shell into the test container
npm run test:docker:compose  # Run via Docker Compose (mounts reports locally)
```

Or directly:

```sh
docker-compose up --build
```

**Environment in Docker**

- `CI=true` is set in the image and Compose file (enables retries and single worker, same as GitHub Actions).
- `BASE_URL` defaults to `https://awesomeqa.com/ui/` when unset.
- With `CI=true`, valid wishlist credentials are **required when the full suite runs `@wishlist`** (Docker default). GitHub Actions skips `@wishlist` when repository secrets are missing.

Pass credentials via `.env` or `--env-file`:

```sh
docker run --rm -e CI=true --env-file .env playwright-tests
```

Compose loads `.env` from the project root when present (`env_file` with `required: false`).

Test results and HTML reports are written to `playwright-report/` and `test-results/` (Compose mounts these to the host).

## Environment Variables

| Variable             | Required     | Description                                                    |
| -------------------- | ------------ | -------------------------------------------------------------- |
| `BASE_URL`           | No           | OpenCart store root URL (default: `https://awesomeqa.com/ui/`) |
| `TEST_USER_EMAIL`    | Wishlist E2E | Registered user email on the OpenCart demo store               |
| `TEST_USER_PASSWORD` | Wishlist E2E | Password for the registered user                               |

- **Local:** copy `.env.example` to `.env` and fill in real values.
- **CI:** add `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` as repository secrets to run the wishlist E2E in CI. Without secrets, CI runs all other tests and skips `@wishlist`.

The wishlist E2E test **skips locally** when credentials are missing or still set to the `.env.example` placeholders.

## Code Quality

| Command                   | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `npm run verify:static`   | Build + typecheck + lint + format check (local optional) |
| `npm run verify:sut`      | HEAD check against `BASE_URL` (local optional)           |
| `npm run verify:api`      | API tests only                                           |
| `npm run verify:smoke`    | `@smoke` tagged tests                                    |
| `npm run verify:wishlist` | `@wishlist` E2E (needs credentials)                      |
| `npm run verify`          | Local: static + sut + api + smoke                        |
| `npm run verify:full`     | Local: static + sut + full Playwright suite              |
| `npm run build`           | Build the `pw-core` workspace package                    |
| `npm run typecheck`       | TypeScript strict check (`tsc --noEmit`)                 |
| `npm run lint`            | ESLint (TypeScript + Playwright rules)                   |
| `npm run lint:fix`        | ESLint with auto-fix                                     |
| `npm run format`          | Prettier format all files                                |
| `npm run format:check`    | Prettier check without writing                           |

There is no separate unit-test runner; `pw-core` is validated via `npm run build` and exercised indirectly through Playwright specs. Root `npm run typecheck` runs `tsc --noEmit` on the test project; both are included in `verify:static`.

### CI (GitHub Actions)

Workflow: [.github/workflows/quality-gates.yml](.github/workflows/quality-gates.yml)

| Event                         | Jobs                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| **Pull request**              | Static analysis → SUT health → PR tests (API + smoke; wishlist when secrets exist) |
| **Push to `main` / `master`** | Static analysis → SUT health → full Playwright suite                               |
| **Nightly (06:00 UTC)**       | Same as push to main                                                               |

**Branch protection (PRs):** require **Static analysis**, **SUT health**, and **PR tests (API + smoke)**. Do not require **Full Playwright suite** on PRs — it runs after merge and nightly.

**Wishlist E2E:** runs inside PR tests when `TEST_USER_EMAIL` / `TEST_USER_PASSWORD` secrets are configured; skipped for fork PRs and when secrets are missing.

See [docs/QUALITY-GATES.md](docs/QUALITY-GATES.md) for local `verify:*` commands and Husky hooks.

CI runs with `CI=true` (retries + single worker). Failed runs upload traces and HTML reports.

> `packages/pw-core/dist/` is gitignored and built locally/CI via `npm run build` — never commit compiled output.

## Assertion Conventions

| Type | When to use                                               | API                                                 |
| ---- | --------------------------------------------------------- | --------------------------------------------------- |
| Soft | Audit / smoke checks that should report multiple failures | `SoftAssertions`, `*Check()` methods                |
| Hard | Flow steps and post-action verification                   | `HardAssertions`, navigation/login/checkout helpers |

Use `Wait` from `@opencart-auto/pw-core` for safe clicks and load-state synchronization.

## Locator Conventions

- Prefer role- and label-based locators (`getByRole`, `getByPlaceholder`, `getByTitle`).
- Scope actions to containers (`#search` form, product card, table row) instead of page-wide CSS.
- OpenCart icon buttons use `data-original-title` — use scoped selectors like `button[data-original-title="Add to Wish List"]` within the product card.

## Test Data

Product catalog and search terms live in `src/features/catalog/state/products.ts`. Related state modules:

| Feature  | State files (examples)                                                          |
| -------- | ------------------------------------------------------------------------------- |
| catalog  | `products.ts`, `ribbonMenu.ts`, `searchMessages.ts`, `alertMessages.ts`         |
| home     | `uiConstants.ts`, `headerRoutes.ts`, `footerContent.ts`                         |
| auth     | `paths.ts`, `loginErrors.ts`, `loginForm.ts`, `logoutForm.ts`, `credentials.ts` |
| checkout | `billingDetails.ts`, `paths.ts`, `uiConstants.ts`                               |
| wishlist | `paths.ts`, `uiConstants.ts`                                                    |

Full index: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#state-module-reference).

```typescript
import { getSearchTerm, products, requireCategory, requireProductId } from '../../features/catalog';

await header.searchForProduct(getSearchTerm(products.NIKON_D300));
await ribbon.openProductPage(requireCategory(products.NIKON_D300, 'NIKON_D300'));

// API / hybrid cart calls
const productId = requireProductId(products.NIKON_D300, 'NIKON_D300');
```

Each `IProduct` defines `name`, `category`, `searchTerm`, and `productId` (OpenCart catalog id for cart API tests). Use `getSearchTerm()` when the search query differs from the display name. Use `requireProductId()` for API calls and `requireCategory()` for ribbon navigation to fail fast if catalog data is incomplete.

## API and Hybrid Tests

Route constants live in `src/shared/services/routes/openCartRoutes.ts` (`home`, `search`, `cart`, `cartAdd`, `checkout`, `login`, `logout`, `wishlist`). Feature services wrap HTTP calls:

| Feature | Service                         | Assertions                                     |
| ------- | ------------------------------- | ---------------------------------------------- |
| Catalog | `CatalogService` (`searchHtml`) | `assertProductInHtml`, `assertNoSearchResults` |
| Cart    | `CartService` (`addProduct`)    | `assertCartAddRejected`                        |

| Type   | Folder              | Fixture      | When to use                                                  |
| ------ | ------------------- | ------------ | ------------------------------------------------------------ |
| API    | `src/tests/api/`    | `ApiFixture` | Fast HTTP smoke and negative route checks                    |
| Hybrid | `src/tests/hybrid/` | `POMFixture` | `sessionCartService` + page objects (shared session cookies) |

Use `sessionCartService` from `POMFixture` in hybrid tests (not standalone `request`) so cart/session cookies stay in sync with the browser.

### Auth and wishlist behavior

- `Header.openWishlist()` opens the wishlist route (home presentation — click only).
- `LoginPage.assertLoginFormVisible()` asserts the Returning Customer form (auth presentation).
- `LoginPage.login()` submits credentials and fails on credential rejection only (no flow-specific landing assertion).
- `WishListPage.assertLoaded()` verifies the wishlist page after login in wishlist E2E.
- Wishlist E2E uses the `wishlistCredentials` fixture from `POMFixture` (see `src/fixtures/wishlistCredentials.ts`).
- Credential resolution: `features/auth/state/credentials.ts`. CI policy: [docs/adr/002-ci-wishlist-credentials.md](docs/adr/002-ci-wishlist-credentials.md).

## System under test (SUT)

All **22 tests** target the OpenCart demo store at `BASE_URL` (default `https://awesomeqa.com/ui/`). The suite assumes:

- The store is reachable over HTTPS from CI, Docker, and local runners.
- Catalog content matches seeded product names/ids in `src/features/catalog/state/products.ts` (e.g. Nikon D300, MacBook Pro).
- Ribbon categories used in integration tests have at least one product (Tablets, Phones & PDAs, Cameras); **Software** has zero products and is not used for product-listing assertions.
- Guest checkout and cart API routes remain compatible with OpenCart 3.x-style responses.

Operational risk: third-party demo downtime or catalog changes will fail tests until data or selectors are updated. CI uses `retries: 2` and `workers: 1` to reduce flake from network timing.

## Writing Tests

- Functional tests → `src/tests/functional/`
- Integration tests → `src/tests/integration/`
- E2E tests → `src/tests/e2e/`
- API tests → `src/tests/api/`
- Hybrid tests → `src/tests/hybrid/`
- Page objects → `src/features/<feature>/presentation/` (use via fixtures in tests, not barrel imports)
- Fixtures → `src/fixtures/` (`POMFixture.ts`, `ApiFixture.ts`, `fixtureHelpers.ts`, `wishlistCredentials.ts`)
- Test data → `src/features/<feature>/state/`
- Scenario reference → [specs/test.plan.md](specs/test.plan.md)

### Example

See [src/tests/functional/HomePageFunctionalityCheck.spec.ts](src/tests/functional/HomePageFunctionalityCheck.spec.ts) for a sample functional test using the POM and fixtures.

## License

ISC
