import { SoftAssertions, BaseComponent } from '@opencart-auto/pw-core';
import { FOOTER_COLUMN_HEADERS, FOOTER_LINKS } from '../state/footerContent';

export class Footer extends BaseComponent {
    async footerCheck() {
        await Promise.all(
            FOOTER_COLUMN_HEADERS.map((header) =>
                SoftAssertions.visible(this.page.getByRole('heading', { name: header, level: 5 }))
            )
        );
        await Promise.all(
            FOOTER_LINKS.map((link) =>
                SoftAssertions.visible(this.page.getByRole('link', { name: link }))
            )
        );

        await SoftAssertions.visible(
            this.page.locator('footer').getByRole('link', { name: 'My Account' })
        );
    }
}
