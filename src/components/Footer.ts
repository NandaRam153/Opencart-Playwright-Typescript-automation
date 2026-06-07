import { SoftAssertions, BaseComponent } from '@opencart-auto/pw-core';

export class Footer extends BaseComponent {
    async footerCheck() {
        const footColumnHeaders: string[] = [
            'Information',
            'Customer Service',
            'Extras',
            'My Account',
        ];
        const footerLinks: string[] = [
            'About Us',
            'Delivery Information',
            'Privacy Policy',
            'Contact Us',
            'Returns',
            'Site Map',
            'Brands',
            'Gift Certificate',
            'Affiliate',
            'Specials',
            'Order History',
            'NewsLetter',
        ];

        await Promise.all(
            footColumnHeaders.map((header) =>
                SoftAssertions.visible(this.page.getByRole('heading', { name: header, level: 5 }))
            )
        );
        await Promise.all(
            footerLinks.map((link) =>
                SoftAssertions.visible(this.page.getByRole('link', { name: link }))
            )
        );

        await SoftAssertions.visible(
            this.page.locator('footer').getByRole('link', { name: 'My Account' })
        );
    }
}
