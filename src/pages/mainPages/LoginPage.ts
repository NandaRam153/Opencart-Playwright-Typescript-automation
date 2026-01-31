import {expect} from '@playwright/test'
import { BasePage } from '../base/BasePage';


export class LoginPage extends BasePage
{
    async login(user: string, password: string)
    {
        await this.page.getByPlaceholder('E-Mail Address').fill(user);
        await this.page.getByPlaceholder('Password').fill(password);
        await this.page.getByRole('button', {name: "Login"}).click();

        await expect(this.page.getByRole('heading', {name: "My Wish List"})).toBeVisible();
    }
}