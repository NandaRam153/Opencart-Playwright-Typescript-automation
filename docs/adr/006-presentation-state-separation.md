# ADR 006: Extract test data and routes from presentation into feature state

**Status:** Accepted  
**Date:** 2026-06-26

## Context

Several page objects embedded constants that belong in the **state** layer: ribbon menu labels in `Ribbon.ts`, search placeholder duplication in `HomePage` and `Header`, billing type imports from `@opencart-auto/pw-core` in `CheckoutPage`, and hardcoded route href fragments in `Header`. This weakened the presentation / state / services boundary described in ADR 001.

## Decision

Move domain constants into feature **state** modules and extend **shared** routes where multiple features need the same path without cross-feature imports:

| Feature      | New / updated state                                  | Presentation change                    |
| ------------ | ---------------------------------------------------- | -------------------------------------- |
| **catalog**  | `state/ribbonMenu.ts`                                | `Ribbon.ts` imports menu labels        |
| **home**     | `state/uiConstants.ts`, `state/headerRoutes.ts`      | `HomePage`, `Header` import constants  |
| **checkout** | `CheckoutBillingDetails` type in `billingDetails.ts` | `CheckoutPage` imports type from state |
| **auth**     | `AUTH_LOGOUT_URL_PATTERN`, `AuthPaths.logout`        | `LogoutPage` uses state URL pattern    |
| **wishlist** | `state/paths.ts` (`WishlistPaths`)                   | Barrel export for future navigation    |
| **shared**   | `OpenCartRoutes.checkout`, `.logout`, `.wishlist`    | Consumed via feature state slices      |

Header cart/checkout link assertions use `HeaderRoutes` derived from **shared** `OpenCartRoutes`, not imports from the cart or checkout feature modules.

## Consequences

**Positive**

- Presentation files focus on locators and actions; state holds data and path constants.
- ESLint layer rules remain enforceable and meaningful.
- Software ribbon category documented as empty on demo SUT in `ribbonMenu.ts`.

**Negative**

- More state files to navigate when onboarding.
- Shared route table grows as new flows add paths.

## Compliance

- No feature imports another feature's `presentation/`, `state/`, or `services/` paths.
- Cross-feature composition remains in tests and fixtures only.
- `CartPage` continues to use `CartPaths` from cart state (existing pattern from ADR 001).
