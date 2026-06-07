import { test } from '../../fixtures/POMFixture';
import { expect } from '@playwright/test';
import { products } from '../../data/products';

test.describe('Search → Product Listing', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToURL();
    });

    test('searching by exact product name lists that product', async ({ header, productListingPage }) => {
        await header.searchForProduct('Nikon');

        await productListingPage.checkProductListed(products.NIKON_D300.name);
    });

    test('searching by brand name returns at least one result', async ({ header, productListingPage }) => {
        await header.searchForProduct('Canon');

        const count = await productListingPage.getProductCount();
        expect(count).toBeGreaterThanOrEqual(1);
    });

    test('searching by brand name lists a known product from that brand', async ({ header, productListingPage }) => {
        await header.searchForProduct('Canon');

        await productListingPage.checkProductListed(products.CANON_EOS_5D.name);
    });

    test('searching by product name shows at least one result', async ({ header, productListingPage }) => {
        await header.searchForProduct(products.IPHONE.name);

        await productListingPage.verifyAtLeastOneProduct();
        await productListingPage.checkProductListed(products.IPHONE.name);
    });
});
