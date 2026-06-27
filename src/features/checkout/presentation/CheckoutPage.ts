import { BasePage, HardAssertions, IBillingDetails, Wait } from '@opencart-auto/pw-core';

export class CheckoutPage extends BasePage {
    async selectGuestCheckout() {
        const guestRadio = this.page.getByRole('radio', { name: /guest/i });
        await HardAssertions.visible(guestRadio);
        await guestRadio.check();
        await Wait.click(this.page.locator('#button-account'));
    }

    async fillBillingDetails(data: IBillingDetails) {
        await this.page.getByPlaceholder('First Name').fill(data.firstName);
        await this.page.getByPlaceholder('Last Name').fill(data.lastName);
        await this.page.locator('#input-payment-email').fill(data.email);
        await this.page.getByPlaceholder('Telephone').fill(data.phone);
        await this.page.getByPlaceholder('Address 1').fill(data.address);
        await this.page.getByPlaceholder('City').fill(data.city);
        await this.page.getByPlaceholder('Post Code').fill(data.postalCode);

        await this.page.locator('#input-payment-country').selectOption({ label: data.country });
        const zoneSelect = this.page.locator('#input-payment-zone');
        await zoneSelect
            .locator('option', { hasText: data.province })
            .waitFor({ state: 'attached', timeout: 10_000 });
        await zoneSelect.selectOption({ label: data.province });

        await Wait.click(this.page.locator('#button-guest'));
    }

    async confirmDeliveryMethod() {
        await Wait.click(this.page.locator('#button-shipping-method'));
    }

    async fillPaymentDetails(deliveryComment: string) {
        const paymentComment = this.page
            .locator('#collapse-payment-method')
            .locator('textarea[name="comment"]');
        await paymentComment.fill(deliveryComment);

        await this.page.locator('input[name="agree"]').check();
        await Wait.click(this.page.locator('#button-payment-method'));
    }

    async confirmOrder() {
        await Wait.click(this.page.locator('#button-confirm'));
    }

    async completeGuestCheckout(data: IBillingDetails) {
        await this.selectGuestCheckout();
        await this.fillBillingDetails(data);
        await this.confirmDeliveryMethod();
        await this.fillPaymentDetails(data.comment ?? '');
        await this.confirmOrder();
    }
}
