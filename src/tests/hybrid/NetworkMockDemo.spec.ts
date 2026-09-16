import { MOCK_CART_ADD_ERROR_BODY } from '../../features/cart';
import { getSearchTerm, products } from '../../features/catalog';
import {
    expectDialogContains,
    fulfillCartAddHttpError,
    fulfillEmptyCartDocument,
} from '../../fixtures/networkMockHelpers';
import { test } from '../../fixtures/POMFixture';

test.describe('Network mocks (route.fulfill)', { tag: '@mock' }, () => {
    test('empty cart document is rendered from a fulfilled HTML response', async ({
        page,
        cartPage,
    }) => {
        await fulfillEmptyCartDocument(page);

        await cartPage.navigateToCart();
        await cartPage.assertEmpty();
        await cartPage.assertCheckoutActionHidden();
    });

    test('cart add HTTP error is surfaced via the storefront ajax error alert', async ({
        page,
        productListingPage,
    }) => {
        await fulfillCartAddHttpError(page);

        // This OpenCart build's cart.add uses window.alert on jQuery ajax HTTP errors.
        const dialogPromise = page.waitForEvent('dialog');

        await productListingPage.openSearchResults(getSearchTerm(products.NIKON_D300));
        await productListingPage.checkProductListed(products.NIKON_D300.name);
        await productListingPage.addToCartProductByName(products.NIKON_D300.name);
        await expectDialogContains(dialogPromise, MOCK_CART_ADD_ERROR_BODY);
        await productListingPage.assertNoAddToCartSuccess();
    });
});
