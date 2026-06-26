# ADR 004: Generic login presentation vs flow-specific assertions

**Status:** Accepted  
**Date:** 2026-06-26

## Context

`LoginPage.login()` previously asserted the **My Wish List** heading after every successful login. That coupled a reusable auth action to one E2E flow and would fail if `login()` were reused from another entry point.

## Decision

- **`LoginPage.login()`** — submits credentials and throws only when the store shows a credential rejection message.
- **`WishListPage.assertLoaded()`** — asserts the wishlist landing state (My Wish List heading) in the wishlist feature presentation layer.
- Wishlist E2E calls `login()` then `assertLoaded()` explicitly.

## Consequences

**Positive**

- Login presentation is reusable across future flows (account, checkout login, etc.).
- Post-login landing assertions live in the feature that owns the destination page.

**Negative**

- Tests must remember to call the correct post-login assertion for each flow (documented in `specs/test.plan.md`).
