# OpenCart Playwright Test Plan

## Application Overview

This plan documents the automated Playwright tests for the OpenCart demo store. Tests are organized by type: functional, integration, and end-to-end (E2E). All test files live under `src/tests/`.

---

## Test Scenarios

### 1. Seed Test

**File:** `src/tests/seed.spec.ts`
**Seed:** `src/tests/seed.spec.ts`

**Purpose:** Placeholder seed test group used for Playwright code generation scaffolding.

**Scenario:** seed

---

### 2. Home Page Functionality

**File:** `src/tests/functional/HomePageFunctionalityCheck.spec.ts`
**Seed:** `src/tests/seed.spec.ts`

**Scenario:** Home page functionality checks

**Steps:**

1. Navigate to the home page.
2. Validate the header is displayed and correct.
3. Validate the ribbon/banner is displayed and correct.
4. Validate the main home page content is correct.
5. Validate the footer is displayed and correct.

---

### 3. Order Creation (E2E)

**File:** `src/tests/e2e/OrderCreation.spec.ts`
**Seed:** `src/tests/seed.spec.ts`

**Scenario:** Order creation test

**Steps:**

1. Navigate to the home page.
2. Open the Cameras product page from the ribbon.
3. Add the product "Nikon D300" to the cart.
4. Verify the product added success message for "Nikon D300" is shown.
5. Go to the checkout page via the header cart.
6. Complete guest checkout using billing details.
7. Validate the order placement result page confirms the order.

---

### 4. Wish List Flow (E2E)

**File:** `src/tests/e2e/WishListFlow.spec.ts`
**Seed:** `src/tests/seed.spec.ts`

**Scenario:** Wishlist flow: search, add to wishlist, login, verify, delete, logout

**Steps:**

1. Navigate to the home page.
2. Search for "MacBook Pro" using the header search.
3. Verify that "MacBook Pro" is listed in the search results.
4. Add "MacBook Pro" to the wish list from the product listing page.
5. Navigate to the wish list page via the header.
6. Login using registered user credentials.
7. Verify that "MacBook Pro" is present in the wish list.
8. Remove "MacBook Pro" from the wish list.
9. Logout via the header.
10. Verify logout is complete.

---

### 5. Add to Cart → Header Cart State (Integration)

**File:** `src/tests/integration/AddToCartHeaderState.spec.ts`
**Seed:** `src/tests/seed.spec.ts`

**Describe:** Add to Cart → Header Cart State

#### 5.1 Adding a product from category page shows success message

**Steps:**

1. Navigate to the home page.
2. Open the Cameras product page from the ribbon.
3. Add "Nikon D300" to the cart.
4. Verify the product added success message for "Nikon D300" is shown.

#### 5.2 Adding a product from search results shows success message

**Steps:**

1. Navigate to the home page.
2. Search for "Nikon D300" using the header search.
3. Add "Nikon D300" to the cart.
4. Verify the product added success message for "Nikon D300" is shown.

#### 5.3 Adding a product updates the header cart count to 1

**Steps:**

1. Navigate to the home page.
2. Open the Cameras product page from the ribbon.
3. Add "Nikon D300" to the cart.
4. Verify the header cart count shows 1.

#### 5.4 Checkout page is reachable from header after adding a product

**Steps:**

1. Navigate to the home page.
2. Open the Cameras product page from the ribbon.
3. Add "Nikon D300" to the cart.
4. Navigate to checkout via the header cart.

---

### 6. Ribbon Category Navigation → Product Listing (Integration)

**File:** `src/tests/integration/CategoryNavToProductListing.spec.ts`
**Seed:** `src/tests/seed.spec.ts`

**Describe:** Ribbon Category Navigation → Product Listing

#### 6.1 Clicking Cameras in ribbon loads the Cameras category page

**Steps:**

1. Navigate to the home page.
2. Click "Cameras" in the ribbon.
3. Verify the Cameras category page is loaded.

#### 6.2 Cameras category page shows at least one product

