"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const assertions_1 = require("../utils/assertions");
const wait_1 = require("../utils/wait");
class BasePage {
    constructor(page) {
        this.page = page;
    }
    async goto(path) {
        await this.page.goto(path, { waitUntil: 'load' });
    }
    async click(locator) {
        await wait_1.Wait.click(locator);
    }
    /** Hard assertion — use in flows. */
    async waitForVisible(locator) {
        await assertions_1.HardAssertions.visible(locator);
    }
    /** Soft assertion — use in audit/*Check methods. */
    async waitForSoftVisible(locator) {
        await assertions_1.SoftAssertions.visible(locator);
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map