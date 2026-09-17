# GitHub Copilot instructions

This repository is Playwright/TypeScript **test automation** for the OpenCart demo store — not the store app itself.

## Always follow

1. Read **[AGENTS.md](../AGENTS.md)** for hard rules and the skills-first policy ([ADR-010](../docs/adr/010-skills-first-test-authoring.md)).
2. Feature layout: `src/features/<name>/{presentation,state,services}` + barrel `index.ts`. Do not create flat `src/pages/`, `src/api/`, or `src/data/`.
3. UI tests: import `test` from `src/fixtures/POMFixture`. API tests: `ApiFixture` or `@playwright/test` `{ request }`.
4. When writing tests, load TestDino **`core`** and **`pom`** under `.agents/skills/playwright-skill/` and match an existing spec in the same layer under `src/tests/`.

## Do not (unless the user explicitly asks)

- Call Playwright Test MCP tools (`browser_*`, `generator_*`, `planner_*`, `generator_write_test`)
- Use chrome-devtools MCP to author specs
- Invoke `.github/agents/playwright-test-{planner,generator,healer}` as the default path
- Emit seed-style `{ page }` / `page.click` specs as the final committed test — refactor to `POMFixture` and feature page objects

## Verify

```sh
npm run verify:static
npx playwright test path/to/file.spec.ts --project=chromium
```
