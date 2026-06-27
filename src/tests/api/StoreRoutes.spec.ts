import {
    assertNoSearchResults,
    assertProductInHtml,
    getSearchTerm,
    products,
} from '../../features/catalog';
import { expect, test } from '../../fixtures/ApiFixture';

test.describe('Store search routes', { tag: '@smoke' }, () => {
    test('search route returns a known catalog product', async ({ catalogService }) => {
        const { ok, body } = await catalogService.searchHtml(getSearchTerm(products.NIKON_D300));

        expect(ok).toBeTruthy();
        assertProductInHtml(body, products.NIKON_D300.name);
    });

    test('search route reports no results for unknown term', async ({ catalogService }) => {
        const { ok, body } = await catalogService.searchHtml('zzzznonexistentproduct12345');

        expect(ok).toBeTruthy();
        assertNoSearchResults(body);
    });
});
