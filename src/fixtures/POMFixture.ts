import { test as base } from '@playwright/test';
import { HomePage, Header, Footer } from '../features/home';
import { Ribbon, ProductListingPage } from '../features/catalog';
import { CheckoutPage, OrderPlacementResultPage } from '../features/checkout';
import { LoginPage, LogoutPage } from '../features/auth';
import { WishListPage } from '../features/wishlist';
import { CartPage } from '../features/cart';

export const test = base.extend<{
    homePage: HomePage;
    header: Header;
    footer: Footer;
    ribbon: Ribbon;
    productListingPage: ProductListingPage;
    checkoutPage: CheckoutPage;
    orderPlacementResultPage: OrderPlacementResultPage;
    loginPage: LoginPage;
    wishListPage: WishListPage;
    logoutPage: LogoutPage;
    cartPage: CartPage;
}>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    header: async ({ page }, use) => {
        await use(new Header(page));
    },

    footer: async ({ page }, use) => {
        await use(new Footer(page));
    },

    ribbon: async ({ page }, use) => {
        await use(new Ribbon(page));
    },

    productListingPage: async ({ page }, use) => {
        await use(new ProductListingPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    orderPlacementResultPage: async ({ page }, use) => {
        await use(new OrderPlacementResultPage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    wishListPage: async ({ page }, use) => {
        await use(new WishListPage(page));
    },

    logoutPage: async ({ page }, use) => {
        await use(new LogoutPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});
