import { expect } from '@playwright/test';
import { test } from '../../fixtures/POMFixture';
import { CartAddResponse, OpenCartApiClient } from '../../api/OpenCartApiClient';
import { products, requireProductId } from '../../data/products';

test('API add to cart populates the cart page UI', async ({
    page,
    homePage,
    cartPage,
    header,
}) => {
    const product = products.NIKON_D300;
    const api = new OpenCartApiClient(page.request);

    await homePage.navigateToURL();
    await cartPage.navigate();
    await cartPage.assertEmpty();

    const { json } = await api.addToCart(requireProductId(product, 'NIKON_D300'), 1);
    expect((json as CartAddResponse).success).toBeTruthy();

    await cartPage.navigate();
    await cartPage.assertLineItem(product.name);
    await cartPage.assertCheckoutActionVisible();
    await header.verifyCartCount(1);
});
