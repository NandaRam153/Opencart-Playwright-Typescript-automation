import { Page, Locator } from '@playwright/test';
export declare abstract class BasePage {
    protected readonly page: Page;
    constructor(page: Page);
    goto(path: string): Promise<void>;
    click(locator: Locator): Promise<void>;
    /** Hard assertion — use in flows. */
    waitForVisible(locator: Locator): Promise<void>;
    /** Soft assertion — use in audit/*Check methods. */
    waitForSoftVisible(locator: Locator): Promise<void>;
}
//# sourceMappingURL=BasePage.d.ts.map