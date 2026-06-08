import { APIRequestContext, expect } from '@playwright/test';
import { OpenCartRoutes } from './openCartRoutes';

export interface CartAddResponse {
    success?: string;
    error?: Record<string, string> | string;
    redirect?: string;
    total?: string;
}

export class OpenCartApiClient {
    constructor(private readonly request: APIRequestContext) {}

    async getSearchHtml(term: string) {
        const response = await this.request.get(OpenCartRoutes.search(term));
        const body = await response.text();
        return { status: response.status(), ok: response.ok(), body };
    }

    async addToCart(productId: number, quantity = 1) {
        const maxAttempts = 3;
        let lastError: unknown;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const response = await this.request.post(OpenCartRoutes.cartAdd, {
                    form: {
                        product_id: String(productId),
                        quantity: String(quantity),
                    },
                });
                const json = (await response.json()) as CartAddResponse;
                return { status: response.status(), ok: response.ok(), json };
            } catch (error) {
                lastError = error;
                if (attempt === maxAttempts) break;
            }
        }

        throw lastError;
    }

    static assertProductInHtml(body: string, productName: string) {
        expect(body).toContain(productName);
    }

    static assertNoSearchResults(body: string) {
        expect(body).toContain('There is no product that matches the search criteria.');
    }
}
