import { Page, Locator } from '@playwright/test';
import { HardAssertions, SoftAssertions } from '../utils/assertions';
import { Wait } from '../utils/wait';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path: string) {
        await this.page.goto(path, { waitUntil: 'load' });
    }

    async click(locator: Locator) {
        await Wait.click(locator);
    }

    /** Hard assertion — use in flows. */
    async waitForVisible(locator: Locator) {
        await HardAssertions.visible(locator);
    }

    /** Soft assertion — use in audit/*Check methods. */
    async waitForSoftVisible(locator: Locator) {
        await SoftAssertions.visible(locator);
    }
}
