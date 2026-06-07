import { BasePage, HardAssertions, Wait } from '@opencart-auto/pw-core';


export class OrderPlacementResultPage extends BasePage
{
    async orderPlacementResult()
    {
        await HardAssertions.visible(
            this.page.getByRole('heading', { name: 'Your order has been placed!', level: 1 })
        );
        await Wait.click(this.page.locator('.pull-right').getByRole('link', { name: 'Continue' }));
    }
}
