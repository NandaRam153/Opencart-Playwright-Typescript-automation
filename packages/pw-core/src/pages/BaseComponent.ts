import { Page, Locator } from '@playwright/test';


export abstract class BaseComponent 
{
    protected readonly page: Page;

    constructor(page: Page) 
    {
        this.page = page;
    }

    async click(locator: Locator) 
    {
        await locator.click();
    }
}
