import {expect} from '@playwright/test'
import { BasePage } from '../base/BasePage';


export class WishListPage extends BasePage
{
    async checkForProductByName(product: string)
    {
        const productRow = this.page.locator('tr', {has: this.page.locator('td', { hasText: product })});
        await expect(productRow).toBeVisible();
    }

    async removeProductByName(product: string)
    {
        const row = this.page.locator('tr', {has: this.page.getByText(product)});
        await row.locator('a[data-original-title="Remove"]').click();

        await expect.soft(row).not.toBeVisible(); // product has been removed
    }
}