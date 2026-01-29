import {expect} from '@playwright/test'
import { BasePage } from '../base/BasePage';


export class OrderPlacementResultPage extends BasePage
{
    async orderPlacementResult()
    {
        await expect.soft(this.page.getByRole('heading', {name: "Your order has been placed!", level: 1})).toBeVisible();
        await this.page.locator('.pull-right').getByRole('link', {name: 'Continue'}).click();
    }
}