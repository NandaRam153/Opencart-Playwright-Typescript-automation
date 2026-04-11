import {expect, type Page} from '@playwright/test';
import {BaseComponent} from '@opencart-auto/pw-core';


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

    async gotoCheckout()
    {
        await this.page.getByTitle('Checkout').click();
        await expect(this.page.getByRole('heading', {name: 'Checkout', level:1})).toBeVisible();
    }

    async searchForProduct(product: string)
    {
        await this.page.getByPlaceholder('search').fill(product);
        await this.page.locator('.btn.btn-default.btn-lg').click();
    }

    async gotoWishlist()
    {
        await this.page.locator('#wishlist-total').click();
        await expect(this.page.getByRole('heading', {name: "Returning Customer", level: 2})).toBeVisible();
    }

    async logout()
    {
        const accountBtn = this.page.getByTitle('My Account');
        await accountBtn.click();

        const accountMenu = this.page.locator('[role="menu"], .account-menu, .dropdown-menu').filter({
            has: this.page.getByRole('link', { name: 'Logout' })
        });

        await accountMenu.getByRole('link', { name: 'Logout' }).click();
    }
}
