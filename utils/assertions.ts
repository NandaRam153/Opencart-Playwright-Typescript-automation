import { Locator, expect } from '@playwright/test';


export class Assertions 
{
    // Element is visible
    static async visible(locator: Locator, message?: string) 
    {
     await expect.soft(locator, message).toBeVisible();
    }

    // Element is hidden
    static async hidden(locator: Locator, message?: string) 
    {
        await expect.soft(locator, message).toBeHidden();
    }

    // Element contains text
    static async containsText(locator: Locator, text: string | string[], message?: string) 
    {
        await expect.soft(locator, message).toContainText(text);
    }

    // Element has exact text
    static async hasText(locator: Locator, text: string | string[], message?: string) 
    {
        await expect.soft(locator, message).toHaveText(text);
    }

    // Element count check
    static async count(locator: Locator, expected: number, message?: string) 
    {
        await expect.soft(locator, message).toHaveCount(expected);
    }

    // At least one element exists
    static async atLeastOne(locator: Locator, message?: string) 
    {
        const count = await locator.count();
        expect.soft(count, message).toBeGreaterThan(0);
    }
}
