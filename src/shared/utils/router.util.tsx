import { lazy, Suspense } from 'react';
import { type RouteObject } from 'react-router-dom';

/**
 * A wrapper around React.lazy that allows for lazy loading of named exports.
 * Should be used only for route components.
 * @see https://github.com/facebook/react/issues/14603#issuecomment-726551598
 */
export function lazyRoute<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}

export const composeModuleRoutes = (...routes: RouteObject[][]): RouteObject[] => {
  return routes.flatMap((moduleRoutes) => {
    const routesWithLazyComponents = moduleRoutes.map((route) => {
      return {
        ...route,
        element: <Suspense fallback={null}>{route.element}</Suspense>,
      };
    });

    return routesWithLazyComponents;
  });
};
