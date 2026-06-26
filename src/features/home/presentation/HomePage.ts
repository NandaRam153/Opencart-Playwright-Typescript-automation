import { expect } from '@playwright/test';
import { BasePage, SoftAssertions } from '@opencart-auto/pw-core';
import { HomePaths } from '../state/paths';

const SEARCH_PLACEHOLDER = 'Search';

export class HomePage extends BasePage {
    async navigateToURL(): Promise<void> {
        await this.goto(HomePaths.home);
        await expect(this.page).toHaveTitle('Your Store');
    }

    async homePageCheck() {
        await this.waitForSoftVisible(this.page.getByTitle('TheTestingAcademy eCommerce'));
        await this.waitForSoftVisible(this.page.getByPlaceholder(SEARCH_PLACEHOLDER));
        await this.waitForSoftVisible(this.page.locator('#cart-total'));
        await this.waitForSoftVisible(this.page.locator('#slideshow0'));
        await this.waitForSoftVisible(this.page.locator('#carousel0'));

        await SoftAssertions.atLeastOne(this.page.locator('.product-thumb.transition'));
        await SoftAssertions.atLeastOne(this.page.getByRole('button', { name: 'Add to Cart' }));
        await SoftAssertions.atLeastOne(
            this.page.locator('button[data-original-title="Add to Wish List"]')
        );
        await SoftAssertions.atLeastOne(
            this.page.locator('button[data-original-title="Compare this Product"]')
        );
    }
}
