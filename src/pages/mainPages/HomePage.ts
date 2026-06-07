import {expect} from '@playwright/test';
import {BasePage} from '@opencart-auto/pw-core';


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
        await this.waitForSoftVisible(this.page.getByTitle('TheTestingAcademy eCommerce'));
        await this.waitForSoftVisible(this.page.getByPlaceholder('Search'));
        await this.waitForSoftVisible(this.page.locator('#cart-total'));
        await this.waitForSoftVisible(this.page.locator('#slideshow0'));
        await this.waitForSoftVisible(this.page.locator('#carousel0'));
        // Check featured products
        expect.soft(await this.page.locator('.product-thumb.transition').count()).toBeGreaterThan(0);  
        expect.soft(await this.page.getByRole('button', {name: 'Add to Cart'}).count()).toBeGreaterThan(0);
        expect.soft(await this.page.locator('button[data-original-title="Add to Wish List"]').count()).toBeGreaterThan(0);
        expect.soft(await this.page.locator('button[data-original-title="Compare this Product"]').count()).toBeGreaterThan(0);  
    }
}