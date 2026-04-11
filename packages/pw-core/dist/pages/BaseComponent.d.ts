import { Page, Locator } from '@playwright/test';
export declare abstract class BaseComponent {
    protected readonly page: Page;
    constructor(page: Page);
    click(locator: Locator): Promise<void>;
}
//# sourceMappingURL=BaseComponent.d.ts.map