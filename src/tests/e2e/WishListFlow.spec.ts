import { test } from '../../fixtures/POMFixture';
import { getSearchTerm, products } from '../../data/products';
import { resolveWishlistCredentialsForTest } from '../../testHelpers/wishlistCredentials';

test('Wishlist flow: search, add to wishlist, login, verify, delete, logout', async ({
    homePage,
    header,
    productListingPage,
    loginPage,
    wishListPage,
    logoutPage,
}) => {
    const { email, password } = resolveWishlistCredentialsForTest();

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
});
