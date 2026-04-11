import { Locator } from '@playwright/test';
export declare class Assertions {
    static visible(locator: Locator, message?: string): Promise<void>;
    static hidden(locator: Locator, message?: string): Promise<void>;
    static containsText(locator: Locator, text: string | string[], message?: string): Promise<void>;
    static hasText(locator: Locator, text: string | string[], message?: string): Promise<void>;
    static count(locator: Locator, expected: number, message?: string): Promise<void>;
    static atLeastOne(locator: Locator, message?: string): Promise<void>;
}
//# sourceMappingURL=assertions.d.ts.map