import { HomeRoutes } from '#/modules/home';
import { composeModuleRoutes } from '#/utils/router.util';

export const publicRoutes = composeModuleRoutes(HomeRoutes);
