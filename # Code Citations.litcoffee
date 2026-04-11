# Code Citations

## License: MIT
https://github.com/omarkhairy21/khairy.me/blob/7a5ebc7e70c156c7cdef6abb9980adfc5e7c07af/data/blog/setup-monorepo-with-pnpm-typescript.mdx

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    
```


## License: MIT
https://github.com/omarkhairy21/khairy.me/blob/7a5ebc7e70c156c7cdef6abb9980adfc5e7c07af/data/blog/setup-monorepo-with-pnpm-typescript.mdx

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    
```


## License: MIT
https://github.com/omarkhairy21/khairy.me/blob/7a5ebc7e70c156c7cdef6abb9980adfc5e7c07af/data/blog/setup-monorepo-with-pnpm-typescript.mdx

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    
```


## License: MIT
https://github.com/omarkhairy21/khairy.me/blob/7a5ebc7e70c156c7cdef6abb9980adfc5e7c07af/data/blog/setup-monorepo-with-pnpm-typescript.mdx

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    
```


## License: MIT
https://github.com/omarkhairy21/khairy.me/blob/7a5ebc7e70c156c7cdef6abb9980adfc5e7c07af/data/blog/setup-monorepo-with-pnpm-typescript.mdx

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    
```


## License: MIT
https://github.com/omarkhairy21/khairy.me/blob/7a5ebc7e70c156c7cdef6abb9980adfc5e7c07af/data/blog/setup-monorepo-with-pnpm-typescript.mdx

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    
```


## License: MIT
https://github.com/omarkhairy21/khairy.me/blob/7a5ebc7e70c156c7cdef6abb9980adfc5e7c07af/data/blog/setup-monorepo-with-pnpm-typescript.mdx

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    
```


## License: MIT
https://github.com/omarkhairy21/khairy.me/blob/7a5ebc7e70c156c7cdef6abb9980adfc5e7c07af/data/blog/setup-monorepo-with-pnpm-typescript.mdx

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    
```


## License: unknown
https://github.com/JIdayyy/create-rollup-template/blob/25f52e2faa7d219667308574d18079a9238da72e/src/templates/tsconfig.ts

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    "@playwright/test": ">=1.40.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.58.1",
    "typescript": "^5.0.0"
  }
}
```

Key: `@playwright/test` is a **peerDependency** — the consuming test project provides the actual version.

### 3. Framework `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "
```


## License: unknown
https://github.com/JIdayyy/create-rollup-template/blob/25f52e2faa7d219667308574d18079a9238da72e/src/templates/tsconfig.ts

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    "@playwright/test": ">=1.40.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.58.1",
    "typescript": "^5.0.0"
  }
}
```

Key: `@playwright/test` is a **peerDependency** — the consuming test project provides the actual version.

### 3. Framework `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "
```


## License: unknown
https://github.com/JIdayyy/create-rollup-template/blob/25f52e2faa7d219667308574d18079a9238da72e/src/templates/tsconfig.ts

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    "@playwright/test": ">=1.40.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.58.1",
    "typescript": "^5.0.0"
  }
}
```

Key: `@playwright/test` is a **peerDependency** — the consuming test project provides the actual version.

### 3. Framework `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "
```


## License: unknown
https://github.com/JIdayyy/create-rollup-template/blob/25f52e2faa7d219667308574d18079a9238da72e/src/templates/tsconfig.ts

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    "@playwright/test": ">=1.40.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.58.1",
    "typescript": "^5.0.0"
  }
}
```

Key: `@playwright/test` is a **peerDependency** — the consuming test project provides the actual version.

### 3. Framework `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "
```


## License: unknown
https://github.com/JIdayyy/create-rollup-template/blob/25f52e2faa7d219667308574d18079a9238da72e/src/templates/tsconfig.ts

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    "@playwright/test": ">=1.40.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.58.1",
    "typescript": "^5.0.0"
  }
}
```

Key: `@playwright/test` is a **peerDependency** — the consuming test project provides the actual version.

### 3. Framework `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "
```


## License: unknown
https://github.com/JIdayyy/create-rollup-template/blob/25f52e2faa7d219667308574d18079a9238da72e/src/templates/tsconfig.ts

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    "@playwright/test": ">=1.40.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.58.1",
    "typescript": "^5.0.0"
  }
}
```

Key: `@playwright/test` is a **peerDependency** — the consuming test project provides the actual version.

### 3. Framework `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "
```


## License: unknown
https://github.com/JIdayyy/create-rollup-template/blob/25f52e2faa7d219667308574d18079a9238da72e/src/templates/tsconfig.ts

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    "@playwright/test": ">=1.40.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.58.1",
    "typescript": "^5.0.0"
  }
}
```

Key: `@playwright/test` is a **peerDependency** — the consuming test project provides the actual version.

### 3. Framework `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "
```


## License: unknown
https://github.com/JIdayyy/create-rollup-template/blob/25f52e2faa7d219667308574d18079a9238da72e/src/templates/tsconfig.ts

```
Here's how to break this project into a **reusable framework package** and a **test project** that consumes it.

---

## Current Structure — What Goes Where

| Framework Package (`opencart-pw-framework`) | Test Project (this repo) |
|---|---|
| `src/pages/base/BasePage.ts` | `src/tests/**/*.spec.ts` |
| `src/pages/base/BaseComponent.ts` | `src/data/` (test data) |
| `src/pages/mainPages/*.ts` | `playwright.config.ts` |
| `src/pages/products/*.ts` | `docker-compose.yml` / `Dockerfile` |
| `src/components/*.ts` | `package.json` (tests) |
| `src/models/*.ts` | |
| `src/utils/*.ts` | |
| `src/fixtures/POMFixture.ts` | |

---

## Step-by-step Plan

### 1. Create the framework package

Create a new repo/folder, e.g. `opencart-pw-framework/`:

```
opencart-pw-framework/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              ← barrel export
│   ├── pages/
│   │   ├── base/
│   │   │   ├── BasePage.ts
│   │   │   └── BaseComponent.ts
│   │   ├── mainPages/
│   │   │   ├── HomePage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OrderPlacementResultPage.ts
│   │   │   └── WishListPage.ts
│   │   └── products/
│   │       └── ProductListingPage.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── Ribbon.ts
│   ├── models/
│   │   ├── IBillingDetails.ts
│   │   ├── IProduct.ts
│   │   └── IProductCategory.ts
│   ├── utils/
│   │   ├── assertions.ts
│   │   └── wait.ts
│   └── fixtures/
│       └── POMFixture.ts
```

### 2. Framework `package.json`

```json
{
  "name": "@yourorg/opencart-pw-framework",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    "@playwright/test": ">=1.40.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.58.1",
    "typescript": "^5.0.0"
  }
}
```

Key: `@playwright/test` is a **peerDependency** — the consuming test project provides the actual version.

### 3. Framework `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "
```

