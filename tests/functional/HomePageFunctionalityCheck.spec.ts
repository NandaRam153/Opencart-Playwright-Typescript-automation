import {test} from '@playwright/test'
import {HomePage} from '../../pageObjects/HomePage'


test.only('Home page fucntionality checks', async ({page}) =>
{
    const homePage = new HomePage(page);
    await homePage.navigateToURL();
    await homePage.headersCheck();
    await homePage.MainbodyCheck();
    await homePage.FooterCheck();
})