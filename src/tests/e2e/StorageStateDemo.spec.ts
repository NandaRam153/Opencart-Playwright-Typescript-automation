import { WishlistPaths } from '../../features/wishlist';
import { test } from '../../fixtures/POMFixture';

/**
 * Portfolio demo: session reuse via Playwright storageState.
 * Depends on `setup` project (auth.setup.ts). Does not replace WishListFlow's login-gate coverage.
 */
test(
    'storageState demo: open wishlist already authenticated',
    { tag: '@wishlist' },
    async ({ page, wishListPage, wishlistCredentials }) => {
        // Resolve credentials so local runs skip cleanly if setup was also skipped.
        void wishlistCredentials;

        await page.goto(WishlistPaths.list);
        await wishListPage.assertLoaded();
    }
);
