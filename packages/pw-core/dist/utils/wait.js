"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wait = void 0;
class Wait {
    // Wait for page to finish loading
    static async forPageLoad(page) {
        await page.waitForLoadState('load');
    }
    // Wait for DOMContentLoaded
    static async forDOM(page) {
        await page.waitForLoadState('domcontentloaded');
    }
    // Wait for locator to be visible
    static async forVisible(locator) {
        await locator.waitFor({ state: 'visible' });
    }
    // Wait for locator to be hidden
    static async forHidden(locator) {
        await locator.waitFor({ state: 'hidden' });
    }
    // Wait until at least one element exists
    static async forAtLeastOne(locator) {
        await locator.first().waitFor({ state: 'attached' });
    }
    // Safe click (waits before clicking)
    static async click(locator) {
        await this.forVisible(locator);
        await locator.click();
    }
    // Wait for network to be idle (use sparingly)
    static async forNetworkIdle(page) {
        await page.waitForLoadState('networkidle');
    }
}
exports.Wait = Wait;
//# sourceMappingURL=wait.js.map