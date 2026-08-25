import { afterEach, describe, expect, it, vi } from 'vitest';
import { assertWishlistCredentialsInCi, getWishlistCredentials } from '../../features/auth';

describe('getWishlistCredentials', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('returns missing when email or password is unset', () => {
        vi.stubEnv('TEST_USER_EMAIL', '');
        vi.stubEnv('TEST_USER_PASSWORD', '');

        const credentials = getWishlistCredentials();
        expect(credentials.status).toBe('missing');
        if (credentials.status === 'missing') {
            expect(credentials.reason).toMatch(/TEST_USER_EMAIL/);
        }
    });

    it('returns missing for .env.example placeholders', () => {
        vi.stubEnv('TEST_USER_EMAIL', 'your-email@example.com');
        vi.stubEnv('TEST_USER_PASSWORD', 'your-password');

        expect(getWishlistCredentials().status).toBe('missing');
    });

    it('returns ok for non-placeholder credentials', () => {
        vi.stubEnv('TEST_USER_EMAIL', 'wishlist.user@example.com');
        vi.stubEnv('TEST_USER_PASSWORD', 'not-a-placeholder');

        expect(getWishlistCredentials()).toEqual({
            status: 'ok',
            email: 'wishlist.user@example.com',
            password: 'not-a-placeholder',
        });
    });
});

describe('assertWishlistCredentialsInCi', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    const missing = {
        status: 'missing' as const,
        reason: 'Set valid TEST_USER_EMAIL and TEST_USER_PASSWORD in .env (see .env.example)',
    };

    it('throws in CI when credentials are missing', () => {
        vi.stubEnv('CI', 'true');
        expect(() => assertWishlistCredentialsInCi(missing)).toThrow(/GitHub Actions secrets/);
    });

    it('does not throw locally when credentials are missing', () => {
        vi.stubEnv('CI', '');
        expect(() => assertWishlistCredentialsInCi(missing)).not.toThrow();
    });
});
