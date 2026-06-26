import { BasePage, HardAssertions, Wait } from '@opencart-auto/pw-core';

export class LogoutPage extends BasePage {
    async checkLogoutComplete() {
        await this.page.waitForURL('**/logout**');
        await this.page.mouse.move(0, 0);

        await HardAssertions.visible(
            this.page.getByRole('heading', { name: 'Account Logout', level: 1 })
        );
        await Wait.click(this.page.getByRole('link', { name: 'Continue' }));
    }
}
