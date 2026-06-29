import { BasePage, HardAssertions } from '@opencart-auto/pw-core';
import { HOME_CONTINUE_URL_PATTERN } from '../state/paths';
import {
    ORDER_CONTINUE_LINK,
    ORDER_SUCCESS_HEADING,
    ORDER_SUCCESS_HEADING_LEVEL,
} from '../state/uiConstants';

export class OrderPlacementResultPage extends BasePage {
    async orderPlacementResult() {
        await HardAssertions.visible(
            this.page.getByRole('heading', {
                name: ORDER_SUCCESS_HEADING,
                level: ORDER_SUCCESS_HEADING_LEVEL,
            })
        );
        const continueLink = this.page
            .locator('.pull-right')
            .getByRole('link', { name: ORDER_CONTINUE_LINK });
        await Promise.all([
            this.page.waitForURL(HOME_CONTINUE_URL_PATTERN, { timeout: 15_000 }),
            continueLink.click(),
        ]);
    }
}
