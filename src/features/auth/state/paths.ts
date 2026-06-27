import { OpenCartRoutes } from '../../../shared/services/routes/openCartRoutes';

export const AuthPaths = {
    login: OpenCartRoutes.login,
    logout: OpenCartRoutes.logout,
} as const;

/** Playwright URL glob for post-logout navigation. */
export const AUTH_LOGOUT_URL_PATTERN = '**/logout**';
