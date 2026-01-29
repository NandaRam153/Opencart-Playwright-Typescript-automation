import { BasePage } from '../base/BasePage';
import { expect } from '@playwright/test';


export class ProductListingPage extends BasePage 
{
    // Common locators
    productCards = this.page.locator('.product-thumb');
    categoryHeader = this.page.getByRole('heading', { level: 2 });

    async open(path: string) 
    {
        await this.goto(path);
    }

    async getProductByName(name: string) 
    {
        return this.page.locator('.product-thumb')
            .filter({ has: this.page.getByRole('link', { name }) });
    }

    async addToCartProductByName(name: string)
    {
        const card = await this.getProductByName(name);
        await card.getByRole('button', {name: 'Add to Cart'}).click();
    }

    async productAddedMessage(product: string)
    {
        const message = this.page.locator('.alert.alert-success.alert-dismissible');
        await expect.soft(message).toContainText(product);
        await expect.soft(message).toContainText('shopping cart');
    }


    async getProductCount(): Promise<number> 
    {
        return await this.productCards.count();
    }

    async verifyCategory(title: string) 
    {
        await expect(this.categoryHeader).toHaveText(title);
    }

    async verifyAtLeastOneProduct() 
    {
        await expect(this.productCards.first()).toBeVisible();
    }

    async verifyOnlyProductsFrom(expectedNames: string[]) 
    {
        const names = await this.productCards
            .locator('.caption a')
            .allTextContents();

        for (const name of names) 
        {
            expect(expectedNames).toContain(name);
        }
    }
}
