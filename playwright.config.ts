import { defineConfig, devices } from '@playwright/test';

import { existsSync, readFileSync } from 'fs';
import path from 'path';

const envPath = path.resolve(__dirname, '.env');
if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eq = trimmed.indexOf('=');
        if (eq === -1) continue;
        const key = trimmed.slice(0, eq).trim();
        const value = trimmed
            .slice(eq + 1)
            .trim()
            .replace(/^["']|["']$/g, '');
        if (!(key in process.env)) process.env[key] = value;
    }
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const baseURL = process.env.BASE_URL ?? 'https://awesomeqa.com/ui/';

export default defineConfig({
    testDir: './src/tests',
    testIgnore: ['**/seed.spec.ts'],
    /* Tag subsets: npm run verify:smoke (@smoke), verify:wishlist (@wishlist). See docs/QUALITY-GATES.md. */
    // 30 sec is default acrosss tests
    timeout: 30 * 1000,
    expect: {
        timeout: 5 * 1000,
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        baseURL,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                headless: true,
                screenshot: 'only-on-failure',
                video: 'off',
                trace: 'retain-on-first-failure',
                actionTimeout: 5 * 1000,
            },
        },

        // {
        //   name: 'firefox',
        //   use: {
        //     ...devices['Desktop Firefox'],
        //     headless: true,
        //     screenshot: 'only-on-failure',
        //     video: 'off',
        //     trace: 'retain-on-first-failure',
        //     actionTimeout: 5 * 1000,
        //   }
        // },

        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'],
        //     headless: true,
        //     screenshot: 'only-on-failure',
        //     video: 'off',
        //     trace: 'retain-on-first-failure',
        //     actionTimeout: 5 * 1000,
        //   }
        // },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },

        // {
        //   name: 'e2e',
        //   testMatch: /.OrderCreation.spec.ts/,
        //   use: {
        //     headless: true,
        //     screenshot: 'only-on-failure',
        //     video: 'off',
        //     trace: 'retain-on-first-failure',
        //     actionTimeout: 2 * 1000,  // for any action wait time is 2 secs.
        //   }
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
