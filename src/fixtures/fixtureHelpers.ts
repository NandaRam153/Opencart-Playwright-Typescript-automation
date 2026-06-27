import type { APIRequestContext, Page } from '@playwright/test';

/** Playwright fixture factory for page objects with a `(page: Page)` constructor. */
export function pageObject<T>(Ctor: new (page: Page) => T) {
    return async ({ page }: { page: Page }, use: (value: T) => Promise<void>) => {
        await use(new Ctor(page));
    };
}

/** Playwright fixture factory for services backed by the isolated `request` fixture (API tests). */
export function serviceFromRequest<T>(factory: (request: APIRequestContext) => T) {
    return async (
        { request }: { request: APIRequestContext },
        use: (value: T) => Promise<void>
    ) => {
        await use(factory(request));
    };
}

/** Playwright fixture factory for services backed by `page.request` (hybrid / browser session). */
export function serviceFromPageRequest<T>(factory: (request: APIRequestContext) => T) {
    return async ({ page }: { page: Page }, use: (value: T) => Promise<void>) => {
        await use(factory(page.request));
    };
}
