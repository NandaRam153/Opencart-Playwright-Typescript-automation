import { test as base } from '@playwright/test';
import { CartService } from '../features/cart';
import { CatalogService } from '../features/catalog';
import { serviceFromRequest } from './fixtureHelpers';

export const test = base.extend<{
    cartService: CartService;
    catalogService: CatalogService;
}>({
    cartService: serviceFromRequest((request) => new CartService(request)),
    catalogService: serviceFromRequest((request) => new CatalogService(request)),
});

export { expect } from '@playwright/test';
