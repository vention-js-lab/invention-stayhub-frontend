import { AuthRoutes } from '#/modules/auth';
import { AccommodationsRoutes } from '#/modules/accommodations';
import { composeModuleRoutes } from '#/shared/utils/router.util';
import { WishlistRoutes } from '#/modules/wishlist';

export const publicRoutes = composeModuleRoutes(AuthRoutes, AccommodationsRoutes, WishlistRoutes);
