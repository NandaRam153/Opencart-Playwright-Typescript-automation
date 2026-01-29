import { Locator, Page } from '@playwright/test';


export class Wait 
{
    // Wait for page to finish loading
    static async forPageLoad(page: Page) 
    {
        await page.waitForLoadState('load');
    }

    // Wait for DOMContentLoaded
    static async forDOM(page: Page) 
    {
        await page.waitForLoadState('domcontentloaded');
    }

    // Wait for locator to be visible
    static async forVisible(locator: Locator) 
    {
        await locator.waitFor({ state: 'visible' });
    }


    // Wait for locator to be hidden
    static async forHidden(locator: Locator) 
    {
        await locator.waitFor({ state: 'hidden' });
    }

    // Wait until at least one element exists
    static async forAtLeastOne(locator: Locator) 
    {
     await locator.first().waitFor({ state: 'attached' });
    }

    // Safe click (waits before clicking)
    static async click(locator: Locator) 
    {
        await this.forVisible(locator);
        await locator.click();
    }

    // Wait for network to be idle (use sparingly)
    static async forNetworkIdle(page: Page) 
    {
        await page.waitForLoadState('networkidle');
    }
}
