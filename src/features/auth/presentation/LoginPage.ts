import { BasePage, Wait } from '@opencart-auto/pw-core';

const LOGIN_ERROR_TEXT = 'No match for E-Mail Address and/or Password.';

export class LoginPage extends BasePage {
    async submitCredentials(user: string, password: string) {
        await this.page.getByPlaceholder('E-Mail Address').fill(user);
        await this.page.getByPlaceholder('Password').fill(password);
        await Wait.click(this.page.getByRole('button', { name: 'Login' }));
    }

    /** Submit credentials and fail fast when the store rejects them. */
    async login(user: string, password: string) {
        await this.submitCredentials(user, password);

        if (await this.wasLoginRejected()) {
            throw new Error(
                'Login failed: invalid credentials. Update TEST_USER_EMAIL and TEST_USER_PASSWORD in .env'
            );
        }
    }

    private async wasLoginRejected(): Promise<boolean> {
        const loginError = this.page.getByText(LOGIN_ERROR_TEXT);
        return loginError
            .waitFor({ state: 'visible', timeout: 3000 })
            .then(() => true)
            .catch(() => false);
    }
}
