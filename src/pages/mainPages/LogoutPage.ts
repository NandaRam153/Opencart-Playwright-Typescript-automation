import {expect} from '@playwright/test'
import { BasePage } from '@opencart-auto/pw-core';


export class LogoutPage extends BasePage
{
    async checkLogoutComplete()
    {
        await this.page.waitForURL('**/logout**');
        await this.page.mouse.move(0, 0); // defocus hover menus

        await expect(this.page.getByRole('heading', {name: "Account Logout", level:1})).toBeVisible(); 
        await this.page.getByRole('link', {name: "Continue"}).click();
    }
}