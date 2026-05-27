import { test } from '../../fixtures/POMFixture';
import { products } from '../../data/products';

test.describe('Ribbon Category Navigation → Product Listing', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToURL();
    });

    test('clicking Cameras in ribbon loads the Cameras category page', async ({ ribbon, productListingPage }) => {
        await ribbon.openProductPage();

        await productListingPage.verifyCategory('Cameras');
    });

    test('Cameras category page shows at least one product', async ({ ribbon, productListingPage }) => {
        await ribbon.openProductPage();

        await productListingPage.verifyAtLeastOneProduct();
    });

    test('Cameras category page lists Nikon D300', async ({ ribbon, productListingPage }) => {
        await ribbon.openProductPage();

        await productListingPage.CheckProductListed(products.NIKON_D300.name);
    });

    test('Cameras category page lists Canon EOS 5D', async ({ ribbon, productListingPage }) => {
        await ribbon.openProductPage();

        await productListingPage.CheckProductListed(products.CANON_EOS_5D.name);
    });
});
