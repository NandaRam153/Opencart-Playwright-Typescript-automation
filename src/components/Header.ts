import { BaseComponent, HardAssertions, SoftAssertions, Wait } from '@opencart-auto/pw-core';


export class Header extends BaseComponent
{
    async headerCheck()
    {
        const currency = this.page.getByRole('button', { name: 'Currency' });
        if (await currency.isVisible())
        {
            await currency.click();
            await SoftAssertions.count(this.page.locator('.btn-group.open'), 1, 'Currency ddl did not open');
            await SoftAssertions.containsText(
                this.page.locator('button.currency-select'),
                ['€ Euro', '£ Pound Sterling', '$ US Dollar'],
                'Currency types are not correct'
            );
        }

        await SoftAssertions.visible(this.page.locator('i.fa.fa-phone'));

        const acct = this.page.getByTitle('My Account');
        if (await acct.isVisible())
        {
            await acct.click();
            await SoftAssertions.count(this.page.locator('li.dropdown.open'), 1, 'My Account ddl did not open');
            await SoftAssertions.visible(
                this.page.getByRole('link', { name: 'Register' }),
                'Register should be visible in My Account ddl'
            );
            await SoftAssertions.visible(
                this.page.getByRole('link', { name: 'Login' }),
                'Login should be visible in My Account ddl'
            );
        }

        await SoftAssertions.visible(this.page.locator('#wishlist-total'));
        await SoftAssertions.visible(this.page.locator('a[href*="route=checkout/cart"]'));
        await SoftAssertions.visible(this.page.locator('a[href*="route=checkout/checkout"]'));
    }

    async gotoCheckout()
    {
        await Wait.click(this.page.getByTitle('Checkout'));
        await HardAssertions.visible(this.page.getByRole('heading', { name: 'Checkout', level: 1 }));
    }

    async searchForProduct(product: string)
    {
        await this.page.getByPlaceholder('Search').fill(product);
        await Wait.click(this.page.locator('.btn.btn-default.btn-lg'));
    }

    async gotoWishlist()
    {
        await Wait.click(this.page.locator('#wishlist-total'));
        await HardAssertions.visible(this.page.getByRole('heading', { name: 'Returning Customer', level: 2 }));
    }

    async verifyCartCount(expectedCount: number)
    {
        await HardAssertions.containsText(this.page.locator('#cart-total'), `${expectedCount} item(s)`);
    }

    async logout()
    {
        const accountBtn = this.page.getByTitle('My Account');
        await Wait.click(accountBtn);

        const accountMenu = this.page.locator('[role="menu"], .account-menu, .dropdown-menu').filter({
            has: this.page.getByRole('link', { name: 'Logout' })
        });

        await Wait.click(accountMenu.getByRole('link', { name: 'Logout' }));
    }
}
