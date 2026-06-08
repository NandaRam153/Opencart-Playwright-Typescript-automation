export interface IProduct {
    name: string;
    price?: number;
    category?: string;
    /** Term used in header search to find this product (defaults to name when omitted). */
    searchTerm?: string;
    /** OpenCart catalog product_id used for cart API calls. */
    productId?: number;
}
