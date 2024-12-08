import { publicRoutes } from '#/routes/public.route';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '#/layout/components/layout';
import { privateRoutes } from './private.route';
import { ErrorBoundary } from '../shared/components/error-boundary/error-boundary';

export const router = createBrowserRouter([
  {
    id: 'App wrapper',
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [...publicRoutes, ...privateRoutes],
  },
]);
