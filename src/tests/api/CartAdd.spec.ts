import { test, expect } from '@playwright/test';
import { CartService, assertCartAddRejected } from '../../features/cart';

test('cart add rejects invalid product id', async ({ request }) => {
    const cartService = new CartService(request);
    const { status, json } = await cartService.addProduct(0);

    expect(status).toBe(200);
    assertCartAddRejected(json);
});
