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

        await productListingPage.openSearchResults(getSearchTerm(products.NIKON_D300));
        await productListingPage.checkProductListed(products.NIKON_D300.name);

        // cart.add shows window.alert on HTTP errors; dismiss in parallel with click so
        // Playwright's post-click navigation wait is not blocked by the modal dialog.
        const dialogPromise = page.waitForEvent('dialog');
        await Promise.all([
            expectDialogContains(dialogPromise, MOCK_CART_ADD_ERROR_BODY),
            productListingPage.addToCartProductByName(products.NIKON_D300.name),
        ]);
        await productListingPage.assertNoAddToCartSuccess();
    });
});
