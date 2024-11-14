import { type RouteObject } from 'react-router-dom';
import { lazyRoute } from '#/shared/utils/router.util';

const { RegisterRoute } = lazyRoute(() => import('./routes/register.route'), 'RegisterRoute');
const { LoginRoute } = lazyRoute(() => import('./routes/login.route'), 'LoginRoute');

export const AuthRoutes: RouteObject[] = [
  {
    path: '/auth/register',
    element: <RegisterRoute />,
  },
  {
    path: '/auth/login',
    element: <LoginRoute />,
  },
];
