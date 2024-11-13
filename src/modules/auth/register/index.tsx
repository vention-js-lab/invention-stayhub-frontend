import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { RegisterRoute } = lazyRoute(() => import('./routes/register.route'), 'RegisterRoute');

export const RegisterRoutes: RouteObject[] = [
  {
    path: '/auth/register',
    element: <RegisterRoute />,
  },
];
