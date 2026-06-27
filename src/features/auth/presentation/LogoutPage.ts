import { BasePage, HardAssertions, Wait } from '@opencart-auto/pw-core';
import { AUTH_LOGOUT_URL_PATTERN } from '../state/paths';

export class LogoutPage extends BasePage {
    async checkLogoutComplete() {
        await this.page.waitForURL(AUTH_LOGOUT_URL_PATTERN);
        // Clear sticky header hover so the Continue link receives the click.
        await this.page.mouse.move(0, 0);

        await HardAssertions.visible(
            this.page.getByRole('heading', { name: 'Account Logout', level: 1 })
        );
        await Wait.click(this.page.getByRole('link', { name: 'Continue' }));
    }
}
