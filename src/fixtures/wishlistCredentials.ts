import { test } from '@playwright/test';
import {
    assertWishlistCredentialsInCi,
    getWishlistCredentials,
} from '../features/auth';

/** Skip locally when credentials are missing; CI failure is handled before tests run. */
export function resolveWishlistCredentialsForTest(): { email: string; password: string } {
    const credentials = getWishlistCredentials();
    assertWishlistCredentialsInCi(credentials);

    if (credentials.status !== 'ok') {
        test.skip(true, credentials.reason);
        throw new Error('Test skipped due to missing wishlist credentials');
    }

    return credentials;
}
