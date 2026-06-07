import { Page, Locator } from '@playwright/test';
import { Wait } from '../utils/wait';


export abstract class BaseComponent 
{
    protected readonly page: Page;

    constructor(page: Page) 
    {
        this.page = page;
    }

    async click(locator: Locator) 
    {
        await Wait.click(locator);
    }
}
