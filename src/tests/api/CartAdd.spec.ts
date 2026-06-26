import { test, expect } from '@playwright/test';
import { OpenCartApiClient } from '../../api/OpenCartApiClient';

test('cart add rejects invalid product id', async ({ request }) => {
    const api = new OpenCartApiClient(request);
    const { status, json } = await api.addToCart(0);

    expect(status).toBe(200);
    OpenCartApiClient.assertCartAddRejected(json);
});
