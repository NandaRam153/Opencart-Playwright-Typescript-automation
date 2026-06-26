import { APIRequestContext } from '@playwright/test';
import { OpenCartRoutes } from '../../../shared/services/routes/openCartRoutes';

export class CartService {
    constructor(private readonly request: APIRequestContext) {}

    async addProduct(productId: number, quantity = 1) {
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
                const json: unknown = await response.json();
                return { status: response.status(), ok: response.ok(), json };
            } catch (error) {
                lastError = error;
                if (attempt === maxAttempts) break;
            }
        }

        throw lastError;
    }
}
