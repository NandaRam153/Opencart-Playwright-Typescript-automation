# CLAUDE.md

Instructions for **Claude Code** in this repository.

## Start here

Follow **[AGENTS.md](./AGENTS.md)** for shared project rules, architecture pointers, skills, and verify commands.

## Claude Code–specific

1. Prefer skill packs under `.claude/skills/playwright-skill/` (same content as `.agents/skills/playwright-skill/`).
2. For repo workflow / debug playbooks, also read:
    - `.cursor/skills/opencart-qa-workflow/SKILL.md`
    - `.cursor/skills/opencart-debug-playbook/SKILL.md`
3. Detailed Cursor rules live in `.cursor/rules/` — treat them as binding for architecture and DoD even when working in Claude Code (especially `10-architecture.mdc`, `40-ai-engineering.mdc`, `60-definition-of-done.mdc`).
4. UI verification against the live demo: use Playwright MCP / traces / headed runs available in this environment. In Cursor, IronBee browser MCP is preferred (`ironbee-devtools-use.mdc`).

## Quick commands

```sh
npm ci
npx playwright install chromium
npm run verify:static
npx playwright test path/to/file.spec.ts --project=chromium
```

Do not invent flat page/API folders. Extend existing feature modules instead.
