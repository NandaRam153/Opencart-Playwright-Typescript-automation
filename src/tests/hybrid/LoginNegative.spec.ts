import { expect } from '@playwright/test';
import { test } from '../../fixtures/POMFixture';
import { OpenCartRoutes } from '../../api/openCartRoutes';

const LOGIN_ERROR =
    /No match for E-Mail Address and\/or Password\.|exceeded allowed number of login attempts/;

test('invalid login POST fails and UI shows error', async ({ page, loginPage }) => {
    await page.goto(OpenCartRoutes.login);

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
    await expect(page.getByText(LOGIN_ERROR)).toBeVisible();
    await expect(page).toHaveURL(/route=account\/login/);
});
