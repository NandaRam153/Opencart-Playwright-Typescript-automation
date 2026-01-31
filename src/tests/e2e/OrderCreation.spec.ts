import { billingData } from '../../data/billingDetails';
import {test} from '../../fixtures/POMFixture'
import {products} from '../../data/products'


test('Order creation test', async ({homePage, ribbon, productListingPage, header, checkoutPage, orderPlacementResultPage}) =>
{
    await homePage.navigateToURL();
    // Add a camera from ribbon
    await ribbon.openProductPage();
    // Add product and check message
    await productListingPage.addToCartProductByName(products.NIKON_D300.name);
    await productListingPage.productAddedMessage(products.NIKON_D300.name);
    // Complete checkout
    await header.gotoCheckout();
    await checkoutPage.completeGuestCheckout(billingData);
    await orderPlacementResultPage.orderPlacementResult();
});