import type { Dialog, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { MOCK_CART_ADD_ERROR_BODY, MOCK_EMPTY_CART_PAGE_HTML } from '../features/cart';

function isCartDocumentUrl(url: URL): boolean {
    return url.searchParams.get('route') === 'checkout/cart';
}

function isCartAddUrl(url: URL): boolean {
    return url.searchParams.get('route') === 'checkout/cart/add';
}

/** Stub the cart document HTML for empty-state UI demos (ADR-009). */
export async function fulfillEmptyCartDocument(page: Page): Promise<void> {
    await page.route(isCartDocumentUrl, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'text/html; charset=UTF-8',
            body: MOCK_EMPTY_CART_PAGE_HTML,
        });
    });
}

/** Stub cart/add with HTTP 500 so storefront ajax error handling runs (ADR-009). */
export async function fulfillCartAddHttpError(page: Page): Promise<void> {
    await page.route(isCartAddUrl, async (route) => {
        await route.fulfill({
            status: 500,
            contentType: 'text/plain; charset=UTF-8',
            body: MOCK_CART_ADD_ERROR_BODY,
        });
    });
}

/** Wait for a browser dialog, assert message text, dismiss. */
export async function expectDialogContains(
    dialogPromise: Promise<Dialog>,
    expectedText: string
): Promise<void> {
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain(expectedText);
    await dialog.dismiss();
}
