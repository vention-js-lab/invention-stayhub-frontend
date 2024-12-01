import { WishlistRoutes } from '#/modules/wishlist';
import { composeModuleRoutes } from '#/shared/utils/router.util';

export const privateRoutes = composeModuleRoutes(WishlistRoutes);
