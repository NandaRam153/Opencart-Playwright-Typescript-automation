# Contributing

Thank you for contributing to the OpenCart Playwright TypeScript automation suite. This guide covers local setup, quality gates, and the fork/PR workflow.

## Before you start

1. Read [ARCHITECTURE.md](ARCHITECTURE.md) for feature modules and layer rules.
2. Read [QUALITY-GATES.md](QUALITY-GATES.md) for CI jobs and local `verify:*` commands.
3. Skim [specs/test.plan.md](../specs/test.plan.md) when adding or changing scenarios.

## Local setup

```sh
git clone https://github.com/NandaRam153/Opencart-Playwright-Typescript-automation.git
cd Opencart-Playwright-Typescript-automation
npm ci
cp .env.example .env   # optional; required for wishlist E2E locally
```

`npm ci` runs `postinstall` (builds `pw-core`) and `prepare` (installs Husky hooks).

## IDE and AI tooling

Workspace recommendations live in [`.vscode/extensions.json`](../.vscode/extensions.json). Install prompted extensions (or open the Extensions view and search “Recommended”).

| Tooling                                                    | Purpose                                                                                |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Playwright Test, ESLint, Prettier                          | Run/debug specs; match CI lint/format                                                  |
| IronBee DevTools                                           | Live browser verification for agents (preferred over other browser MCPs for UI checks) |
| GitHub Pull Requests / Actions                             | Review PRs and CI locally                                                              |
| MCP (`.vscode/mcp.json`)                                   | `playwright-test`, `chrome-devtools`, `github` — enable under Cursor Settings → MCP    |
| Skills (`.agents/skills/playwright-skill/`)                | Agent guides for core / POM / CI / CLI                                                 |
| Debug playbook (`.cursor/skills/opencart-debug-playbook/`) | Systematic fail/flake triage for this repo                                             |
| Agents (`.github/agents/`)                                 | Planner, generator, healer workflows                                                   |
| [AGENTS.md](../AGENTS.md) / [CLAUDE.md](../CLAUDE.md)      | Shared + Claude Code entry points (thin; link to docs/skills, don’t duplicate rules)   |

Cursor workspace settings (format on save, ESLint fix) are in [`.vscode/settings.json`](../.vscode/settings.json).
**Cursor** loads `.cursor/rules/`; **Claude Code** loads `CLAUDE.md` → `AGENTS.md`.

## Development workflow

| Step                | Command / action                                             |
| ------------------- | ------------------------------------------------------------ |
| Edit code           | Follow layer rules — see [ARCHITECTURE.md](ARCHITECTURE.md)  |
| Pre-commit          | Husky runs `lint-staged` (ESLint + Prettier on staged files) |
| Pre-push            | Husky runs `npm run verify:static`                           |
| PR-equivalent check | `npm run verify` (static + SUT + API + smoke)                |
| Full regression     | `npm run verify:full`                                        |

See [VERIFICATION.md](VERIFICATION.md) for the full checklist including accessibility notes.

## Pull requests

### Required checks (same-repo PRs)

Configure branch protection to require these job names from [.github/workflows/quality-gates.yml](../.github/workflows/quality-gates.yml):

**Pull requests**

- Static analysis
- SUT health
- PR tests (API + smoke)

Wishlist runs as a step inside **PR tests (API + smoke)** when repository secrets are configured. Do not require **Full Playwright suite** on PRs.

**After merge to `main` / `master`**

- Static analysis
- SUT health
- Full Playwright suite

### Fork PRs

- Fork PRs **do not** receive repository secrets.
- The wishlist step inside **PR tests (API + smoke)** is **skipped** (not failed) when the PR head branch is from a fork.
- Static, SUT health, and PR tests still run — sufficient for most contributions (page objects, integration tests, API tests, docs).

To exercise wishlist E2E locally, set valid `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` in `.env`.

### What to include in a PR

- Focused changes aligned with feature module boundaries.
- Updated [specs/test.plan.md](../specs/test.plan.md) when scenarios change.
- Updated README / architecture / ADR when behavior, CI, or layer rules change (see [.cursor/rules/30-documentation.mdc](../.cursor/rules/30-documentation.mdc) impact table).

## Layer rules (summary)

| Layer            | May import                                             | Must not import                                         |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------- |
| **presentation** | Same-feature `state`, `@opencart-auto/pw-core`         | Other features, `services`                              |
| **state**        | `shared` routes/types, `@opencart-auto/pw-core` models | `presentation`, `services`, other features              |
| **services**     | `shared`, same-feature `state`                         | `presentation`, other features                          |
| **tests**        | Feature barrels (state/services/types), fixtures       | Internal layer paths; presentation classes from barrels |
| **fixtures**     | Feature barrels (including presentation for DI)        | Internal layer paths                                    |

Cross-feature flows compose in **tests** and **fixtures** only. UI specs import `test` (and `expect`) from `POMFixture`; API specs from `ApiFixture`.

## Adding a feature module

1. Create `src/features/<name>/` with `state/`, `presentation/`, and optionally `services/`.
2. Export public API from `index.ts`.
3. Register page objects in `POMFixture.ts` when tests need them.
4. Add tests under the appropriate `src/tests/<layer>/` folder.
5. Document in `specs/test.plan.md`.
6. Add an ADR if the decision is non-trivial — see [adr/README.md](adr/README.md).

## Related documents

| Document                             | Purpose                       |
| ------------------------------------ | ----------------------------- |
| [ARCHITECTURE.md](ARCHITECTURE.md)   | System design and feature map |
| [QUALITY-GATES.md](QUALITY-GATES.md) | CI matrix and test tags       |
| [VERIFICATION.md](VERIFICATION.md)   | Local verification checklist  |
| [adr/README.md](adr/README.md)       | Architectural decisions       |
