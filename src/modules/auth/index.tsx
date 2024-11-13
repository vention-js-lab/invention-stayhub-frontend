import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { LoginRoute } = lazyRoute(() => import('./login/routes/login.route'), 'LoginRoute');

export const AuthRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginRoute />,
  },
];
