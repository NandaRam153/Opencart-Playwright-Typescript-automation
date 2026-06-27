import { LOGIN_REJECTION_PATTERN } from '../../features/auth';
import { expect, test } from '../../fixtures/POMFixture';

test('invalid login POST fails and UI shows error', async ({ page, loginPage }) => {
    await loginPage.navigateToLogin();

    const loginResponsePromise = page.waitForResponse(
        (response) =>
            response.request().method() === 'POST' &&
            response.url().includes('route=account/login')
    );

    await loginPage.submitCredentials(
        `invalid-${Date.now()}@example.com`,
        'wrong-password'
    );

    const loginResponse = await loginResponsePromise;
    expect(loginResponse.status()).toBe(200);
    expect(loginResponse.url()).not.toContain('route=account/account');

    await expect(page.getByRole('heading', { name: 'Returning Customer', level: 2 })).toBeVisible();
    await expect(page.getByText(LOGIN_REJECTION_PATTERN)).toBeVisible();
    await expect(page).toHaveURL(/route=account\/login/);
});
