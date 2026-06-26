import { expect } from '@playwright/test';
import { CartAddResponse } from '../../../shared/services/http/types';

export function assertCartAddRejected(json: unknown) {
    if (Array.isArray(json)) {
        expect(json, 'cart add should return an empty array for invalid product id').toEqual([]);
        return;
    }

    const body = json as CartAddResponse;
    expect(body.success, 'cart add should not succeed for invalid product id').toBeFalsy();

    const hasErrorField = body.error !== undefined && body.error !== null && body.error !== '';
    expect(
        hasErrorField,
        'cart add rejection should include an error payload or return an empty array'
    ).toBeTruthy();
}
