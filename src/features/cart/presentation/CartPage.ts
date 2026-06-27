import { BasePage, HardAssertions } from '@opencart-auto/pw-core';
import { CartPaths } from '../state/paths';

export class CartPage extends BasePage {
    private get content() {
        return this.page.locator('#content');
    }

    async navigateToCart() {
        await this.goto(CartPaths.list);
        await HardAssertions.visible(this.page.getByRole('heading', { name: 'Shopping Cart', level: 1 }));
    }

    async assertEmpty() {
        await HardAssertions.visible(this.content.getByText('Your shopping cart is empty!'));
    }

    async assertLineItem(productName: string, quantity?: number) {
        const row = this.content.locator('table tbody tr').filter({
            has: this.page.getByRole('link', { name: productName }),
        });
        await HardAssertions.visible(row);
        if (quantity !== undefined) {
            await HardAssertions.toHaveValue(row.locator('input[name*="quantity"]'), String(quantity));
        }
    }

    async assertCheckoutActionVisible() {
        await HardAssertions.visible(
            this.content
                .getByRole('link', { name: 'Checkout' })
                .or(this.content.getByRole('link', { name: 'Proceed to Checkout' }))
        );
    }
}
