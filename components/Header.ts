import {expect, type Page} from '@playwright/test';
import {BaseComponent} from '../pages/base/BaseComponent';


export class Header extends BaseComponent
{
    async headerCheck()
    {
        // Open Currency ddl and check
        const currency = this.page.getByRole('button', {name: 'Currency'});
        if (await currency.isVisible())
        {
            await currency.click();
            await expect.soft(this.page.locator('.btn-group.open'),
                        'Currency ddl did not open >> ').toHaveCount(1); 

            await expect.soft(this.page.locator('button.currency-select'),
                    'Curreny types are not correct >> ')
                .toContainText(['€ Euro', '£ Pound Sterling', '$ US Dollar']);
        }

        await expect.soft(this.page.locator('i.fa.fa-phone')).toBeVisible();

        // Open My Account ddl and check
        const acct = this.page.getByTitle('My Account');
        if (await acct.isVisible())
        {
            await acct.click();
            await expect.soft(this.page.locator('li.dropdown.open'), 
                        'My Account ddl did not open >> ').toHaveCount(1);
            await expect.soft(this.page.getByRole('link', {name: 'Register'}), 
                        'Register should be visible in My Account ddl >> ').toBeVisible();
            await expect.soft(this.page.getByRole('link', {name: 'Login'}),
                        'Login should be visible in My Account ddl >> ').toBeVisible();
        }

        // Check Wish List
        await expect.soft(this.page.locator('#wishlist-total')).toBeVisible();   
        // Check Shopping Cart
        await expect.soft(this.page.locator('a[href*="route=checkout/cart"]')).toBeVisible();
        // Check Checkout
        await expect.soft(this.page.locator('a[href*="route=checkout/checkout"]')).toBeVisible();
    }
}
