import { HardAssertions, SoftAssertions, BaseComponent } from '@opencart-auto/pw-core';
import { ribbonDropdownMenus, ribbonLinks } from '../state/ribbonMenu';

export class Ribbon extends BaseComponent {
    async ribbonCheck() {
        for (const [parent, showAll] of ribbonDropdownMenus) {
            const locator = this.page.getByRole('link', { name: parent });
            if (await locator.isVisible()) {
                await locator.click();
                await SoftAssertions.count(this.page.getByRole('link', { name: showAll }), 1);
            }
        }

        await Promise.all(
            ribbonLinks.map((label) =>
                SoftAssertions.visible(this.page.getByRole('link', { name: label }))
            )
        );
    }

    async openProductPage(category: string) {
        await this.click(this.page.getByRole('link', { name: category }));
        await HardAssertions.visible(this.page.getByRole('heading', { name: category, level: 2 }));
    }
}
