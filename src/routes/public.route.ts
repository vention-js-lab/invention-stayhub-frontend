import { AuthRoutes } from '#/modules/auth';
import { HomeRoutes } from '#/modules/accommodations';
import { composeModuleRoutes } from '#/shared/utils/router.util';

export const publicRoutes = composeModuleRoutes(HomeRoutes, AuthRoutes);
