import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { LoginRoute } = lazyRoute(() => import('./routes/login.route'), 'LoginRoute');

export const AuthRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginRoute />,
  },
];
