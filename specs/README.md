# Specs

This directory contains test plans for the OpenCart Playwright automation suite.

## Files

| File                         | Purpose                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| [test.plan.md](test.plan.md) | Full test plan: functional, integration, E2E, API, hybrid scenarios, quality gate tags |

Humans and agents writing specs should follow this plan with the skills-first path ([AGENTS.md](../AGENTS.md)). The opt-in `playwright-test-planner` / `playwright-test-generator` agents (`.github/agents/`) may also consume it when explicitly requested.

## Related documentation

| Document                                                                  | Purpose                                                        |
| ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)                           | Feature modules, layer rules, ESLint import rules, state index |
| [docs/QUALITY-GATES.md](../docs/QUALITY-GATES.md)                         | CI jobs, `@smoke` / `@wishlist` tags                           |
| [docs/VERIFICATION.md](../docs/VERIFICATION.md)                           | Pre-PR verification checklist                                  |
| [docs/CONTRIBUTING.md](../docs/CONTRIBUTING.md)                           | Contributor workflow                                           |
| [docs/test-generation-from-seed.md](../docs/test-generation-from-seed.md) | Seed → generator → refactor workflow                           |
| [docs/adr/README.md](../docs/adr/README.md)                               | ADR index                                                      |
| [README.md](../README.md)                                                 | Setup and commands                                             |
