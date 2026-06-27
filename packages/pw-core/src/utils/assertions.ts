import { Locator, Page, expect } from '@playwright/test';

/**
 * Soft assertions collect multiple failures — use in audit/*Check methods.
 */
export const SoftAssertions = {
    async visible(locator: Locator, message?: string) {
        await expect.soft(locator, message).toBeVisible();
    },

    async hidden(locator: Locator, message?: string) {
        await expect.soft(locator, message).toBeHidden();
    },

    async containsText(
        locator: Locator,
        text: string | RegExp | (string | RegExp)[],
        message?: string
    ) {
        await expect.soft(locator, message).toContainText(text);
    },

    async hasText(locator: Locator, text: string | RegExp | (string | RegExp)[], message?: string) {
        await expect.soft(locator, message).toHaveText(text);
    },

    async count(locator: Locator, expected: number, message?: string) {
        await expect.soft(locator, message).toHaveCount(expected);
    },

    async atLeastOne(locator: Locator, message?: string) {
        const count = await locator.count();
        expect.soft(count, message).toBeGreaterThan(0);
    },
};

/**
 * Hard assertions fail fast — use in flows, actions, and post-condition checks.
 */
export const HardAssertions = {
    async visible(locator: Locator, message?: string) {
        await expect(locator, message).toBeVisible();
    },

    async hidden(locator: Locator, message?: string) {
        await expect(locator, message).toBeHidden();
    },

    async containsText(
        locator: Locator,
        text: string | RegExp | (string | RegExp)[],
        message?: string
    ) {
        await expect(locator, message).toContainText(text);
    },

    async hasText(locator: Locator, text: string | RegExp | (string | RegExp)[], message?: string) {
        await expect(locator, message).toHaveText(text);
    },

    async count(locator: Locator, expected: number, message?: string) {
        await expect(locator, message).toHaveCount(expected);
    },

    async atLeastOne(locator: Locator, message?: string) {
        const count = await locator.count();
        expect(count, message).toBeGreaterThan(0);
    },

    async hasTitle(page: Page, title: string | RegExp, message?: string) {
        await expect(page, message).toHaveTitle(title);
    },

    async toHaveValue(locator: Locator, value: string, message?: string) {
        await expect(locator, message).toHaveValue(value);
    },
};
