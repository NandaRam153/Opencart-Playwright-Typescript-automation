# ADR 009: Hybrid network mock demos (`route.fulfill`)

## Status

Accepted

## Context

API specs (`src/tests/api/`) exercise the live OpenCart demo over `APIRequestContext`. That is the right default for SUT confidence, but it cannot demonstrate Playwright browser network stubbing (`page.route` + `route.fulfill`), and it cannot force UI empty/error states the demo store will not return on demand.

Staff-level portfolios often need a clear example of intercepting browser traffic for **empty state** and **error responses** without abandoning real API coverage.

## Decision

Add an isolated hybrid suite tagged `@mock`:

| Piece                                      | Role                                                                                     |
| ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `src/features/cart/state/networkMocks.ts`  | Deterministic HTML / error body payloads                                                 |
| `src/fixtures/networkMockHelpers.ts`       | `page.route` / `fulfill` + dialog assert helpers (not page objects)                      |
| `src/tests/hybrid/NetworkMockDemo.spec.ts` | Scenario orchestration via POMFixture page objects                                       |
| `CartPage` / `ProductListingPage`          | UI navigation and assertions (empty cart, no checkout, search results, no success alert) |

This demo store’s `cart.add` (in `common.js`) only renders a success banner for `json.success`. HTTP failures go through jQuery’s `error` handler and call `window.alert`. The error scenario therefore asserts the dialog text from a fulfilled `500` response — not a Bootstrap danger alert.

Real API/hybrid smoke tests (`CartAdd`, `StoreRoutes`, `CartApiToUi`) stay unmocked. `@mock` is **not** part of `@smoke`.

## Consequences

- Clear separation: live HTTP for confidence, mocks for UI resilience demos.
- Network stubs stay in fixtures/helpers; UI details stay in presentation (POM).
- Mock HTML is intentionally minimal (only what CartPage asserts); it is not a full OpenCart skin.
- Error demo is tied to this storefront’s ajax error contract (`alert`); other OpenCart versions that render `error.warning` would need a different assertion.
