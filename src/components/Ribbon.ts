import {expect, type Page} from '@playwright/test';
import { BaseComponent } from '../pages/base/BaseComponent';


export class Ribbon extends BaseComponent
{
    async ribbonCheck()
    {
        const ribbonMenuWithDDL: string[][] = [['Desktops', 'Show All Desktops'], ['Laptops & Notebooks', 'Show All Laptops & Notebooks'], 
                        ['Components', 'Show All Components'], ['MP3 Players', 'Show All MP3 Players']];
        const ribbonMenu: string[] =['Tablets', 'Software', 'Phones & PDAs', 'Cameras' ];  
        let locator;

        for (const ribbon of ribbonMenuWithDDL)
        {
            locator = this.page.getByRole('link', {name: ribbon[0]});
            if (await locator.isVisible())
            {
                await locator.click();
                await expect(this.page.getByRole('link', {name: ribbon[1]})).toHaveCount(1);
            }
        }
        // Parallel assertions for all from ribbonMenu
        await Promise.all(ribbonMenu.map(ribbon => expect.soft(this.page.getByRole('link', {name: ribbon})).toBeVisible()));
    }

    async OpenProductPage()
    {
        const product = 'Cameras'
        await this.click(this.page.getByRole('link', {name: product}));
        await expect(this.page.getByRole('heading', {name: product, level: 2})).toBeVisible();
    }
}