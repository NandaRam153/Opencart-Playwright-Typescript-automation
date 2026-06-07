import { test} from '../../fixtures/POMFixture';
import { products } from '../../data/products';

test('Wishlist flow: search, add to wishlist, login, verify, delete, logout', async ({
    homePage,
    header,
    productListingPage,
    loginPage,
    wishListPage,
    logoutPage
}) => 
{
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    const hasPlaceholderCredentials =
        !email ||
        !password ||
        email === 'your-email@example.com' ||
        password === 'your-password';
    test.skip(
        hasPlaceholderCredentials,
        'Set valid TEST_USER_EMAIL and TEST_USER_PASSWORD in .env (see .env.example)'
    );

    await homePage.navigateToURL();
    await header.searchForProduct(products.MACBOOK_PRO.name);

    await productListingPage.CheckProductListed(products.MACBOOK_PRO.name);
    await productListingPage.addToWishListProductByName(products.MACBOOK_PRO.name);

    await header.gotoWishlist();
    await loginPage.login(email!, password!);

    await wishListPage.checkForProductByName(products.MACBOOK_PRO.name);
    await wishListPage.removeProductByName(products.MACBOOK_PRO.name);

    await header.logout();
    await logoutPage.checkLogoutComplete();
});
