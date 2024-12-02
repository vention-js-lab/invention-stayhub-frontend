import { publicRoutes } from '#/routes/public.route';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '#/layout/components/layout';
import { privateRoutes } from './private.route';

export const router = createBrowserRouter([
  {
    id: 'App wrapper',
    path: '/',
    element: <Layout />,
    children: [...publicRoutes, ...privateRoutes],
  },
]);
