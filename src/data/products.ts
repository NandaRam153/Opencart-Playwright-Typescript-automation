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
    },
    IPHONE: {
        name: 'iPhone',
        category: 'Phones & PDAs',
        searchTerm: 'iPhone',
    },
    MACBOOK_PRO: {
        name: 'MacBook Pro',
        category: 'Laptops & Notebooks',
        searchTerm: 'MacBook Pro',
    },
};

/** Resolve the search term for a product (explicit searchTerm or product name). */
export function getSearchTerm(product: IProduct): string {
    return product.searchTerm ?? product.name;
}
