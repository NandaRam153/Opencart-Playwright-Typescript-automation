# CLAUDE.md

Instructions for **Claude Code** in this repository.

## Start here

Follow **[AGENTS.md](./AGENTS.md)** for shared project rules, architecture pointers, skills-first policy, and verify commands.

## Claude Code–specific

1. Prefer skill packs under `.claude/skills/playwright-skill/` (same content as `.agents/skills/playwright-skill/`). For new tests, load **`core`** and **`pom`**.
2. For repo workflow / debug playbooks, also read:
    - `.cursor/skills/opencart-qa-workflow/SKILL.md`
    - `.cursor/skills/opencart-debug-playbook/SKILL.md`
3. Detailed Cursor rules live in `.cursor/rules/` — treat them as binding for architecture and DoD even when working in Claude Code (especially `10-architecture.mdc`, `40-ai-engineering.mdc`, `60-definition-of-done.mdc`).
4. **Skills first:** do **not** use Playwright Test MCP, chrome-devtools MCP, or planner/generator/healer agents unless the user explicitly asks. Default authoring is TestDino skills + `POMFixture` + existing feature modules.
5. Live verification: `npx playwright test` (headed/debug/trace as needed). In Cursor, IronBee is preferred for UI checks (`ironbee-devtools-use.mdc`). Do not open a Playwright MCP browser session to “discover” locators for a new committed spec.

## Quick commands

```sh
npm ci
npx playwright install chromium
npm run verify:static
npx playwright test path/to/file.spec.ts --project=chromium
```

Do not invent flat page/API folders. Extend existing feature modules instead.
