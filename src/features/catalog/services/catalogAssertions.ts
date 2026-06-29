import { expect } from '@playwright/test';
import { NO_SEARCH_RESULTS_MESSAGE } from '../state/searchMessages';

export function assertProductInHtml(body: string, productName: string) {
    expect(body).toContain(productName);
}

export function assertNoSearchResults(body: string) {
    expect(body).toContain(NO_SEARCH_RESULTS_MESSAGE);
}
