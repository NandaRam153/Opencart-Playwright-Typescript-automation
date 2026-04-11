import { Locator, Page } from '@playwright/test';
export declare class Wait {
    static forPageLoad(page: Page): Promise<void>;
    static forDOM(page: Page): Promise<void>;
    static forVisible(locator: Locator): Promise<void>;
    static forHidden(locator: Locator): Promise<void>;
    static forAtLeastOne(locator: Locator): Promise<void>;
    static click(locator: Locator): Promise<void>;
    static forNetworkIdle(page: Page): Promise<void>;
}
//# sourceMappingURL=wait.d.ts.map