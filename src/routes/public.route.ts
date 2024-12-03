import { ProfileRoutes } from '#/modules/account';
import { AuthRoutes } from '#/modules/auth';
import { AccommodationsRoutes } from '#/modules/accommodations';
import { composeModuleRoutes } from '#/shared/utils/router.util';

export const publicRoutes = composeModuleRoutes(AuthRoutes, AccommodationsRoutes, ProfileRoutes);
