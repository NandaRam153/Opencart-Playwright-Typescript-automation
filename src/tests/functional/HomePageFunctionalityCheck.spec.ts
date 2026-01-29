import {test} from '../../fixtures/POManager'


test('Home page fucntionality checks', async ({homePage, header, footer, ribbon}) =>
{
    await homePage.navigateToURL();
    await header.headerCheck();
    await ribbon.ribbonCheck();
    await homePage.homePageCheck();
    await footer.footerCheck();
})