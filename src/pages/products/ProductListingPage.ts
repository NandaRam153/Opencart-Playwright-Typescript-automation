import { BasePage } from '@opencart-auto/pw-core';
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

    async getProductByName(product: string) 
    {
        return this.page.locator('.product-thumb', {
            has: this.page.getByRole('link', { name: product })});
    }

    async CheckProductListed(product: string)
    {
        expect(await this.getProductByName(product)).toBeVisible();
    }

    async addToCartProductByName(name: string)
    {
        const card = await this.getProductByName(name);
        await card.getByRole('button', {name: 'Add to Cart'}).click();
    }

    async addToWishListProductByName(product: string)
    {
        const productCard = await this.getProductByName(product);
        await productCard.locator('button[onclick^="wishlist.add"]').click();
        await this.page.waitForLoadState('domcontentloaded');
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
