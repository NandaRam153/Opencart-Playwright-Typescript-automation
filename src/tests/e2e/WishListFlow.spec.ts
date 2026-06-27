import { getSearchTerm, products } from '../../features/catalog';
import { test } from '../../fixtures/POMFixture';

test.describe.configure({ mode: 'serial' });

test(
    'Wishlist flow: search, add to wishlist, login, verify, delete, logout',
    { tag: '@wishlist' },
    async ({
        homePage,
        header,
        productListingPage,
        loginPage,
        wishListPage,
        logoutPage,
        wishlistCredentials,
    }) => {
        const { email, password } = wishlistCredentials;

        await homePage.navigateToURL();
        await header.searchForProduct(getSearchTerm(products.MACBOOK_PRO));

        await productListingPage.checkProductListed(products.MACBOOK_PRO.name);
        await productListingPage.addToWishListProductByName(products.MACBOOK_PRO.name);

        await header.gotoWishlist();
        await loginPage.login(email, password);
        await wishListPage.assertLoaded();

        await wishListPage.checkForProductByName(products.MACBOOK_PRO.name);
        await wishListPage.removeProductByName(products.MACBOOK_PRO.name);

        await header.logout();
        await logoutPage.checkLogoutComplete();
    }
);
