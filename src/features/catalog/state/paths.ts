import { OpenCartRoutes } from '../../../shared/services/routes/openCartRoutes';

export const CatalogPaths = {
    search: (term: string) => OpenCartRoutes.search(term),
} as const;
