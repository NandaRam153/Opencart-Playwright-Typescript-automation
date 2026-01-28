import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';


export const test = base.extend<{
    homePage: HomePage;
    header: Header;
    footer: Footer;
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
    }
});
