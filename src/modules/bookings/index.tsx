import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { CheckoutRoute } = lazyRoute(() => import('./routes/checkout.route'), 'CheckoutRoute');
const { BookingsRoute } = lazyRoute(() => import('./routes/bookings.route'), 'BookingsRoute');
const { ReviewRoute } = lazyRoute(() => import('./routes/review.route'), 'ReviewRoute');

export const BookingsRoutes: RouteObject[] = [
  {
    path: '/bookings',
    element: <BookingsRoute />,
  },
  {
    path: '/bookings/:bookingId/checkout',
    element: <CheckoutRoute />,
  },
  {
    path: '/bookings/:bookingId/review',
    element: <ReviewRoute />,
  },
];
