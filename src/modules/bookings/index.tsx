import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { CheckoutRoute } = lazyRoute(() => import('./routes/checkout.route'), 'CheckoutRoute');

export const BookingsRoutes: RouteObject[] = [
  {
    path: '/bookings/:bookingId/checkout',
    element: <CheckoutRoute />,
  },
];
