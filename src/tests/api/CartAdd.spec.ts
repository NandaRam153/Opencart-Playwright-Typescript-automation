import { assertCartAddRejected } from '../../features/cart';
import { expect, test } from '../../fixtures/ApiFixture';

test('cart add rejects invalid product id', async ({ cartService }) => {
    const { status, json } = await cartService.addProduct(0);

    expect(status).toBe(200);
    assertCartAddRejected(json);
});
