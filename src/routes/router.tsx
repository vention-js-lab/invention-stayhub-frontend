import { privateRoutes } from '#/routes/private.route';
import { publicRoutes } from '#/routes/public.route';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '#/layout/components/layout';
import { ProtectedLayout } from '#/layout/components/protected-layout';

export const router = createBrowserRouter([
  {
    id: 'App wrapper',
    path: '/',
    element: <Layout />,
    children: [...publicRoutes],
  },

  {
    id: 'Private Routes Wrapper',
    path: '/',
    element: <ProtectedLayout />,
    children: [...privateRoutes],
  },
]);
