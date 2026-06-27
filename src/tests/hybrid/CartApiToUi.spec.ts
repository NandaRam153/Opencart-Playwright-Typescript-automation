import { type CartAddResponse } from '../../features/cart';
import { products, requireProductId } from '../../features/catalog';
import { expect, test } from '../../fixtures/POMFixture';

test(
    'API add to cart populates the cart page UI',
    { tag: '@smoke' },
    async ({ homePage, cartPage, header, sessionCartService }) => {
        const product = products.NIKON_D300;

        await homePage.navigateToURL();
        await cartPage.navigateToCart();
        await cartPage.assertEmpty();

        const { json } = await sessionCartService.addProduct(
            requireProductId(product, 'NIKON_D300'),
            1
        );
        expect((json as CartAddResponse).success).toBeTruthy();

        await cartPage.navigateToCart();
        await cartPage.assertLineItem(product.name);
        await cartPage.assertCheckoutActionVisible();
        await header.verifyCartCount(1);
    }
);
