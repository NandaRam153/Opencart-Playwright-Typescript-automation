# AGENTS.md

Shared entry point for AI coding agents (Cursor, Claude Code, GitHub Copilot, and others).

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
- Tests live under `src/tests/{functional,integration,e2e,api,hybrid}`; Vitest unit tests live under `src/unit/`
- UI tests use `POMFixture`; API tests use `ApiFixture` / `@playwright/test` `{ request }`
- AI-generated code is unverified until `typecheck`, `lint`, and relevant Playwright tests pass
- Do not weaken assertions or bypass CI to make tests green

## Skills first (all agents)

When writing or changing tests, page objects, or locators:

1. Load [`.cursor/skills/opencart-qa-workflow/SKILL.md`](.cursor/skills/opencart-qa-workflow/SKILL.md).
2. Load TestDino `core` and `pom` from [`.agents/skills/playwright-skill/`](.agents/skills/playwright-skill/) (Claude Code: [`.claude/skills/playwright-skill/`](.claude/skills/playwright-skill/)).
3. Copy an existing spec in the same layer and extend `src/features/<name>/` — use `POMFixture` for UI tests.
4. Verify with `npx playwright test` (and IronBee in Cursor for live UI checks — see `ironbee-devtools-use.mdc`).

Do **not** use Playwright Test MCP, chrome-devtools MCP, or `.github/agents/playwright-test-{planner,generator,healer}` unless the user **explicitly** asks for seed/generator/healer workflows.

**Forbidden by default:** `browser_*`, `generator_*`, `planner_*`, `generator_write_test`, and `playwright-cli` sessions as a substitute for a committed spec.

Policy decision: [docs/adr/010-skills-first-test-authoring.md](docs/adr/010-skills-first-test-authoring.md).

## Cursor vs Claude Code vs Copilot

| Client             | Load these                                                                         |
| ------------------ | ---------------------------------------------------------------------------------- |
| **Cursor**         | `.cursor/rules/*.mdc` (authoritative for Cursor) + `.cursor/skills/`               |
| **Claude Code**    | This file + [CLAUDE.md](CLAUDE.md) + `.claude/skills/playwright-skill/`            |
| **GitHub Copilot** | [`.github/copilot-instructions.md`](.github/copilot-instructions.md) (points here) |

Do **not** duplicate long rule text across tools. Prefer linking to `docs/` and the skill packs below.

## Skills to use

| Task                 | Skill                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------- |
| Day-to-day workflow  | `.cursor/skills/opencart-qa-workflow/SKILL.md`                                         |
| Fail/flake debugging | `.cursor/skills/opencart-debug-playbook/SKILL.md`                                      |
| Playwright patterns  | `.agents/skills/playwright-skill/` (mirrored under `.claude/skills/playwright-skill/`) |

## Opt-in MCP agents

Use only when the user explicitly requests seed → generator → POM refactor, planner exploration, or healer:

- `.github/agents/playwright-test-planner.agent.md`
- `.github/agents/playwright-test-generator.agent.md`
- `.github/agents/playwright-test-healer.agent.md`

Requires enabling `playwright-test` MCP locally (not in default [`.vscode/mcp.json`](.vscode/mcp.json)). See [docs/test-generation-from-seed.md](docs/test-generation-from-seed.md).

## Verify before done

```sh
npm run verify:static    # build + typecheck + lint + prettier + unit
npm run verify           # + SUT health + API + @smoke
```

Wishlist E2E needs credentials (see ADR-002 / `.env.example`). Definition of done: `.cursor/rules/60-definition-of-done.mdc`.
