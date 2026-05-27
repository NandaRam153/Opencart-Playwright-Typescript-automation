
# Opencart Playwright Typescript Automation

Automated functional and end-to-end (E2E) testing for Opencart using Playwright and TypeScript.

## Features
- Page Object Model (POM) for maintainable, reusable code
- Playwright fixtures for easy test setup
- HTML test reports
- Docker and Docker Compose support for containerized execution

## Project Structure
```
├── src/
│   ├── components/               # Shared page components (Header, Footer, Ribbon)
│   ├── data/                     # Test data (products, billing details)
│   ├── fixtures/
│   │   └── POMFixture.ts         # Playwright fixtures
│   ├── models/                   # TypeScript interfaces
│   └── pages/
│       ├── mainPages/            # Home, Login, Checkout, WishList, etc.
│       └── products/             # Product listing pages
│   └── tests/
│       ├── seed.spec.ts          # Seed / scaffolding test
│       ├── e2e/                  # End-to-end tests
│       ├── functional/           # Functional tests
│       └── integration/          # Integration tests
├── packages/
│   └── pw-core/                  # Shared core library (interfaces, utilities)
├── specs/                        # Test plans
├── playwright.config.ts          # Playwright config
├── package.json                  # Project dependencies/scripts
├── Dockerfile                    # Docker build definition
├── docker-compose.yml            # Docker Compose config
├── playwright-report/            # HTML reports
└── test-results/                 # Test results
```

## Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (for running in containers)

## Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/NandaRam153/Opencart-Playwright-Typescript-automation.git
    cd Opencart-Playwright-Typescript-automation
    ```
2. Install dependencies:
    ```sh
    npm install
    ```

## Running Tests

### Locally (on your machine)
- Run all tests (headless):
   ```sh
   npm test
   ```
- Run tests with UI:
   ```sh
   npm run test:headed
   ```
- Debug tests:
   ```sh
   npm run test:debug
   ```
- View HTML report:
   ```sh
   npm run report
   ```

#### Run a Specific Test File
- Run a specific test file:
   ```sh
   npx playwright test src/tests/functional/YourTestFile.spec.ts
   ```
- Run a specific test by its title:
   ```sh
   npx playwright test -g "your test name"
   ```

#### Debug a Specific Test
- Debug a specific test file:
   ```sh
   npx playwright test src/tests/functional/YourTestFile.spec.ts --debug
   ```
- Debug a specific test by its title:
   ```sh
   npx playwright test -g "your test name" --debug
   ```

### Using Docker

- **Build and run tests in Docker:**
   ```sh
   npm run test:docker
   ```
- **Debug in Docker (get a shell):**
   ```sh
   npm run test:docker:debug
   ```

### Using Docker Compose

- **Run all tests with Docker Compose (recommended for CI and team environments):**
   ```sh
   docker-compose up --build
   ```
  This will build the Docker image (if needed) and execute all Playwright tests inside a container. Test results and HTML reports will be available in the `playwright-report/` and `test-results/` folders on your host machine.

- **Alternative (if defined in package.json):**
   ```sh
   npm run test:docker:compose
   ```
  This command will run Docker Compose using the configuration in your project.

**Note:**
- You can customize the `docker-compose.yml` to change test commands, mount volumes, or adjust environment variables as needed.
- Make sure Docker is running before executing these commands.

Test results and HTML reports will be available in the `playwright-report/` and `test-results/` folders.

## Writing Tests
- Add new functional tests under `src/tests/functional/`
- Add new integration tests under `src/tests/integration/`
- Add new E2E tests under `src/tests/e2e/`
- Use POM classes from `src/pages/`
- Use fixtures from `src/fixtures/POMFixture.ts`
- Add test data in `src/data/`

## Example
See [src/tests/functional/HomePageFunctionalityCheck.spec.ts](src/tests/functional/HomePageFunctionalityCheck.spec.ts) for a sample functional test using the POM and fixtures.

## License
ISC
