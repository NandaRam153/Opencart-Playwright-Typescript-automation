import {expect, type Page} from '@playwright/test';
import {BasePage} from './base/BasePage';


export class HomePage extends BasePage
{
    async navigateToURL()
    {
        const homePage = await this.goto("https://awesomeqa.com/ui/index.php?route=common/home"); // Uses abstract BasePage
        await expect(this.page).toHaveTitle("Your Store");
        return homePage;
    }

    
    async homePageCheck()
    {
        // Check ribbon menu options
        await expect.soft(this.page.getByTitle('TheTestingAcademy eCommerce')).toBeVisible();
        await expect.soft(this.page.getByPlaceholder('Search')).toBeVisible();
        await expect.soft(this.page.locator('#cart-total')).toBeVisible();

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

        // Slide show container check
        await expect.soft(this.page.locator('#slideshow0')).toBeVisible();
        // Carousel container check
        await expect.soft(this.page.locator('#carousel0')).toBeVisible();
        // Check featured products
        expect.soft(await this.page.locator('.product-thumb.transition').count()).toBeGreaterThan(0);  
        expect.soft(await this.page.getByRole('button', {name: 'Add to Cart'}).count()).toBeGreaterThan(0);
        expect.soft(await this.page.locator('button[data-original-title="Add to Wish List"]').count()).toBeGreaterThan(0);
        expect.soft(await this.page.locator('button[data-original-title="Compare this Product"]').count()).toBeGreaterThan(0);  
    }
}