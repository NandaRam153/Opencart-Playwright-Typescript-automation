import { test } from '../../fixtures/POMFixture';

test(
    'Home page functionality checks',
    { tag: '@smoke' },
    async ({ homePage, header, footer, ribbon }) => {
        await homePage.navigateToURL();
        await header.headerCheck();
        await ribbon.ribbonCheck();
        await homePage.homePageCheck();
        await footer.footerCheck();
    }
);
