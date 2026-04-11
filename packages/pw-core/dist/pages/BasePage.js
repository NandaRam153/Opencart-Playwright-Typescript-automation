"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const test_1 = require("@playwright/test");
class BasePage {
    constructor(page) {
        this.page = page;
    }
    async goto(path) {
        await this.page.goto(path, { waitUntil: 'load' });
    }
    async click(locator) {
        await locator.click();
    }
    async waitForVisible(locator) {
        await (0, test_1.expect)(locator).toBeVisible();
    }
    async waitForSoftVisible(locator) {
        await test_1.expect.soft(locator).toBeVisible();
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map