import { test as base } from '@playwright/test';
import { HomePage } from '../pages/mainPages/HomePage';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Ribbon } from '../components/Ribbon';
import { ProductListingPage } from '../pages/products/ProductListingPage';
import { CheckoutPage } from '../pages/mainPages/CheckoutPage';
import { OrderPlacementResultPage } from '../pages/mainPages/OrderPlacementResultPage';


export const test = base.extend<{
    homePage: HomePage;
    header: Header;
    footer: Footer;
    ribbon: Ribbon;
    productListingPage: ProductListingPage;
    checkoutPage: CheckoutPage;
    orderPlacementResultPage: OrderPlacementResultPage;
}>(
  {
    homePage: async ({ page }, use) => 
    {
      await use(new HomePage(page));
    },
 
    header: async ({ page }, use) => 
    {
      await use(new Header(page));
    },

    footer: async ({ page }, use) => 
    {
      await use(new Footer(page));
    },

    ribbon: async ({ page }, use) => 
    {
      await use(new Ribbon(page));
    },

    productListingPage: async ({ page }, use) => 
    {
      await use(new ProductListingPage(page));
    },

    checkoutPage: async ({ page }, use) => 
    {
      await use(new CheckoutPage(page));
    },

    orderPlacementResultPage: async ({ page }, use) => 
    {
      await use(new OrderPlacementResultPage(page));
    }
});
