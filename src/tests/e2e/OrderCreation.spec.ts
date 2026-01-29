import { billingData } from '../../data/billingDetails';
import {test} from '../../fixtures/POManager'


test('Order creation test', async ({homePage, ribbon, productListingPage, header, checkoutPage, orderPlacementResultPage}) =>
{
    await homePage.navigateToURL();
    // Add a camera from ribbon
    await ribbon.OpenProductPage();
    // Add product and check message
    await productListingPage.addToCartProductByName("Nikon D300");
    await productListingPage.productAddedMessage("Nikon D300");
    // Complete checkout
    await header.gotoCheckout();
    await checkoutPage.completeGuestCheckout(billingData);
    await orderPlacementResultPage.orderPlacementResult();
});