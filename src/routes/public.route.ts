import { AuthRoutes } from '#/modules/auth';
import { HomeRoutes } from '#/modules/home';
import { AccommodationRoutes } from '#/modules/accommodation';
import { composeModuleRoutes } from '#/shared/utils/router.util';

export const publicRoutes = composeModuleRoutes(HomeRoutes, AuthRoutes, AccommodationRoutes);
