
# Opencart-Playwright-Typescript-automation

This project uses [Playwright](https://playwright.dev/) and TypeScript to automate end-to-end (E2E) workflows for the [Opencart](https://www.opencart.com/) demo website.

## Features
- Automated E2E tests for Opencart UI
- Page Object Model structure for maintainable tests
- HTML test reports
- Docker support for running tests in containers

## Project Structure

```
├── pageObjects/                # Page Object Model classes (e.g., HomePage)
├── specs/                      # Test plans and documentation
├── tests/                      # Test specs
│   ├── functional/             # Functional test cases
│   └── seed.spec.ts            # Seed test example
├── playwright.config.ts        # Playwright configuration
├── package.json                # Project dependencies and scripts
├── playwright-report/          # Generated HTML reports
└── test-results/               # Test result artifacts
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
	 ```sh
	 git clone https://github.com/NandaRam153/Opencart-Playwright-Typescript-automation.git
	 cd Opencart-Playwright-Typescript-automation
	 ```
2. Install dependencies:
	 ```sh
	 npm install
	 ```

### Running Tests
- Run all tests (headless):
	```sh
	npm test
	```
- Run tests in headed mode:
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

### Docker Support
- Build and run tests in Docker:
	```sh
	npm run test:docker
	```
- Debug in Docker:
	```sh
	npm run test:docker:debug
	```
- Run with Docker Compose:
	```sh
	npm run test:docker:compose
	```

## Writing Tests
- Place new test files in `tests/functional/` or other appropriate subfolders.
- Use the Page Object Model for reusable page logic (see `pageObjects/HomePage.ts`).

## Example Test
See `tests/functional/HomePageFunctionalityCheck.spec.ts` for a sample test using the HomePage page object.

## License
ISC
