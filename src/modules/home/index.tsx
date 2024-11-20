import { lazyRoute } from '#/shared/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { HomeRoute } = lazyRoute(() => import('./routes/home.route'), 'HomeRoute');
const { AccountRoute } = lazyRoute(() => import('../account/routes/account.route'), 'AccountRoute');

export const HomeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeRoute />,
  },
  {
    path: '/account/personal-info',
    element: <AccountRoute />,
  },
];
