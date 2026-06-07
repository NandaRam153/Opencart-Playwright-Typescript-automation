import { Locator } from '@playwright/test';
/**
 * Soft assertions collect multiple failures — use in audit/*Check methods.
 */
export declare const SoftAssertions: {
    visible(locator: Locator, message?: string): Promise<void>;
    hidden(locator: Locator, message?: string): Promise<void>;
    containsText(locator: Locator, text: string | RegExp | (string | RegExp)[], message?: string): Promise<void>;
    hasText(locator: Locator, text: string | RegExp | (string | RegExp)[], message?: string): Promise<void>;
    count(locator: Locator, expected: number, message?: string): Promise<void>;
    atLeastOne(locator: Locator, message?: string): Promise<void>;
};
/**
 * Hard assertions fail fast — use in flows, actions, and post-condition checks.
 */
export declare const HardAssertions: {
    visible(locator: Locator, message?: string): Promise<void>;
    hidden(locator: Locator, message?: string): Promise<void>;
    containsText(locator: Locator, text: string | RegExp | (string | RegExp)[], message?: string): Promise<void>;
    hasText(locator: Locator, text: string | RegExp | (string | RegExp)[], message?: string): Promise<void>;
    count(locator: Locator, expected: number, message?: string): Promise<void>;
    atLeastOne(locator: Locator, message?: string): Promise<void>;
};
/** @deprecated Use SoftAssertions or HardAssertions directly. */
export declare class Assertions {
    static soft: {
        visible(locator: Locator, message?: string): Promise<void>;
        hidden(locator: Locator, message?: string): Promise<void>;
        containsText(locator: Locator, text: string | RegExp | (string | RegExp)[], message?: string): Promise<void>;
        hasText(locator: Locator, text: string | RegExp | (string | RegExp)[], message?: string): Promise<void>;
        count(locator: Locator, expected: number, message?: string): Promise<void>;
        atLeastOne(locator: Locator, message?: string): Promise<void>;
    };
    static hard: {
        visible(locator: Locator, message?: string): Promise<void>;
        hidden(locator: Locator, message?: string): Promise<void>;
        containsText(locator: Locator, text: string | RegExp | (string | RegExp)[], message?: string): Promise<void>;
        hasText(locator: Locator, text: string | RegExp | (string | RegExp)[], message?: string): Promise<void>;
        count(locator: Locator, expected: number, message?: string): Promise<void>;
        atLeastOne(locator: Locator, message?: string): Promise<void>;
    };
}
//# sourceMappingURL=assertions.d.ts.map