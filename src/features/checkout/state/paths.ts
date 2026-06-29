import { OpenCartRoutes } from '../../../shared/services/routes/openCartRoutes';

/** Playwright URL pattern after Continue from order success (derived from `OpenCartRoutes.home`). */
export const HOME_CONTINUE_URL_PATTERN = /route=common\/home/;

export const CheckoutPaths = {
    checkout: OpenCartRoutes.checkout,
} as const;
