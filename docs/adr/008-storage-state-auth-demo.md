# ADR 008: Optional storageState auth reuse demo

## Status

Accepted

## Context

Authenticated flows currently log in through the UI (see `WishListFlow.spec.ts` and ADR-002 / ADR-004). Playwright’s `storageState` pattern — login once in a setup project, reuse cookies/localStorage — is a common Staff-level technique and useful portfolio signal, but applying it to the wishlist E2E would drop coverage of the guest → login-gate path.

## Decision

Add an **isolated** storageState demo:

| Piece                                    | Role                                                                                |
| ---------------------------------------- | ----------------------------------------------------------------------------------- |
| `src/tests/auth.setup.ts`                | `setup` project — UI login via `LoginPage`, write `playwright/.auth/user.json`      |
| `src/tests/e2e/StorageStateDemo.spec.ts` | `chromium-storage-state-demo` project — open wishlist **without** calling `login()` |
| `playwright.config.ts`                   | Dedicated projects; chromium/firefox/webkit `testIgnore` setup + demo files         |

Credential policy matches ADR-002: both tests are tagged `@wishlist` so GitHub Actions `--grep-invert @wishlist` excludes them when secrets are missing. Locally, missing credentials skip after writing an empty storage file so the dependent project does not fail with “file not found”.

`WishListFlow` remains the full UI login-gate E2E and is unchanged.

## Consequences

- Demonstrates setup-project + `storageState` without weakening wishlist coverage.
- Auth JSON stays gitignored (`/playwright/.auth/`).
- Demo runs on Chromium only; multi-browser auth reuse is out of scope for this example.
