import { Locator, Page, expect } from '@playwright/test';

type TextMatcher = string | RegExp | (string | RegExp)[];

async function assertVisible(locator: Locator, message: string | undefined, soft: boolean) {
    const assertion = soft ? expect.soft(locator, message) : expect(locator, message);
    await assertion.toBeVisible();
}

async function assertHidden(locator: Locator, message: string | undefined, soft: boolean) {
    const assertion = soft ? expect.soft(locator, message) : expect(locator, message);
    await assertion.toBeHidden();
}

async function assertContainsText(
    locator: Locator,
    text: TextMatcher,
    message: string | undefined,
    soft: boolean
) {
    const assertion = soft ? expect.soft(locator, message) : expect(locator, message);
    await assertion.toContainText(text);
}

async function assertHasText(
    locator: Locator,
    text: TextMatcher,
    message: string | undefined,
    soft: boolean
) {
    const assertion = soft ? expect.soft(locator, message) : expect(locator, message);
    await assertion.toHaveText(text);
}

async function assertCount(
    locator: Locator,
    expected: number,
    message: string | undefined,
    soft: boolean
) {
    const assertion = soft ? expect.soft(locator, message) : expect(locator, message);
    await assertion.toHaveCount(expected);
}

async function assertAtLeastOne(locator: Locator, message: string | undefined, soft: boolean) {
    const count = await locator.count();
    const assertion = soft ? expect.soft(count, message) : expect(count, message);
    assertion.toBeGreaterThan(0);
}

/**
 * Soft assertions collect multiple failures — use in audit/*Check methods.
 */
export const SoftAssertions = {
    async visible(locator: Locator, message?: string) {
        await assertVisible(locator, message, true);
    },

    async hidden(locator: Locator, message?: string) {
        await assertHidden(locator, message, true);
    },

    async containsText(locator: Locator, text: TextMatcher, message?: string) {
        await assertContainsText(locator, text, message, true);
    },

    async hasText(locator: Locator, text: TextMatcher, message?: string) {
        await assertHasText(locator, text, message, true);
    },

    async count(locator: Locator, expected: number, message?: string) {
        await assertCount(locator, expected, message, true);
    },

    async atLeastOne(locator: Locator, message?: string) {
        await assertAtLeastOne(locator, message, true);
    },
};

/**
 * Hard assertions fail fast — use in flows, actions, and post-condition checks.
 */
export const HardAssertions = {
    async visible(locator: Locator, message?: string) {
        await assertVisible(locator, message, false);
    },

    async hidden(locator: Locator, message?: string) {
        await assertHidden(locator, message, false);
    },

    async containsText(locator: Locator, text: TextMatcher, message?: string) {
        await assertContainsText(locator, text, message, false);
    },

    async hasText(locator: Locator, text: TextMatcher, message?: string) {
        await assertHasText(locator, text, message, false);
    },

    async count(locator: Locator, expected: number, message?: string) {
        await assertCount(locator, expected, message, false);
    },

    async atLeastOne(locator: Locator, message?: string) {
        await assertAtLeastOne(locator, message, false);
    },

    async hasTitle(page: Page, title: string | RegExp, message?: string) {
        await expect(page, message).toHaveTitle(title);
    },

    async toHaveValue(locator: Locator, value: string, message?: string) {
        await expect(locator, message).toHaveValue(value);
    },
};
