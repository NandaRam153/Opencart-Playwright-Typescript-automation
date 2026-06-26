import { billingData } from '../../features/checkout';
import { test } from '../../fixtures/POMFixture';
import { products } from '../../features/catalog';

test('Order creation test', async ({
    homePage,
    ribbon,
    productListingPage,
    header,
    checkoutPage,
    orderPlacementResultPage,
}) => {
    await homePage.navigateToURL();
    await ribbon.openProductPage(products.NIKON_D300.category!);
    await productListingPage.addToCartProductByName(products.NIKON_D300.name);
    await productListingPage.productAddedMessage(products.NIKON_D300.name);
    await header.gotoCheckout();
    await checkoutPage.completeGuestCheckout(billingData);
    await orderPlacementResultPage.orderPlacementResult();
});
