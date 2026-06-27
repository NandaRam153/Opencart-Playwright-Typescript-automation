// spec: specs/test.plan.md — Showcase: Phones & PDAs category (integration)
// seed: src/tests/seed.spec.ts

import { test } from '../../fixtures/POMFixture';
import { ribbonCategories } from '../../features/catalog';

test.describe('Ribbon Category Navigation → Phones & PDAs', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToURL();
    });

    test('clicking Phones & PDAs loads the Phones & PDAs category page', async ({
        ribbon,
        productListingPage,
    }) => {
        await ribbon.openProductPage(ribbonCategories.PHONES_PDAS);

        await productListingPage.verifyCategory(ribbonCategories.PHONES_PDAS);
        await productListingPage.verifyAtLeastOneProduct();
    });
});
