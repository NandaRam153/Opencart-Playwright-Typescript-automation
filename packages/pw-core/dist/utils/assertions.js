"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assertions = exports.HardAssertions = exports.SoftAssertions = void 0;
const test_1 = require("@playwright/test");
/**
 * Soft assertions collect multiple failures — use in audit/*Check methods.
 */
exports.SoftAssertions = {
    async visible(locator, message) {
        await test_1.expect.soft(locator, message).toBeVisible();
    },
    async hidden(locator, message) {
        await test_1.expect.soft(locator, message).toBeHidden();
    },
    async containsText(locator, text, message) {
        await test_1.expect.soft(locator, message).toContainText(text);
    },
    async hasText(locator, text, message) {
        await test_1.expect.soft(locator, message).toHaveText(text);
    },
    async count(locator, expected, message) {
        await test_1.expect.soft(locator, message).toHaveCount(expected);
    },
    async atLeastOne(locator, message) {
        const count = await locator.count();
        test_1.expect.soft(count, message).toBeGreaterThan(0);
    },
};
/**
 * Hard assertions fail fast — use in flows, actions, and post-condition checks.
 */
exports.HardAssertions = {
    async visible(locator, message) {
        await (0, test_1.expect)(locator, message).toBeVisible();
    },
    async hidden(locator, message) {
        await (0, test_1.expect)(locator, message).toBeHidden();
    },
    async containsText(locator, text, message) {
        await (0, test_1.expect)(locator, message).toContainText(text);
    },
    async hasText(locator, text, message) {
        await (0, test_1.expect)(locator, message).toHaveText(text);
    },
    async count(locator, expected, message) {
        await (0, test_1.expect)(locator, message).toHaveCount(expected);
    },
    async atLeastOne(locator, message) {
        const count = await locator.count();
        (0, test_1.expect)(count, message).toBeGreaterThan(0);
    },
};
/** @deprecated Use SoftAssertions or HardAssertions directly. */
class Assertions {
}
exports.Assertions = Assertions;
Assertions.soft = exports.SoftAssertions;
Assertions.hard = exports.HardAssertions;
//# sourceMappingURL=assertions.js.map