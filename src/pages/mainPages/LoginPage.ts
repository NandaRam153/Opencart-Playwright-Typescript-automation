import {expect} from '@playwright/test'
import { BasePage } from '@opencart-auto/pw-core';


export class LoginPage extends BasePage
{
    async login(user: string, password: string)
    {
        await this.page.getByPlaceholder('E-Mail Address').fill(user);
        await this.page.getByPlaceholder('Password').fill(password);
        await this.page.getByRole('button', {name: "Login"}).click();

        const loginError = this.page.getByText('No match for E-Mail Address and/or Password.');
        const loginFailed = await loginError
            .waitFor({ state: 'visible', timeout: 3000 })
            .then(() => true)
            .catch(() => false);
        if (loginFailed) {
            throw new Error(
                'Login failed: invalid credentials. Update TEST_USER_EMAIL and TEST_USER_PASSWORD in .env'
            );
        }

        await expect(this.page.getByRole('heading', {name: "My Wish List"})).toBeVisible();
    }
}