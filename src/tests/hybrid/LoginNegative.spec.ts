import {
    AUTH_LOGIN_URL_PATTERN,
    AuthPaths,
    LOGIN_REJECTION_PATTERN,
    RETURNING_CUSTOMER_HEADING,
    RETURNING_CUSTOMER_HEADING_LEVEL,
} from '../../features/auth';
import { expect, test } from '../../fixtures/POMFixture';

test(
    'invalid login POST fails and UI shows error',
    { tag: '@smoke' },
    async ({ page, loginPage }) => {
        await loginPage.navigateToLogin();

        const loginResponsePromise = page.waitForResponse(
            (response) =>
                response.request().method() === 'POST' && response.url().includes(AuthPaths.login)
        );

        await loginPage.submitCredentials(`invalid-${Date.now()}@example.com`, 'wrong-password');

        const loginResponse = await loginResponsePromise;
        expect(loginResponse.status()).toBe(200);
        expect(loginResponse.url()).not.toContain('route=account/account');

        await expect(
            page.getByRole('heading', {
                name: RETURNING_CUSTOMER_HEADING,
                level: RETURNING_CUSTOMER_HEADING_LEVEL,
            })
        ).toBeVisible();
        await expect(page.getByText(LOGIN_REJECTION_PATTERN)).toBeVisible();
        await expect(page).toHaveURL(AUTH_LOGIN_URL_PATTERN);
    }
);
