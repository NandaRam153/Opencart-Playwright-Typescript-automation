import { test as base } from '@playwright/test';
import { HomePage, Header, Footer } from '../features/home';
import { Ribbon, ProductListingPage } from '../features/catalog';
import { CheckoutPage, OrderPlacementResultPage } from '../features/checkout';
import { LoginPage, LogoutPage, resolveWishlistCredentialsForTest } from '../features/auth';
import { WishListPage } from '../features/wishlist';
import { CartService, CartPage } from '../features/cart';
import { pageObject, serviceFromPageRequest } from './fixtureHelpers';

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
    /** Cart HTTP client sharing cookies with the browser (`page.request`). Use in hybrid tests. */
    sessionCartService: CartService;
    /** Registered-user credentials; skips locally when `.env` is missing or placeholder. */
    wishlistCredentials: { email: string; password: string };
}>({
    homePage: pageObject(HomePage),
    header: pageObject(Header),
    footer: pageObject(Footer),
    ribbon: pageObject(Ribbon),
    productListingPage: pageObject(ProductListingPage),
    checkoutPage: pageObject(CheckoutPage),
    orderPlacementResultPage: pageObject(OrderPlacementResultPage),
    loginPage: pageObject(LoginPage),
    wishListPage: pageObject(WishListPage),
    logoutPage: pageObject(LogoutPage),
    cartPage: pageObject(CartPage),
    sessionCartService: serviceFromPageRequest((request) => new CartService(request)),
    wishlistCredentials: async ({}, use) => {
        await use(resolveWishlistCredentialsForTest());
    },
});

export { expect } from '@playwright/test';
