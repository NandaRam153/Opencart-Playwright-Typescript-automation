import { BasePage, HardAssertions, Wait } from '@opencart-auto/pw-core';
import { AUTH_LOGOUT_URL_PATTERN } from '../state/paths';
import {
    ACCOUNT_LOGOUT_HEADING,
    ACCOUNT_LOGOUT_HEADING_LEVEL,
    LOGOUT_CONTINUE_LINK,
} from '../state/logoutForm';

export class LogoutPage extends BasePage {
    async checkLogoutComplete() {
        await this.page.waitForURL(AUTH_LOGOUT_URL_PATTERN);
        // Clear sticky header hover so the Continue link receives the click.
        await this.page.mouse.move(0, 0);

        await HardAssertions.visible(
            this.page.getByRole('heading', {
                name: ACCOUNT_LOGOUT_HEADING,
                level: ACCOUNT_LOGOUT_HEADING_LEVEL,
            })
        );
        await Wait.click(this.page.getByRole('link', { name: LOGOUT_CONTINUE_LINK }));
    }
}
