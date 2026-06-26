import { expect } from '@playwright/test';
import { test } from '../../fixtures/POMFixture';
import { CartService } from '../../features/cart';
import { products, requireProductId } from '../../features/catalog';
import { CartAddResponse } from '../../shared';

test('API add to cart populates the cart page UI', async ({
    page,
    homePage,
    cartPage,
    header,
}) => {
    const product = products.NIKON_D300;
    const cartService = new CartService(page.request);

    await homePage.navigateToURL();
    await cartPage.navigateToCart();
    await cartPage.assertEmpty();

    const { json } = await cartService.addProduct(requireProductId(product, 'NIKON_D300'), 1);
    expect((json as CartAddResponse).success).toBeTruthy();

    await cartPage.navigateToCart();
    await cartPage.assertLineItem(product.name);
    await cartPage.assertCheckoutActionVisible();
    await header.verifyCartCount(1);
});
