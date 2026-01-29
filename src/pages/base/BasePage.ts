import { Page, Locator, expect } from '@playwright/test';


export abstract class BasePage 
{
    protected readonly page: Page;

    constructor(page: Page) 
    {
        this.page = page;
    }

    async goto(path: string) 
    {
        await this.page.goto(path, { waitUntil: 'load' });
    }

    async click(locator: Locator) 
    {
        await locator.click();
    }

    async waitForVisible(locator: Locator) 
    {
        await expect(locator).toBeVisible();
    }

    async waitForSoftVisible(locator: Locator) 
    {
        await expect.soft(locator).toBeVisible();
    }
}
