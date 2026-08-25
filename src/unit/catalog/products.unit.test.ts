import { describe, expect, it } from 'vitest';
import type { IProduct } from '@opencart-auto/pw-core';
import { getSearchTerm, products, requireCategory, requireProductId } from '../../features/catalog';

describe('requireProductId', () => {
    it('returns the catalog product_id', () => {
        expect(requireProductId(products.IPHONE, 'IPHONE')).toBe(40);
    });

    it('throws when productId is missing', () => {
        const incomplete: IProduct = { name: 'Ghost Camera' };
        expect(() => requireProductId(incomplete, 'GHOST')).toThrow(/GHOST.*missing productId/);
    });

    it('uses the product name in the error when no catalog key is given', () => {
        const incomplete: IProduct = { name: 'Ghost Camera' };
        expect(() => requireProductId(incomplete)).toThrow(/Ghost Camera.*missing productId/);
    });
});

describe('requireCategory', () => {
    it('returns the ribbon category', () => {
        expect(requireCategory(products.NIKON_D300, 'NIKON_D300')).toBe('Cameras');
    });

    it('throws when category is missing', () => {
        const incomplete: IProduct = { name: 'Unfiled Item' };
        expect(() => requireCategory(incomplete, 'UNFILED')).toThrow(/UNFILED.*missing category/);
    });
});

describe('getSearchTerm', () => {
    it('prefers searchTerm over name', () => {
        expect(getSearchTerm(products.NIKON_D300)).toBe('Nikon');
    });

    it('falls back to product name', () => {
        expect(getSearchTerm({ name: 'USB Cable' })).toBe('USB Cable');
    });
});
