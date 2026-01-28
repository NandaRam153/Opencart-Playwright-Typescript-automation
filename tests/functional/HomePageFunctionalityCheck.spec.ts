import {test} from '../../fixtures/POManager'


test.only('Home page fucntionality checks', async ({homePage, header, footer}) =>
{
    await homePage.navigateToURL();
    await header.headerCheck();
    await homePage.homePageCheck();
    await footer.FooterCheck();
})