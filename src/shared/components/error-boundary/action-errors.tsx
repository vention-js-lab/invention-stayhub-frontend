import { type ReactNode } from 'react';
import { ErrorLayout } from './error-layout';
import { useNavigate } from 'react-router-dom';

export const ActionErrorsMap = new Map<number, ReactNode>([
  [404, <NotFoundError key="404" />],
  [500, <ServerError key="500" />],
]);

function NotFoundError() {
  const navigate = useNavigate();

  return (
    <ErrorLayout
      title="404 - Page Not Found"
      message="The page you're looking for doesn't exist. It may have been moved or deleted."
      actionLabel="Go Home"
      onAction={() => navigate('/')}
    />
  );
}

function ServerError() {
  const navigate = useNavigate();

  return (
    <ErrorLayout
      title="500 - Server Error"
      message="Something went wrong on our side. Please try again later."
      reloadButton={true}
      actionLabel="Go Home"
      onAction={() => navigate('/')}
    />
  );
}

interface GenericErrorProps {
  status: number;
  statusText?: string;
}

export function GenericError({ status, statusText }: GenericErrorProps) {
  const navigate = useNavigate();

  return (
    <ErrorLayout
      title={`Error ${status}`}
      message={statusText || 'An unexpected error occurred.'}
      reloadButton={true}
      actionLabel="Go Back"
      onAction={() => navigate(-1)}
    />
  );
}
