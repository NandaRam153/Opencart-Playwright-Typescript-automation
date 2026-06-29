import { IBillingDetails } from '@opencart-auto/pw-core';

export type CheckoutBillingDetails = IBillingDetails;

export const billingData: CheckoutBillingDetails = {
    firstName: 'Nanda',
    lastName: 'Ram',
    email: 'test123@example.com',
    phone: '647-555-5555',
    address: '123 Main Street',
    city: 'Toronto',
    postalCode: 'A1B 3C4',
    country: 'Canada',
    province: 'Ontario',
    comment: 'Paying in US$ only',
};
