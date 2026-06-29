import { AUTH_LOGIN_URL_PATTERN, AuthPaths, LOGIN_REJECTION_PATTERN } from '../../features/auth';
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

        await loginPage.assertLoginFormVisible();
        await expect(page.getByText(LOGIN_REJECTION_PATTERN)).toBeVisible();
        await expect(page).toHaveURL(AUTH_LOGIN_URL_PATTERN);
    }
);
