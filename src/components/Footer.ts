import {expect, type Page} from '@playwright/test';
import {BaseComponent} from '@opencart-auto/pw-core';


export class Footer extends BaseComponent
{
    async footerCheck()
    {
        const footColumnHeaders: string[] = ['Information', 'Customer Service', 'Extras', 'My Account'];
        const footerLinks: string[] = ['About Us', 'Delivery Information', 'Privacy Policy', 'Contact Us', 'Returns', 'Site Map', 
                'Brands', 'Gift Certificate', 'Affiliate', 'Specials', 'Order History', 'NewsLetter'];

        // Does parallel assertions
        await Promise.all(footColumnHeaders.map(header => expect.soft(this.page.getByRole('heading', { name: header, level: 5 })).toBeVisible()));       
        await Promise.all(footerLinks.map(link => expect.soft(this.page.getByRole('link', {name: link})).toBeVisible()));

        await expect.soft(
            this.page.locator('footer').getByRole('link', { name: 'My Account' })
        ).toBeVisible();
    }
}