# OpenCart Demo Store Test Plan

## Application Overview

This plan covers the main user journeys and edge cases for the OpenCart demo store, including navigation, product search, cart operations, account management, and footer links. Each scenario is independent and assumes a fresh state.

## Test Scenarios

### 1. Home Page and Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Home Page Loads Successfully

**File:** `tests/homepage-loads.spec.ts`

**Steps:**
  1. Navigate to the home page.
    - expect: The page title is "Your Store".
    - expect: Main navigation, search bar, featured products, and footer are visible.

#### 1.2. Main Navigation Links

**File:** `tests/main-navigation-links.spec.ts`

**Steps:**
  1. Click each top navigation link (Desktops, Laptops & Notebooks, etc.).
    - expect: Each link navigates to the correct category page.

#### 1.3. Search Functionality (Happy Path)

**File:** `tests/search-happy-path.spec.ts`

**Steps:**
  1. Enter "MacBook" in the search box.
    - expect: Search results include "MacBook".
  2. Click the search button.

#### 1.4. Search Functionality (No Results)

**File:** `tests/search-no-results.spec.ts`

**Steps:**
  1. Enter a random string (e.g., "xyz123") in the search box.
    - expect: A "no results" message is displayed.
  2. Click the search button.

### 2. Product and Cart Operations

**Seed:** `tests/seed.spec.ts`

#### 2.1. Add Featured Product to Cart

**File:** `tests/add-featured-to-cart.spec.ts`

**Steps:**
  1. Click "Add to Cart" on a featured product.
    - expect: Cart updates to show 1 item.
    - expect: Success message is displayed.

#### 2.2. View Cart

**File:** `tests/view-cart.spec.ts`

**Steps:**
  1. Click the cart button in the header.
    - expect: Cart dropdown/modal displays added products.

#### 2.3. Remove Product from Cart

**File:** `tests/remove-from-cart.spec.ts`

**Steps:**
  1. Add a product to the cart.
  2. Open the cart and remove the product.
    - expect: Cart updates to 0 items.

#### 2.4. Add to Wish List (Not Logged In)

**File:** `tests/wishlist-not-logged-in.spec.ts`

**Steps:**
  1. Click the "Wish List" button on a product.
    - expect: Redirected to login page or shown a login prompt.

### 3. Account Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. Access My Account (Not Logged In)

**File:** `tests/account-not-logged-in.spec.ts`

**Steps:**
  1. Click "My Account" in the header.
    - expect: Login/register page is displayed.

#### 3.2. Register New Account (Negative - Existing Email)

**File:** `tests/register-existing-email.spec.ts`

**Steps:**
  1. Attempt to register with an email already in use.
    - expect: Error message about duplicate email.

#### 3.3. Login with Invalid Credentials

**File:** `tests/login-invalid-credentials.spec.ts`

**Steps:**
  1. Enter invalid credentials on the login page.
    - expect: Error message is displayed.

### 4. Footer and Information Links

**Seed:** `tests/seed.spec.ts`

#### 4.1. Footer Information Links

**File:** `tests/footer-links.spec.ts`

**Steps:**
  1. Click each link under "Information", "Customer Service", "Extras", and "My Account" in the footer.
    - expect: Each link navigates to the correct informational page.

### 5. Edge Cases and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 5.1. Add Out-of-Stock Product to Cart

**File:** `tests/add-out-of-stock.spec.ts`

**Steps:**
  1. Attempt to add an out-of-stock product to the cart (if available).
    - expect: Appropriate error or warning is shown.

#### 5.2. Cart Persistence After Refresh

**File:** `tests/cart-persistence.spec.ts`

**Steps:**
  1. Add a product to the cart.
  2. Refresh the page.
    - expect: Cart still contains the product.

#### 5.3. Currency Switcher

**File:** `tests/currency-switcher.spec.ts`

**Steps:**
  1. Change the currency using the "$ Currency" dropdown.
    - expect: Prices update to the selected currency.
