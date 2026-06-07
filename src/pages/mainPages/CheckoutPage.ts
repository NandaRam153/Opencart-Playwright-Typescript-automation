import { expect } from '@playwright/test';
import { BasePage, IBillingDetails } from '@opencart-auto/pw-core';


export class CheckoutPage extends BasePage
{
    async selectGuestCheckout() 
    {
        const guestRadio = this.page.getByRole('radio', { name: /guest/i });
        await expect(guestRadio).toBeVisible();
        await guestRadio.check();
        await this.page.locator('#button-account').click();
    }

    async fillBillingDetails(data: IBillingDetails) 
    {
        await this.page.getByPlaceholder('First Name').fill(data.firstName);
        await this.page.getByPlaceholder('Last Name').fill(data.lastName);
        await this.page.locator('#input-payment-email').fill(data.email);
        await this.page.getByPlaceholder('Telephone').fill(data.phone);
        await this.page.getByPlaceholder('Address 1').fill(data.address);
        await this.page.getByPlaceholder('City').fill(data.city);
        await this.page.getByPlaceholder('Post Code').fill(data.postalCode);

        await this.page.locator('#input-payment-country').selectOption({ label: data.country });
        await this.page.locator('#input-payment-zone').selectOption({ label: data.province });

        await this.page.locator('#button-guest').click();
    }

    async confirmDeliveryMethod() 
    {
        await this.page.locator('#button-shipping-method').click();
    }

    async fillPaymentDetails(deliveryComment: string) 
    {
        const paymentComment = this.page.locator('#collapse-payment-method').locator('textarea[name="comment"]');
        await paymentComment.fill(deliveryComment);

        await this.page.locator('input[name="agree"]').check();
        await this.page.locator('#button-payment-method').click();
    }

    async confirmOrder() 
    {
        await this.page.locator('#button-confirm').click();
    }

    async completeGuestCheckout(data: IBillingDetails) 
    {
        await this.selectGuestCheckout();
        await this.fillBillingDetails(data);
        await this.confirmDeliveryMethod();
        await this.fillPaymentDetails(data.comment ?? '');
        await this.confirmOrder();
    }
}