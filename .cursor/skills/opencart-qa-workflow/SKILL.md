---
name: opencart-qa-workflow
description: >-
    How to develop and maintain this OpenCart Playwright TypeScript automation
    repo. Use when adding features, page objects, tests, CI changes, or when an
    agent needs the correct skill pack and architecture rules for this project.
---

# OpenCart QA automation workflow

## Before coding

1. Read `.cursor/rules/10-architecture.mdc` (feature layers) and `00-project-context.mdc`.
2. Prefer existing patterns in `src/features/<name>/` and `src/fixtures/POMFixture.ts`.
3. Do not reintroduce flat `src/pages/`, `src/api/`, or `src/data/`.

## Which skill pack to load

| Task                                  | Load from `.agents/skills/playwright-skill/`                                                                               |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Locators, waits, API, flakes, traces  | `core/`                                                                                                                    |
| Page objects / fixtures               | `pom/`                                                                                                                     |
| GitHub Actions, Docker, sharding      | `ci/`                                                                                                                      |
| Ad-hoc browser CLI debugging          | `playwright-cli/`                                                                                                          |
| Cypress/Selenium migration            | `migration/` (rare)                                                                                                        |
| Failing/flaky test triage (this repo) | `.cursor/skills/opencart-debug-playbook/SKILL.md` first, then `core/debugging.md` / `flaky-tests.md` / `trace-analysis.md` |

Also follow `.cursor/rules/40-ai-engineering.mdc`, `60-definition-of-done.mdc`, and `80-code-review.mdc`.

## Agents

- `.github/agents/playwright-test-planner.agent.md`
- `.github/agents/playwright-test-generator.agent.md`
- `.github/agents/playwright-test-healer.agent.md`

Requires the `playwright-test` MCP server (see `.vscode/mcp.json`).

## Verify

- Static: `npm run verify:static`
- Relevant Playwright tests for the change
- UI behavior: IronBee browser tools only (see `ironbee-devtools-use.mdc`)
