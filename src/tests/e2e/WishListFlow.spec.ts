import { test} from '../../fixtures/POMFixture';
import { products } from '../../data/products';

const userCredentials = {
    email: 'nandakumar@rnk-domain.com',
    password: 'Qwerty123'
};

test('Wishlist flow: search, add to wishlist, login, verify, delete, logout', async ({
    homePage,
    header,
    productListingPage,
    loginPage,
    wishListPage,
    logoutPage
}) => 
{
    await homePage.navigateToURL();
    await header.searchForProduct(products.MACBOOK_PRO.name);

    await productListingPage.CheckProductListed(products.MACBOOK_PRO.name);
    await productListingPage.addToWishListProductByName(products.MACBOOK_PRO.name);

    await header.gotoWishlist();
    await loginPage.login(userCredentials.email, userCredentials.password);

    await wishListPage.checkForProductByName(products.MACBOOK_PRO.name);
    await wishListPage.removeProductByName(products.MACBOOK_PRO.name);

    await header.logout();
    await logoutPage.checkLogoutComplete();
});
