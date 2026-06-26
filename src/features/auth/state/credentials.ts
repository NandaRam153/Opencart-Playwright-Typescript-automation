const PLACEHOLDER_EMAIL = 'your-email@example.com';
const PLACEHOLDER_PASSWORD = 'your-password';

export type WishlistCredentials =
    | { status: 'ok'; email: string; password: string }
    | { status: 'missing'; reason: string };

/** Resolve wishlist E2E credentials from environment. */
export function getWishlistCredentials(): WishlistCredentials {
    const email = process.env.TEST_USER_EMAIL?.trim();
    const password = process.env.TEST_USER_PASSWORD?.trim();

    if (!email || !password || email === PLACEHOLDER_EMAIL || password === PLACEHOLDER_PASSWORD) {
        return {
            status: 'missing',
            reason: 'Set valid TEST_USER_EMAIL and TEST_USER_PASSWORD in .env (see .env.example)',
        };
    }

    return { status: 'ok', email, password };
}

/**
 * In CI, wishlist credentials must be configured — fail fast instead of silently skipping.
 * Locally, callers should use test.skip when status is 'missing'.
 */
export function assertWishlistCredentialsInCi(credentials: WishlistCredentials): void {
    if (credentials.status === 'missing' && process.env.CI) {
        throw new Error(
            `Wishlist E2E requires TEST_USER_EMAIL and TEST_USER_PASSWORD GitHub Actions secrets. ${credentials.reason}`
        );
    }
}
