import { AuthRoutes } from '#/modules/auth';
import { HomeRoutes } from '#/modules/home';
import { SingleAccommodationRoutes } from '#/modules/single-accommodation';
import { composeModuleRoutes } from '#/shared/utils/router.util';

export const publicRoutes = composeModuleRoutes(HomeRoutes, AuthRoutes, SingleAccommodationRoutes);
