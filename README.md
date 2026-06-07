# Opencart Playwright Typescript Automation

Automated functional, integration, and end-to-end (E2E) testing for the OpenCart demo store using Playwright and TypeScript.

## Features

- Page Object Model (POM) with shared components (Header, Footer, Ribbon)
- Custom Playwright fixtures for page/component injection
- `@opencart-auto/pw-core` workspace package (base classes, `SoftAssertions`, `HardAssertions`, `Wait`)
- Layered tests: functional, integration, and E2E
- Environment-based configuration (`BASE_URL`, credentials via `.env`)
- TypeScript strict mode, ESLint, and Prettier
- HTML test reports, traces on failure, Docker support
- GitHub Actions CI (typecheck, lint, Playwright)

## Project Structure

```
├── src/
│   ├── components/               # Shared UI components (Header, Footer, Ribbon)
│   ├── data/                     # Test data (products, billing details)
│   ├── fixtures/
│   │   └── POMFixture.ts         # Playwright fixtures
│   ├── pages/
│   │   ├── mainPages/            # Home, Login, Checkout, WishList, etc.
│   │   └── products/             # Product listing pages
│   └── tests/
│       ├── seed.spec.ts          # Generator scaffold (excluded from test runs)
│       ├── functional/           # UI smoke / audit tests
│       ├── integration/          # Cross-component flow tests
│       └── e2e/                  # Full user journeys
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
    - `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` — required for the wishlist E2E test (use a real registered OpenCart demo account, not the placeholder values)

## Running Tests

### Locally

| Command               | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `npm test`            | Run all tests headless (builds `pw-core` via `pretest`) |
| `npm run test:headed` | Run with visible browser                                |
| `npm run test:debug`  | Run in Playwright debug mode                            |
| `npm run report`      | Open the HTML report                                    |

The suite runs **15 tests** (`seed.spec.ts` is excluded via `testIgnore`).

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

```sh
npm run test:docker          # Build image and run tests
npm run test:docker:debug    # Shell into the test container
npm run test:docker:compose  # Run via Docker Compose
```

Or directly:

```sh
docker-compose up --build
```

Test results and HTML reports are written to `playwright-report/` and `test-results/`.

## Environment Variables

| Variable             | Required     | Description                                                    |
| -------------------- | ------------ | -------------------------------------------------------------- |
| `BASE_URL`           | No           | OpenCart store root URL (default: `https://awesomeqa.com/ui/`) |
| `TEST_USER_EMAIL`    | Wishlist E2E | Registered user email on the OpenCart demo store               |
| `TEST_USER_PASSWORD` | Wishlist E2E | Password for the registered user                               |

- **Local:** copy `.env.example` to `.env` and fill in real values.
- **CI:** add `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` as repository secrets (Settings → Secrets and variables → Actions).

The wishlist E2E test **skips** when credentials are missing or still set to the `.env.example` placeholders.

## Code Quality

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run build`        | Build the `pw-core` workspace package    |
| `npm run typecheck`    | TypeScript strict check (`tsc --noEmit`) |
| `npm run lint`         | ESLint (TypeScript + Playwright rules)   |
| `npm run lint:fix`     | ESLint with auto-fix                     |
| `npm run format`       | Prettier format all files                |
| `npm run format:check` | Prettier check without writing           |

CI runs with `CI=true` (enables retries and single worker), plus `typecheck`, `lint`, and the full Playwright suite on push/PR to `main` or `master`. Failed runs upload `test-results/` (traces) as artifacts.

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

Product catalog and search terms live in `src/data/products.ts`:

```typescript
import { getSearchTerm, products } from '../../data/products';

await header.searchForProduct(getSearchTerm(products.NIKON_D300));
await ribbon.openProductPage(products.NIKON_D300.category!);
```

Each `IProduct` may define `name`, `category`, and `searchTerm`. Use `getSearchTerm()` when the search query differs from the display name.

## Writing Tests

- Functional tests → `src/tests/functional/`
- Integration tests → `src/tests/integration/`
- E2E tests → `src/tests/e2e/`
- Page objects → `src/pages/` and `src/components/`
- Fixtures → `src/fixtures/POMFixture.ts`
- Test data → `src/data/`
- Scenario reference → [specs/test.plan.md](specs/test.plan.md)

### Example

See [src/tests/functional/HomePageFunctionalityCheck.spec.ts](src/tests/functional/HomePageFunctionalityCheck.spec.ts) for a sample functional test using the POM and fixtures.

## License

ISC
