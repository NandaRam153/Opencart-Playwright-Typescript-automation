import { expect } from '@playwright/test';

export function assertProductInHtml(body: string, productName: string) {
    expect(body).toContain(productName);
}

export function assertNoSearchResults(body: string) {
    expect(body).toContain('There is no product that matches the search criteria.');
}
