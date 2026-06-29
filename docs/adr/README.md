# Architectural Decision Records

Recorded design decisions for the OpenCart Playwright automation suite.

| ADR                                         | Title                                                             | Status   |
| ------------------------------------------- | ----------------------------------------------------------------- | -------- |
| [001](001-feature-module-layers.md)         | Feature modules with presentation / state / services layers       | Accepted |
| [002](002-ci-wishlist-credentials.md)       | CI wishlist E2E credentials (skip vs fail policy)                 | Accepted |
| [003](003-feature-scoped-api-services.md)   | Feature-scoped HTTP services (`CatalogService`, `CartService`)    | Accepted |
| [004](004-login-presentation-separation.md) | Generic login vs flow-specific landing assertions                 | Accepted |
| [005](005-layered-quality-gates.md)         | Layered quality gates (CI jobs, `@smoke` / `@wishlist`, Husky)    | Accepted |
| [006](006-presentation-state-separation.md) | Extract test data and routes from presentation into feature state | Accepted |

## Related documentation

| Document                                   | Purpose                                 |
| ------------------------------------------ | --------------------------------------- |
| [../ARCHITECTURE.md](../ARCHITECTURE.md)   | System design, feature map, diagrams    |
| [../QUALITY-GATES.md](../QUALITY-GATES.md) | CI matrix and local `verify:*` commands |
| [../VERIFICATION.md](../VERIFICATION.md)   | Pre-PR verification checklist           |
| [../CONTRIBUTING.md](../CONTRIBUTING.md)   | Fork/PR workflow and layer rules        |
