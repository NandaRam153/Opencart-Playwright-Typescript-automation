// spec: specs/test.plan.md — Showcase: Tablets category (integration)
// seed: src/tests/seed.spec.ts

import { test } from '../../fixtures/POMFixture';
import { ribbonCategories } from '../../features/catalog';

test.describe('Ribbon Category Navigation → Tablets', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToURL();
    });

    test('clicking Tablets loads the Tablets category page', async ({
        ribbon,
        productListingPage,
    }) => {
        await ribbon.openProductPage(ribbonCategories.TABLETS);

        await productListingPage.verifyCategory(ribbonCategories.TABLETS);
        await productListingPage.verifyAtLeastOneProduct();
    });
});
