import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { CreateAccommodationRoute } from './routes/create-accommodation.route';
import { UpdateAccommodationAddressRoute } from './routes/update-accommodation-address';

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
];
