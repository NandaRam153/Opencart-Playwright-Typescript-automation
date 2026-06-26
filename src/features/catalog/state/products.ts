import { IProduct } from '@opencart-auto/pw-core';

export const products: Record<string, IProduct> = {
    NIKON_D300: {
        name: 'Nikon D300',
        category: 'Cameras',
        searchTerm: 'Nikon',
        productId: 31,
    },
    CANON_EOS_5D: {
        name: 'Canon EOS 5D',
        category: 'Cameras',
        searchTerm: 'Canon',
        productId: 30,
    },
    IPHONE: {
        name: 'iPhone',
        category: 'Phones & PDAs',
        searchTerm: 'iPhone',
        productId: 40,
    },
    MACBOOK_PRO: {
        name: 'MacBook Pro',
        category: 'Laptops & Notebooks',
        searchTerm: 'MacBook Pro',
        productId: 45,
    },
};

/** Resolve the search term for a product (explicit searchTerm or product name). */
export function getSearchTerm(product: IProduct): string {
    return product.searchTerm ?? product.name;
}

/** Return catalog product_id or throw with a clear data-file hint. */
export function requireProductId(product: IProduct, catalogKey?: string): number {
    if (product.productId === undefined) {
        const label = catalogKey ?? product.name;
        throw new Error(
            `Product "${label}" is missing productId in src/features/catalog/state/products.ts`
        );
    }
    return product.productId;
}
