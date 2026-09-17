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
4. Follow skills-first policy in [AGENTS.md](../../AGENTS.md) / [ADR-010](../../docs/adr/010-skills-first-test-authoring.md).

## Which skill pack to load

| Task                                  | Load from `.agents/skills/playwright-skill/`                                                                               |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Locators, waits, API, flakes, traces  | `core/`                                                                                                                    |
| Page objects / fixtures               | `pom/`                                                                                                                     |
| GitHub Actions, Docker, sharding      | `ci/`                                                                                                                      |
| Ad-hoc browser CLI debugging          | `playwright-cli/` (exploration only — not a substitute for a committed spec)                                               |
| Cypress/Selenium migration            | `migration/` (rare)                                                                                                        |
| Failing/flaky test triage (this repo) | `.cursor/skills/opencart-debug-playbook/SKILL.md` first, then `core/debugging.md` / `flaky-tests.md` / `trace-analysis.md` |

Default for **new tests**: load **`core`** + **`pom`**, copy a same-layer existing spec, extend the feature module.

Also follow `.cursor/rules/40-ai-engineering.mdc`, `60-definition-of-done.mdc`, and `80-code-review.mdc`.

## Opt-in MCP agents (last resort)

Use **only** when the user explicitly asks for seed → generator → POM refactor, planner exploration, or healer:

- `.github/agents/playwright-test-planner.agent.md`
- `.github/agents/playwright-test-generator.agent.md`
- `.github/agents/playwright-test-healer.agent.md`

Requires enabling `playwright-test` MCP locally (not in default `.vscode/mcp.json`). See [docs/test-generation-from-seed.md](../../docs/test-generation-from-seed.md).

Do **not** call Playwright Test MCP or chrome-devtools MCP tools for ordinary test authoring.

## Verify

- Static: `npm run verify:static` (includes Vitest `test:unit`)
- Relevant Playwright tests for the change
- UI behavior (Cursor): IronBee browser tools only (see `ironbee-devtools-use.mdc`)
