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
- GitHub Actions CI (typecheck, lint, credential gate, Playwright)

## Documentation

| Document | Description |
| -------- | ----------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design, Mermaid diagrams, feature map, import rules |
| [docs/test-generation-from-seed.md](docs/test-generation-from-seed.md) | Seed file and generator showcase workflow |
| [docs/adr/README.md](docs/adr/README.md) | ADR index and architectural decisions |
| [specs/test.plan.md](specs/test.plan.md) | Test scenarios and step definitions |

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
│   │   └── POMFixture.ts         # Playwright fixtures
│   └── tests/
│       ├── seed.spec.ts          # Generator scaffold (excluded from test runs)
│       ├── functional/           # UI smoke / audit tests
│       ├── integration/          # Cross-component flow tests
│       ├── e2e/                  # Full user journeys
│       ├── api/                  # Pure HTTP route tests (Playwright request)
│       └── hybrid/               # API setup + UI verification
├── docs/
│   ├── ARCHITECTURE.md           # Diagrams, feature map, layer rules
│   └── adr/                      # ADRs (see adr/README.md)
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

| Layer | Responsibility | May import from |
| ----- | -------------- | --------------- |
| **presentation** | Page objects, locators, UI actions | Same feature `state` only |
| **state** | Test data, path constants, env credentials | `shared` routes/types |
| **services** | HTTP calls, API assertions | `shared`, same feature `state` |
| **tests** | Orchestration | Feature public APIs via `index.ts` |

Features stay independent — tests compose flows through fixtures and feature barrel exports, not cross-feature internal imports. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for diagrams and the full feature map.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
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
    - `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` — required for wishlist E2E locally; **required in CI** (see [docs/adr/002-ci-wishlist-credentials.md](docs/adr/002-ci-wishlist-credentials.md))

## Running Tests

### Locally

| Command               | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `npm test`            | Run all tests headless (builds `pw-core` via `pretest`) |
| `npm run test:headed` | Run with visible browser                                |
| `npm run test:debug`  | Run in Playwright debug mode                            |
| `npm run report`      | Open the HTML report                                    |

The suite runs **21 tests** (`seed.spec.ts` is excluded via `testIgnore`; wishlist E2E skips without valid credentials).

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
- With `CI=true`, valid wishlist credentials are **required** (same as GitHub Actions). Pass via `.env` or `--env-file`:

```sh
docker run --rm -e CI=true --env-file .env playwright-tests
```

Compose loads `.env` from the project root when present (`env_file` with `required: false`).

Test results and HTML reports are written to `playwright-report/` and `test-results/` (Compose mounts these to the host).

## Environment Variables

| Variable             | Required     | Description                                                    |
| -------------------- | ------------ | -------------------------------------------------------------- |
| `BASE_URL`           | No           | OpenCart store root URL (default: `https://awesomeqa.com/ui/`) |
| `TEST_USER_EMAIL`    | CI + wishlist E2E | Registered user email on the OpenCart demo store          |
| `TEST_USER_PASSWORD` | CI + wishlist E2E | Password for the registered user                          |

- **Local:** copy `.env.example` to `.env` and fill in real values.
- **CI:** add `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` as repository secrets (Settings → Secrets and variables → Actions). CI **fails fast** if these are missing or still set to the `.env.example` placeholders.

The wishlist E2E test **skips locally** when credentials are missing or still set to the `.env.example` placeholders.

## Code Quality

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run build`        | Build the `pw-core` workspace package    |
| `npm run typecheck`    | TypeScript strict check (`tsc --noEmit`) |
| `npm run lint`         | ESLint (TypeScript + Playwright rules)   |
| `npm run lint:fix`     | ESLint with auto-fix                     |
| `npm run format`       | Prettier format all files                |
| `npm run format:check` | Prettier check without writing           |

There is no separate unit-test runner; `pw-core` is validated via `npm run build` and exercised indirectly through Playwright specs.

CI runs with `CI=true` (enables retries and single worker), plus `typecheck`, `lint`, a wishlist credential validation step, and the full Playwright suite on push/PR to `main` or `master`. Failed runs upload `test-results/` (traces) as artifacts.

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

Product catalog and search terms live in `src/features/catalog/state/products.ts`:

```typescript
import { getSearchTerm, products, requireProductId } from '../../features/catalog';

await header.searchForProduct(getSearchTerm(products.NIKON_D300));
await ribbon.openProductPage(products.NIKON_D300.category!);

// API / hybrid cart calls
const productId = requireProductId(products.NIKON_D300, 'NIKON_D300');
```

Each `IProduct` defines `name`, `category`, `searchTerm`, and `productId` (OpenCart catalog id for cart API tests). Use `getSearchTerm()` when the search query differs from the display name. Use `requireProductId()` for API calls to fail fast if `productId` is missing from catalog data.

## API and Hybrid Tests

Route constants live in `src/shared/services/routes/`. Feature services wrap HTTP calls:

| Feature | Service | Assertions |
| ------- | ------- | ---------- |
| Catalog | `CatalogService` (`searchHtml`) | `assertProductInHtml`, `assertNoSearchResults` |
| Cart | `CartService` (`addProduct`) | `assertCartAddRejected` |

| Type | Folder | Fixture | When to use |
| ---- | ------ | ------- | ----------- |
| API | `src/tests/api/` | `@playwright/test` `{ request }` | Fast HTTP smoke and negative route checks |
| Hybrid | `src/tests/hybrid/` | `POMFixture` + `page.request` | Shared session: API mutation, UI verification |

Use `page.request` (not standalone `request`) in hybrid tests so cart/session cookies stay in sync with the browser.

### Auth and wishlist behavior

- `LoginPage.login()` submits credentials and fails on credential rejection only (no flow-specific landing assertion).
- `WishListPage.assertLoaded()` verifies the wishlist page after login in wishlist E2E.
- Credential helpers: `features/auth/state/credentials.ts`, `resolveWishlistCredentialsForTest()` in `features/auth/testHelpers/`.

## Writing Tests

- Functional tests → `src/tests/functional/`
- Integration tests → `src/tests/integration/`
- E2E tests → `src/tests/e2e/`
- API tests → `src/tests/api/`
- Hybrid tests → `src/tests/hybrid/`
- Page objects → `src/features/<feature>/presentation/`
- Fixtures → `src/fixtures/POMFixture.ts`
- Test data → `src/features/<feature>/state/`
- Scenario reference → [specs/test.plan.md](specs/test.plan.md)

### Example

See [src/tests/functional/HomePageFunctionalityCheck.spec.ts](src/tests/functional/HomePageFunctionalityCheck.spec.ts) for a sample functional test using the POM and fixtures.

## License

ISC
