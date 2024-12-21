import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { CreateAccommodationRoute } from './routes/create-accommodation.route';
import { UpdateAccommodationAddressRoute } from './routes/update-accommodation-address';
import { UpdateAccommodationImageAmenitiesRoute } from './routes/update-accommodation-image-amenities.route';
import { OwnerProfile } from './components/owner-profile';

const { OwnerRoute } = lazyRoute(() => import('./routes/owner.route'), 'OwnerRoute');

export const OwnerRoutes: RouteObject[] = [
  {
    path: '/accommodations',
    element: <OwnerRoute />,
  },
  {
    path: '/accommodations/create',
    element: <CreateAccommodationRoute />,
  },
  {
    path: '/accommodations/create/address',
    element: <UpdateAccommodationAddressRoute />,
  },
  {
    path: '/accommodations/create/image-amenities',
    element: <UpdateAccommodationImageAmenitiesRoute />,
  },
  {
    path: '/users/profile/:ownerId',
    element: <OwnerProfile />,
  },
];
