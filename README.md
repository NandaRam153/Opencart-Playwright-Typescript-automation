
# Opencart Playwright Typescript Automation

Automated functional and e2e testing for Opencart using Playwright and TypeScript.

## Features
- Page Object Model for maintainable code
- Fixtures for easy test setup
- HTML test reports
- Docker support

## Project Structure
```
├── fixtures/POManager.ts         # Playwright fixtures and PO manager
├── pageObjects/                  # Page Object Model classes
├── tests/Functional/             # Functional test cases
├── playwright.config.ts          # Playwright config
├── package.json                  # Project dependencies/scripts
├── playwright-report/            # HTML reports
└── test-results/                 # Test results
```

## Getting Started
1. Clone & install:
   ```sh
   git clone https://github.com/NandaRam153/Opencart-Playwright-Typescript-automation.git
   cd Opencart-Playwright-Typescript-automation
   npm install
   ```
2. Run tests:
   ```sh
   npm test            # Headless
   npm run test:headed # With UI
   npm run report      # View report
   ```

## Writing Tests
- Add tests in `tests/Functional/`
- Use POM classes from `pageObjects/`
- Use fixtures from `fixtures/POManager.ts`

## Example
See `tests/Functional/HomePageFunctionalityCheck.spec.ts` for a sample test.

## License
ISC
