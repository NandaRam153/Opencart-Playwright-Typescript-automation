# AGENTS.md

Shared entry point for AI coding agents (Cursor, Claude Code, and others).

## What this repo is

Playwright/TypeScript **test automation** for the [OpenCart demo store](https://awesomeqa.com/ui/) — not the store app itself.

## Source of truth (read in this order)

1. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — feature modules, layers, import rules
2. [docs/adr/](docs/adr/) — architectural decisions
3. [README.md](README.md) — setup and commands
4. [specs/test.plan.md](specs/test.plan.md) — scenarios

## Hard rules

- Feature layout: `src/features/<name>/{presentation,state,services}` + barrel `index.ts`
- **Do not** reintroduce flat `src/pages/`, `src/api/`, `src/data/`, or `src/components/`
- Tests live under `src/tests/{functional,integration,e2e,api,hybrid}`
- UI tests use `POMFixture`; API tests use `ApiFixture` / `@playwright/test` `{ request }`
- AI-generated code is unverified until `typecheck`, `lint`, and relevant Playwright tests pass
- Do not weaken assertions or bypass CI to make tests green

## Cursor vs Claude Code

| Client          | Load these                                                              |
| --------------- | ----------------------------------------------------------------------- |
| **Cursor**      | `.cursor/rules/*.mdc` (authoritative for Cursor) + `.cursor/skills/`    |
| **Claude Code** | This file + [CLAUDE.md](CLAUDE.md) + `.claude/skills/playwright-skill/` |

Do **not** duplicate long rule text across tools. Prefer linking to `docs/` and the skill packs below.

## Skills to use

| Task                 | Skill                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------- |
| Day-to-day workflow  | `.cursor/skills/opencart-qa-workflow/SKILL.md`                                         |
| Fail/flake debugging | `.cursor/skills/opencart-debug-playbook/SKILL.md`                                      |
| Playwright patterns  | `.agents/skills/playwright-skill/` (mirrored under `.claude/skills/playwright-skill/`) |

## Agents (Playwright MCP)

- `.github/agents/playwright-test-planner.agent.md`
- `.github/agents/playwright-test-generator.agent.md`
- `.github/agents/playwright-test-healer.agent.md`

Requires `playwright-test` MCP (see `.vscode/mcp.json`).

## Verify before done

```sh
npm run verify:static    # build + typecheck + lint + prettier
npm run verify           # + SUT health + API + @smoke
```

Wishlist E2E needs credentials (see ADR-002 / `.env.example`). Definition of done: `.cursor/rules/60-definition-of-done.mdc`.
