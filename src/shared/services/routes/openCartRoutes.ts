export const OpenCartRoutes = {
    home: 'index.php?route=common/home',
    search: (term: string) => `index.php?route=product/search&search=${encodeURIComponent(term)}`,
    cart: 'index.php?route=checkout/cart',
    cartAdd: 'index.php?route=checkout/cart/add',
    login: 'index.php?route=account/login',
} as const;
