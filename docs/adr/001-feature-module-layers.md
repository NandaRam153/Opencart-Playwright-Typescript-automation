# ADR 001: Feature modules with presentation / state / services layers

**Status:** Accepted  
**Date:** 2026-06-26

## Context

The suite originally used flat folders (`src/pages/`, `src/components/`, `src/data/`, `src/api/`). Presentation classes imported test data and HTTP routes directly, which blurred responsibilities and made features hard to extend independently.

## Decision

Organize application-facing test code into **feature modules** under `src/features/<name>/`, each with up to three layers:

- **presentation** — Page Object Model (locators, UI actions, visibility checks)
- **state** — Test data, navigation path constants, environment-backed configuration
- **services** — HTTP integration and API-level assertion helpers

Cross-cutting route constants and HTTP types live in `src/shared/`. Reusable Playwright primitives remain in `@opencart-auto/pw-core`.

Each feature exposes a barrel file (`index.ts`). Tests import state and services from feature barrels; page objects are injected via fixtures (ESLint blocks presentation imports in tests).

## Consequences

**Positive**

- Clear boundaries: UI code does not call HTTP clients; services do not contain locators.
- Features can evolve independently (e.g. cart API changes stay in `features/cart/`).
- Easier onboarding: structure mirrors domain areas (catalog, cart, auth, etc.).

**Negative**

- More folders and indirection than a flat POM layout.
- Cross-feature flows compose in tests/fixtures rather than in a single “flow service” (intentional — keeps modules independent).

## Compliance

- `Ribbon.openProductPage(category)` requires an explicit category (no default from catalog state); menu labels live in `catalog/state/ribbonMenu.ts`.
- `CartPage` uses `CartPaths` from cart state, not `shared` routes directly in presentation.
- `CheckoutPage` uses `CheckoutBillingDetails` from checkout state, not `IBillingDetails` from pw-core directly.
- `Header` uses `HeaderRoutes` from home state (wrapping shared routes), not cart/checkout feature imports.
- `Header.openWishlist()` opens wishlist only; login form assertion lives in `LoginPage.assertLoginFormVisible()` (ADR 004).
- Legacy `src/api/`, `src/pages/`, `src/components/`, `src/data/` removed.
