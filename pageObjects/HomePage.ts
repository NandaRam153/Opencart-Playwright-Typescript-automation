import {expect, type Page} from '@playwright/test';

export class HomePage
{
    readonly page: Page;

    constructor(page: Page)
    {
        this.page = page;
    }

    async navigateToURL()
    {
        const homePage = await this.page.goto("https://awesomeqa.com/ui/index.php?route=common/home");
        await expect(this.page).toHaveTitle("Your Store");
        return homePage;
    }


    async headersCheck()
    {
        // Open Currency ddl and check
        const currency = this.page.getByRole('button', {name: 'Currency'});
        if (await currency.isVisible())
        {
            await currency.click();
            await expect.soft(this.page.locator('.btn-group.open')).toHaveCount(1); 

            await expect.soft(this.page.locator('button.currency-select'))
                .toContainText(['€ Euro', '£ Pound Sterling', '$ US Dollar']);
        }

        await expect.soft(this.page.locator('i.fa.fa-phone')).toBeVisible();

        // Open My Account ddl and check
        const acct = this.page.getByTitle('My Account');
        if (await acct.isVisible())
        {
            await acct.click();
            await expect.soft(this.page.locator('li.dropdown.open')).toHaveCount(1);
            await expect.soft(this.page.getByRole('link', {name: 'Register'})).toBeVisible();
            await expect.soft(this.page.getByRole('link', {name: 'Login'})).toBeVisible();
        }

        // Check Wish List
        await expect.soft(this.page.locator('#wishlist-total')).toBeVisible();   
        // Check Shopping Cart
        await expect.soft(this.page.locator('a[href*="route=checkout/cart"]')).toBeVisible();
        // Check Checkout
        await expect.soft(this.page.locator('a[href*="route=checkout/checkout"]')).toBeVisible();
    }


    async MainbodyCheck()
    {
        // Check ribbon menu options
        await expect.soft(this.page.getByTitle('TheTestingAcademy eCommerce')).toBeVisible();
        await expect.soft(this.page.getByPlaceholder('Search')).toBeVisible();
        await expect.soft(this.page.locator('#cart-total')).toBeVisible();

        const ribbonMenuWithDDL: string[][] = [['Desktops', 'Show All Desktops'], ['Laptops & Notebooks', 'Show All Laptops & Notebooks'], 
                        ['Components', 'Show All Components'], ['MP3 Players', 'Show All MP3 Players']];
        const ribbonMenu: string[] =['Tablets', 'Software', 'Phones & PDAs', 'Cameras', ];  
        let locator;

        for (const ribbon of ribbonMenuWithDDL)
        {
            locator = this.page.getByRole('link', {name: ribbon[0]});
            if (await locator.isVisible())
            {
                await locator.click();
                await expect(this.page.getByRole('link', {name: ribbon[1]})).toHaveCount(1);
            }
        }
        // Parallel assertions for all from ribbonMenu
        await Promise.all(ribbonMenu.map(ribbon => expect.soft(this.page.getByRole('link', {name: ribbon})).toBeVisible()));

        // Swipper container check
        await expect.soft(this.page.locator('#slideshow0')).toBeVisible();
        // Carousel container check
        await expect.soft(this.page.locator('#carousel0')).toBeVisible();
        // Check featured products
        expect.soft(await this.page.locator('.product-thumb.transition').count()).toBeGreaterThan(0);  
        expect.soft(await this.page.getByRole('button', {name: 'Add to Cart'}).count()).toBeGreaterThan(0);
        expect.soft(await this.page.locator('button[data-original-title="Add to Wish List"]').count()).toBeGreaterThan(0);
        expect.soft(await this.page.locator('button[data-original-title="Compare this Product"]').count()).toBeGreaterThan(0);  
    }


    async FooterCheck()
    {
        const footColumnHeaders: string[] = ['Information', 'Customer Service', 'Extras', 'My Account'];
        const footerLinks: string[] = ['About Us', 'Delivery Information', 'Privacy Policy', 'Contact Us', 'Returns', 'Site Map', 
                'Brands', 'Gift Certificate', 'Affiliate', 'Specials', 'Order History', 'NewsLetter'];

        // for (const header of footColumnHeaders)
        // {
        //     await expect.soft(this.page.getByRole('heading', {name: header, level: 5})).toBeVisible();
        // }

        // Does parallel assertions
        await Promise.all(footColumnHeaders.map(header => expect.soft(this.page.getByRole('heading', { name: header, level: 5 })).toBeVisible()));

        
        // for (const link of footerLinks)
        // {
        //     await expect.soft(this.page.getByRole('link', {name: link})).toBeVisible();
        // }

        await Promise.all(footerLinks.map(link => expect.soft(this.page.getByRole('link', {name: link})).toBeVisible()));

        expect.soft(this.page.getByRole('link', { name: 'My Account' })
                    .filter({ hasNot: this.page.locator('.dropdown-menu') })); // exclude ddl
        expect.soft(this.page.getByRole('link', { name: 'My Account' })
                    .filter({ hasNot: this.page.locator('.dropdown-menu') })); // exclude ddl
    }
}