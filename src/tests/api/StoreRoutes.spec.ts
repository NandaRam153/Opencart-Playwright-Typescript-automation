import { test, expect } from '@playwright/test';
import {
    CatalogService,
    assertNoSearchResults,
    assertProductInHtml,
    getSearchTerm,
    products,
} from '../../features/catalog';

test.describe('Store search routes', () => {
    test('search route returns a known catalog product', async ({ request }) => {
        const catalogService = new CatalogService(request);
        const { ok, body } = await catalogService.searchHtml(getSearchTerm(products.NIKON_D300));

        expect(ok).toBeTruthy();
        assertProductInHtml(body, products.NIKON_D300.name);
    });

    test('search route reports no results for unknown term', async ({ request }) => {
        const catalogService = new CatalogService(request);
        const { ok, body } = await catalogService.searchHtml('zzzznonexistentproduct12345');

        expect(ok).toBeTruthy();
        assertNoSearchResults(body);
    });
});
