"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
const wait_1 = require("../utils/wait");
class BaseComponent {
    constructor(page) {
        this.page = page;
    }
    async click(locator) {
        await wait_1.Wait.click(locator);
    }
}
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=BaseComponent.js.map