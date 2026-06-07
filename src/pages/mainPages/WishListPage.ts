import { BasePage, HardAssertions, Wait } from '@opencart-auto/pw-core';


export class WishListPage extends BasePage
{
    async checkForProductByName(product: string)
    {
        const productRow = this.page.locator('tr', {
            has: this.page.locator('td', { hasText: product }),
        });
        await HardAssertions.visible(productRow);
    }

    async removeProductByName(product: string)
    {
        const row = this.page.locator('tr', { has: this.page.getByText(product) });
        await Wait.click(row.locator('a[data-original-title="Remove"]'));
        await HardAssertions.hidden(row);
    }
}
