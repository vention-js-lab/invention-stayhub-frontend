import { privateRoutes } from '#/routes/private.route';
import { publicRoutes } from '#/routes/public.route';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    id: 'App wrapper',
    path: '/',
    children: [...publicRoutes, ...privateRoutes],
  },
]);
