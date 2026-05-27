import { test } from '../../fixtures/POMFixture';
import { products } from '../../data/products';

test.describe('Add to Cart → Header Cart State', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToURL();
    });

    test('adding a product from category page shows success message', async ({ ribbon, productListingPage }) => {
        await ribbon.openProductPage();

        await productListingPage.addToCartProductByName(products.NIKON_D300.name);
        await productListingPage.productAddedMessage(products.NIKON_D300.name);
    });

    test('adding a product from search results shows success message', async ({ header, productListingPage }) => {
        await header.searchForProduct(products.NIKON_D300.name);

        await productListingPage.addToCartProductByName(products.NIKON_D300.name);
        await productListingPage.productAddedMessage(products.NIKON_D300.name);
    });

    test('adding a product updates the header cart count to 1', async ({ ribbon, productListingPage, header }) => {
        await ribbon.openProductPage();

        await productListingPage.addToCartProductByName(products.NIKON_D300.name);
        await header.verifyCartCount(1);
    });

    test('checkout page is reachable from header after adding a product', async ({ ribbon, productListingPage, header }) => {
        await ribbon.openProductPage();

        await productListingPage.addToCartProductByName(products.NIKON_D300.name);
        await header.gotoCheckout();
    });
});
