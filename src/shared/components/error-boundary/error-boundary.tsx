import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { ActionErrorsMap, GenericError } from './action-errors';
import { ApplicationError, UnknownError } from './application-errors';

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return ActionErrorsMap.get(error.status) ?? <GenericError status={error.status} statusText={error.statusText} />;
  }

  if (error instanceof Error) {
    return <ApplicationError errorMessage={error.message} />;
  }

  return <UnknownError />;
}
