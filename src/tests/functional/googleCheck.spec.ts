import { test } from '@playwright/test';

test.skip('Google Check', async ({ page }) => {
    await page.goto('https://google.com');
    await page.getByRole('combobox', { name: 'Search' }).fill('Playwright');
    await page.getByRole('button', { name: 'Google Search' }).first().click();
    //await expect(page.getByRole('heading', {name: 'Landing Page'})).toBeVisible();
});
