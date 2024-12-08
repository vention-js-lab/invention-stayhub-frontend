import { useNavigate } from 'react-router-dom';
import { ErrorLayout } from './error-layout';

interface UnexpectedErrorProps {
  errorMessage?: string;
}

export function ApplicationError({ errorMessage }: UnexpectedErrorProps) {
  const navigate = useNavigate();

  return (
    <ErrorLayout
      title="Application Error"
      message={errorMessage || 'Something went wrong. Please try again later.'}
      reloadButton={true}
      actionLabel="Go Home"
      onAction={() => navigate('/')}
    />
  );
}

export function UnknownError() {
  const navigate = useNavigate();

  return (
    <ErrorLayout
      title="Oops!"
      message="An unknown error occurred. Please try again later."
      reloadButton={true}
      actionLabel="Go Home"
      onAction={() => navigate('/')}
    />
  );
}
