import { BasePage, HardAssertions } from '@opencart-auto/pw-core';
import { HOME_CONTINUE_URL_PATTERN } from '../state/paths';

export class OrderPlacementResultPage extends BasePage {
    async orderPlacementResult() {
        await HardAssertions.visible(
            this.page.getByRole('heading', { name: 'Your order has been placed!', level: 1 })
        );
        const continueLink = this.page
            .locator('.pull-right')
            .getByRole('link', { name: 'Continue' });
        await Promise.all([
            this.page.waitForURL(HOME_CONTINUE_URL_PATTERN, { timeout: 15_000 }),
            continueLink.click(),
        ]);
    }
}
