import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { expect } from '@playwright/test';
import {
    AUTH_LOGIN_URL_PATTERN,
    assertWishlistCredentialsInCi,
    getWishlistCredentials,
    type WishlistCredentials,
} from '../features/auth';
import { AUTH_STORAGE_STATE_PATH } from '../fixtures/authStorageState';
import { test as setup } from '../fixtures/POMFixture';

const EMPTY_STORAGE_STATE = JSON.stringify({ cookies: [], origins: [] });

setup.describe('Auth storage state setup', () => {
    setup(
        'authenticate and save storageState',
        { tag: '@wishlist' },
        async ({ page, loginPage }) => {
            const credentials = getWishlistCredentials();
            assertWishlistCredentialsInCi(credentials);

            mkdirSync(path.dirname(AUTH_STORAGE_STATE_PATH), { recursive: true });
            // Placeholder so the dependent project can load storageState when this test skips.
            writeFileSync(AUTH_STORAGE_STATE_PATH, EMPTY_STORAGE_STATE);

            setup.skip(
                credentials.status !== 'ok',
                credentials.status === 'missing' ? credentials.reason : 'Credentials unavailable'
            );

            const { email, password } = credentials as Extract<
                WishlistCredentials,
                { status: 'ok' }
            >;

            await loginPage.navigateToLogin();
            await loginPage.assertLoginFormVisible();
            await loginPage.login(email, password);
            await expect(page).not.toHaveURL(AUTH_LOGIN_URL_PATTERN);

            await page.context().storageState({ path: AUTH_STORAGE_STATE_PATH });
        }
    );
});
