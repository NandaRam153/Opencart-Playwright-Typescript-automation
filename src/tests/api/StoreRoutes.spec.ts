import { test, expect } from '@playwright/test';
import { OpenCartApiClient } from '../../api/OpenCartApiClient';
import { getSearchTerm, products } from '../../data/products';

test.describe('Store search routes', () => {
    test('search route returns a known catalog product', async ({ request }) => {
        const api = new OpenCartApiClient(request);
        const { ok, body } = await api.getSearchHtml(getSearchTerm(products.NIKON_D300));

        expect(ok).toBeTruthy();
        OpenCartApiClient.assertProductInHtml(body, products.NIKON_D300.name);
    });

    test('search route reports no results for unknown term', async ({ request }) => {
        const api = new OpenCartApiClient(request);
        const { ok, body } = await api.getSearchHtml('zzzznonexistentproduct12345');

        expect(ok).toBeTruthy();
        OpenCartApiClient.assertNoSearchResults(body);
    });
});
