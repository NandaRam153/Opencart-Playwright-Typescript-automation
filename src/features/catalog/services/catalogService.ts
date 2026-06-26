import { APIRequestContext } from '@playwright/test';
import { OpenCartRoutes } from '../../../shared/services/routes/openCartRoutes';

export class CatalogService {
    constructor(private readonly request: APIRequestContext) {}

    async searchHtml(term: string) {
        const response = await this.request.get(OpenCartRoutes.search(term));
        const body = await response.text();
        return { status: response.status(), ok: response.ok(), body };
    }
}
