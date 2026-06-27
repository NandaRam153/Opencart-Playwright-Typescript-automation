import { OpenCartRoutes } from '../../../shared/services/routes/openCartRoutes';

/** Header link targets derived from shared routes (no cross-feature imports). */
export const HeaderRoutes = {
    cart: OpenCartRoutes.cart,
    checkout: OpenCartRoutes.checkout,
} as const;
