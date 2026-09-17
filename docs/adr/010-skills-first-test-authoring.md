# ADR 010: Skills-first test authoring; Playwright MCP opt-in

**Status:** Accepted  
**Date:** 2026-09-17

## Context

Agents (Cursor, Claude Code, GitHub Copilot) can author tests via:

1. **Skills** — TestDino Playwright skill packs (`core`, `pom`, `ci`, …) plus OpenCart workflow/debug playbooks
2. **Playwright Test MCP** — live browser tools (`browser_*`, `generator_*`, `planner_*`) and `.github/agents/` planner / generator / healer

MCP-driven generation tends to emit seed-style `{ page }` / `page.click` drafts that skip this repo’s `POMFixture` and feature-module layout unless a human refactors afterward. Skills + existing specs produce committed tests that already match architecture.

Workspace `.vscode/mcp.json` previously registered `playwright-test` and `chrome-devtools` by default, so agents saw those tools even for ordinary “add a test” requests.

## Decision

1. **Default authoring path:** skills (`opencart-qa-workflow`, TestDino `core` + `pom`) + copy same-layer specs + extend `src/features/<name>/` with `POMFixture` / `ApiFixture`.
2. **Playwright Test MCP and chrome-devtools MCP** are **opt-in**: use only when the user explicitly requests planner, generator, healer, or seed → generator → POM refactor.
3. **Default workspace MCP** (`.vscode/mcp.json`) ships **GitHub MCP only**. Contributors who need generator/healer re-add `playwright-test` locally.
4. **IronBee** (Cursor) remains the preferred live UI _verification_ tool after a change — it is not Playwright Test MCP and is not used to replace skill-based authoring.
5. Policy is documented in [AGENTS.md](../../AGENTS.md), [CLAUDE.md](../../CLAUDE.md), [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md), and `.cursor/rules/40-ai-engineering.mdc` (`alwaysApply: true`).

## Consequences

**Positive**

- New tests default to `POMFixture` and feature modules across Cursor, Claude Code, and Copilot.
- MCP tools are harder to invoke accidentally (not in default workspace MCP config).
- Seed → generator → refactor remains available as a documented opt-in path.

**Negative**

- Users must re-enable `playwright-test` MCP locally for planner/generator/healer.
- User-level / plugin MCP installs outside the repo can still expose Playwright tools; policy text must discourage their use for authoring.

## Compliance

- Do not call `browser_*` / `generator_*` / `planner_*` / `generator_write_test` unless the user names that workflow.
- Do not commit seed-style `{ page }` specs as final tests; refactor per [test-generation-from-seed.md](../test-generation-from-seed.md).
- Prefer `npx playwright test` (+ IronBee in Cursor) over MCP browser sessions for verification.
