import { test } from '@playwright/test';

/**
 * Opt-in scaffolding seed for playwright-test-generator agents (not the default authoring path).
 * Excluded from test runs via testIgnore in playwright.config.ts.
 *
 * Default: skills-first + POMFixture (AGENTS.md / ADR-010).
 * Showcase outputs (seed → generator → POMFixture refactor):
 *   - src/tests/integration/TabletsCategory.spec.ts
 *   - src/tests/integration/PhonesPDAsCategory.spec.ts
 *
 * Docs: docs/test-generation-from-seed.md
 * Scenarios: specs/test.plan.md (Showcase — Tablets / Phones & PDAs)
 */
test.describe('Seed', () => {
    test('seed', async () => {
        // generate code here
    });
});
