import { expect } from '@playwright/test';
import { BasePage, HardAssertions } from '@opencart-auto/pw-core';
import { OpenCartRoutes } from '../../api/openCartRoutes';

export class CartPage extends BasePage {
    private get content() {
        return this.page.locator('#content');
    }

    async navigate() {
        await this.goto(OpenCartRoutes.cart);
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
            await expect(row.locator('input[name*="quantity"]')).toHaveValue(String(quantity));
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
