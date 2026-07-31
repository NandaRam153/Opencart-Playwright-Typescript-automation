---
name: opencart-debug-playbook
description: >-
    Systematic debugging of failing or flaky Playwright tests in this OpenCart
    automation repo. Use when a test fails locally or in CI, when diagnosing
    flakes, locator/strict-mode errors, wishlist credential skips, or when
    healing broken specs without weakening assertions.
---

# OpenCart systematic debug playbook

## Success criteria

A debug session is done when: root cause is named, fix is minimal and architecture-safe, and the failing test (or burn-in for flakes) passes.

## Do not

- Weaken assertions or delete checks to “make it green”
- Use Cursor built-in browser for UI verification — use **IronBee** (`ironbee-devtools-use.mdc`)
- Cross feature-layer boundaries when “fixing” locators/data
- Commit secrets while debugging credentials

## Phase 0 — Classify (60 seconds)

| Signal                       | Likely class                                       |
| ---------------------------- | -------------------------------------------------- |
| Same failure every run       | Deterministic bug (locator, assertion, flow)       |
| Passes alone, fails in suite | Isolation / shared state                           |
| Intermittent                 | Flake (timing, SUT, network)                       |
| Only `@wishlist` / auth      | Credentials / env (`wishlistCredentials`, ADR-002) |
| Only in CI                   | Env, shards, secrets, or timing under load         |
| `No tests found`             | Wrong path / missing `.spec.ts` / filter           |
| Strict mode: N elements      | Locator too broad                                  |

Name the class before changing code.

## Phase 1 — Reproduce narrowly

```bash
# Single file / title
npx playwright test path/to/file.spec.ts --project=chromium
npx playwright test -g "exact test title" --project=chromium

# Isolation
npx playwright test path/to/file.spec.ts --workers=1

# Flake burn-in
npx playwright test path/to/file.spec.ts -g "title" --repeat-each=10 --workers=1
```

Prefer one browser (`--project=chromium`) until the failure is stable.

## Phase 2 — Collect evidence (in order)

1. **Error text** — map via `.agents/skills/playwright-skill/core/error-index.md`
2. **HTML report** — `npx playwright show-report`
3. **Trace** — `npx playwright show-trace test-results/**/trace.zip`  
   (also see `core/trace-analysis.md`)
4. **Live UI** — IronBee: navigate → exercise step → ARIA snapshot / screenshot → console messages
5. **API layer** — if hybrid/API: reproduce with `page.request` / feature `*Service` before blaming UI

Load deeper guides only as needed:

| Symptom             | Guide                                                                    |
| ------------------- | ------------------------------------------------------------------------ |
| General failure     | `core/debugging.md`                                                      |
| Intermittent        | `core/flaky-tests.md`                                                    |
| Trace.zip deep dive | `core/trace-analysis.md`                                                 |
| Locator strategy    | `core/locators.md`, `core/locator-strategy.md`                           |
| Waits / races       | `core/assertions-and-waiting.md`                                         |
| Agent heal loop     | `.github/agents/playwright-test-healer.agent.md` + `playwright-test` MCP |

## Phase 3 — Hypothesize (one at a time)

Write one hypothesis, e.g.:

- “Locator `getByLabel('Search')` matches 6 nodes → need role+name or `.first()` with intent”
- “Assertion expects copy that OpenCart demo no longer shows”
- “Missing `await` / race before cart badge updates”
- “Wishlist skipped: secrets unset (expected), not a product bug”

Reject “random flake” until burn-in and trace say otherwise.

## Phase 4 — Fix surgically

| Class              | Prefer                                                                              |
| ------------------ | ----------------------------------------------------------------------------------- |
| Locator            | Role/label unique to intent; fix in **presentation** POM, not in the test if shared |
| Timing             | Explicit Playwright assertions/auto-wait; no hard `sleep`                           |
| Data / env         | `.env` / fixtures; document skip policy for wishlist                                |
| Isolation          | No shared mutable globals; reset via API/UI setup in the test                       |
| Architecture smell | Move HTTP out of page objects into `services`                                       |

After each fix: re-run the same narrow command from Phase 1.

## Phase 5 — Confirm

- [ ] Narrow repro now green
- [ ] If flake: `--repeat-each=10` (or CI-equivalent) green
- [ ] No assertion deleted without replacement coverage
- [ ] Layer rules still hold (`10-architecture.mdc`)
- [ ] `npm run typecheck` / lint if types or imports changed

## Quick command cheat sheet

```bash
npm run test:headed -- path/to/file.spec.ts --project=chromium
npm run test:debug -- path/to/file.spec.ts
npx playwright test path/to/file.spec.ts --trace=on
npx playwright show-trace test-results/<folder>/trace.zip
DEBUG=pw:api npx playwright test path/to/file.spec.ts --project=chromium
```

## Output format (when reporting)

1. **Class** — deterministic / flake / env / isolation
2. **Evidence** — error + trace/IronBee finding
3. **Root cause** — one sentence
4. **Fix** — files touched
5. **Verification** — command(s) that passed
