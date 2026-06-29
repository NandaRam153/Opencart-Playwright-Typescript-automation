# ADR 004: Generic login presentation vs flow-specific assertions

**Status:** Accepted (amended 2026-06-28)  
**Date:** 2026-06-26

## Context

`LoginPage.login()` previously asserted the **My Wish List** heading after every successful login. That coupled a reusable auth action to one E2E flow and would fail if `login()` were reused from another entry point. `Header.gotoWishlist()` similarly asserted the login form from the home feature.

## Decision

- **`LoginPage.login()`** — submits credentials and throws only when the store shows a credential rejection message.
- **`LoginPage.assertLoginFormVisible()`** — asserts the Returning Customer login form (auth presentation).
- **`Header.openWishlist()`** — clicks the wishlist control only (home presentation); no auth-domain assertion.
- **`WishListPage.assertLoaded()`** — asserts the wishlist landing state in the wishlist feature presentation layer.
- Wishlist E2E calls `openWishlist()` → `assertLoginFormVisible()` → `login()` → `assertLoaded()` explicitly in the test layer.

## Consequences

**Positive**

- Login presentation is reusable across future flows (account, checkout login, etc.).
- Post-login landing assertions live in the feature that owns the destination page.
- Cross-feature UI checks compose in tests, not in unrelated page objects.

**Negative**

- Tests must remember to call the correct post-login assertion for each flow (documented in `specs/test.plan.md`).
