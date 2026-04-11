"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assertions = void 0;
const test_1 = require("@playwright/test");
class Assertions {
    // Element is visible
    static async visible(locator, message) {
        await test_1.expect.soft(locator, message).toBeVisible();
    }
    // Element is hidden
    static async hidden(locator, message) {
        await test_1.expect.soft(locator, message).toBeHidden();
    }
    // Element contains text
    static async containsText(locator, text, message) {
        await test_1.expect.soft(locator, message).toContainText(text);
    }
    // Element has exact text
    static async hasText(locator, text, message) {
        await test_1.expect.soft(locator, message).toHaveText(text);
    }
    // Element count check
    static async count(locator, expected, message) {
        await test_1.expect.soft(locator, message).toHaveCount(expected);
    }
    // At least one element exists
    static async atLeastOne(locator, message) {
        const count = await locator.count();
        test_1.expect.soft(count, message).toBeGreaterThan(0);
    }
}
exports.Assertions = Assertions;
//# sourceMappingURL=assertions.js.map