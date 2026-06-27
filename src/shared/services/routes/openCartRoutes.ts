export const OpenCartRoutes = {
    home: 'index.php?route=common/home',
    search: (term: string) => `index.php?route=product/search&search=${encodeURIComponent(term)}`,
    cart: 'index.php?route=checkout/cart',
    cartAdd: 'index.php?route=checkout/cart/add',
    checkout: 'index.php?route=checkout/checkout',
    login: 'index.php?route=account/login',
    logout: 'index.php?route=account/logout',
    wishlist: 'index.php?route=account/wishlist',
} as const;