**Steps:**

1. Navigate to the home page.
2. Click "Cameras" in the ribbon.
3. Verify at least one product is listed.

#### 6.3 Cameras category page lists Nikon D300

**Steps:**

1. Navigate to the home page.
2. Click "Cameras" in the ribbon.
3. Verify "Nikon D300" is listed.

#### 6.4 Cameras category page lists Canon EOS 5D

**Steps:**

1. Navigate to the home page.
2. Click "Cameras" in the ribbon.
3. Verify "Canon EOS 5D" is listed.

---

### 7. Search → Product Listing (Integration)

**File:** `src/tests/integration/SearchToProductListing.spec.ts`
**Seed:** `src/tests/seed.spec.ts`

**Describe:** Search → Product Listing

#### 7.1 Searching by exact product name lists that product

**Steps:**

1. Navigate to the home page.
2. Search for "Nikon" using the header search.
3. Verify "Nikon D300" appears in the results.

#### 7.2 Searching by brand name returns at least one result

**Steps:**

1. Navigate to the home page.
2. Search for "Canon" using the header search.
3. Verify at least one product is returned.

#### 7.3 Searching by brand name lists a known product from that brand

**Steps:**

1. Navigate to the home page.
2. Search for "Canon" using the header search.
3. Verify "Canon EOS 5D" appears in the results.

#### 7.4 Searching by product name shows at least one result

**Steps:**

1. Navigate to the home page.
2. Search for "iPhone" using the header search.
3. Verify at least one product is returned.
4. Verify "iPhone" appears in the results.

---

### 8. Store Search Routes (API)

**File:** `src/tests/api/StoreRoutes.spec.ts`

**Describe:** Store search routes

#### 8.1 Search route returns a known catalog product

**Steps:**

1. `GET` search URL for Nikon search term.
2. Assert HTTP 200 and response body contains "Nikon D300".

#### 8.2 Search route reports no results for unknown term

**Steps:**

1. `GET` search URL with nonsense term.
2. Assert HTTP 200 and body contains "There is no product that matches the search criteria."

---

### 9. Cart Add (API)

**File:** `src/tests/api/CartAdd.spec.ts`

**Scenario:** Cart add rejects invalid product id

**Steps:**

1. `POST` cart add with `product_id=0`.
2. Assert HTTP 200 and JSON response has no `success` field.

---

### 10. Cart API → UI (Hybrid)

**File:** `src/tests/hybrid/CartApiToUi.spec.ts`

**Scenario:** API add to cart populates the cart page UI

**Steps:**

1. Navigate to home page (establish session).
2. Open cart page and verify it is empty.
3. `POST` cart add for Nikon D300 via `page.request`.
4. Assert JSON `success` is returned.
5. Open cart page again and verify line item and checkout action.
6. Verify header cart count is 1.

---

### 11. Login Negative (Hybrid)

**File:** `src/tests/hybrid/LoginNegative.spec.ts`

**Scenario:** Invalid login POST fails and UI shows error

**Steps:**

1. Navigate directly to the login route.
2. Submit invalid credentials with a unique email and wait for login POST response.
3. Assert response status 200 and login did not reach account dashboard.
4. Assert Returning Customer form is still visible.
5. Assert UI shows login failure (credential mismatch or demo rate-limit warning) and user remains on login page.

---

## Notes

- All tests use the Playwright test runner with the Page Object Model (POM) for maintainability.
- Fixtures are defined in `src/fixtures/POMFixture.ts`.
- Product test data is in `src/data/products.ts`; billing details in `src/data/billingDetails.ts`.
- OpenCart HTTP helpers are in `src/api/` (`openCartRoutes.ts`, `OpenCartApiClient.ts`).
- Add new functional tests under `src/tests/functional/`, integration tests under `src/tests/integration/`, E2E tests under `src/tests/e2e/`, API tests under `src/tests/api/`, and hybrid tests under `src/tests/hybrid/`.
