import { RegisterRoutes } from '#/modules/auth/register';
import { HomeRoutes } from '#/modules/home';
import { composeModuleRoutes } from '#/utils/router.util';

export const publicRoutes = composeModuleRoutes(HomeRoutes, RegisterRoutes);
