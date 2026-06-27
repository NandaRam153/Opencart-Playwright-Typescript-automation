import { assertCartAddRejected } from '../../features/cart';
import { expect, test } from '../../fixtures/ApiFixture';

test('cart add rejects invalid product id', { tag: '@smoke' }, async ({ cartService }) => {
    const { status, json } = await cartService.addProduct(0);

    expect(status).toBe(200);
    assertCartAddRejected(json);
});
