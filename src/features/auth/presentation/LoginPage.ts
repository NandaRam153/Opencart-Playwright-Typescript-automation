import { BasePage, HardAssertions, Wait } from '@opencart-auto/pw-core';
import { AuthPaths } from '../state/paths';
import {
    LOGIN_CREDENTIAL_FAILURE_MESSAGE,
    LOGIN_REJECTION_PATTERN,
    LOGIN_REJECTION_TIMEOUT_MS,
} from '../state/loginErrors';
import { RETURNING_CUSTOMER_HEADING, RETURNING_CUSTOMER_HEADING_LEVEL } from '../state/loginForm';

export class LoginPage extends BasePage {
    async navigateToLogin() {
        await this.goto(AuthPaths.login);
    }

    async submitCredentials(user: string, password: string) {
        await this.page.getByPlaceholder('E-Mail Address').fill(user);
        await this.page.getByPlaceholder('Password').fill(password);
        await Wait.click(this.page.getByRole('button', { name: 'Login' }));
    }

    async assertLoginFormVisible() {
        await HardAssertions.visible(
            this.page.getByRole('heading', {
                name: RETURNING_CUSTOMER_HEADING,
                level: RETURNING_CUSTOMER_HEADING_LEVEL,
            })
        );
    }

    /** Submit credentials and fail fast when the store rejects them. */
    async login(user: string, password: string) {
        await this.submitCredentials(user, password);

        if (await this.wasLoginRejected()) {
            throw new Error(LOGIN_CREDENTIAL_FAILURE_MESSAGE);
        }
    }

    private async wasLoginRejected(): Promise<boolean> {
        const loginError = this.page.getByText(LOGIN_REJECTION_PATTERN);
        return loginError
            .waitFor({ state: 'visible', timeout: LOGIN_REJECTION_TIMEOUT_MS })
            .then(() => true)
            .catch(() => false);
    }
}
