# OpenCart Playwright Test Plan

## Application Overview

This plan documents the automated Playwright tests implemented for the OpenCart demo store. Each scenario is mapped to a test file under the `src/tests/` or `src/` directory, as per the current project structure.

## Test Scenarios

### 1. Seed Test

**File:** `src/tests/seed.spec.ts` or `src/tests/seed.spec.ts`

**Purpose:**
Basic seed test group for Playwright setup and code generation. (Currently a placeholder for future test code.)

---

### 2. Home Page Functionality

**File:** `src/tests/functional/HomePageFunctionalityCheck.spec.ts` or `src/tests/tests/functional/HomePageFunctionalityCheck.spec.ts`

**Scenario:** Home page functionality checks

**Steps:**
1. Navigate to the home page.
2. Validate the header is displayed and correct.
3. Validate the ribbon/banner is displayed and correct.
4. Validate the main home page content is correct.
5. Validate the footer is displayed and correct.

---

### 3. Order Creation (E2E)

**File:** `src/tests/e2e/OrderCreation.spec.ts` or `src/tests/e2e/OrderCreation.spec.ts`

**Scenario:** End-to-end order creation test

**Steps:**
1. Navigate to the home page.
2. Open the product page for cameras from the ribbon.
3. Add the product "Nikon D300" to the cart.
4. Verify the product added message for "Nikon D300" is shown.
5. Go to the checkout page from the header.
6. Complete guest checkout using billing details.
7. Validate the order placement result page.

---

### 4. Wish List Flow (E2E)

**File:** `src/tests/e2e/WishListFlow.spec.ts` or `src/tests/e2e/WishListFlow.spec.ts`

**Scenario:** End-to-end wish list flow

**Steps:**
1. Navigate to the home page.
2. Login as a returning customer.
3. Add a product to the wish list from the product listing page.
4. Go to the wish list page from the header.
5. Verify the product is present in the wish list.
6. Delete the product from the wish list.
7. Logout.

---

## Notes
- All tests use the Playwright test runner and Page Object Model for maintainability.
- Additional scenarios can be added by creating new `.spec.ts` files under `src/tests/functional/` or `src/tests/e2e/` as needed.
- Test file paths may vary depending on the current project structure (e.g., `src/tests/` vs `specs/` or `tests/`).
