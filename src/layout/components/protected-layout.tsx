import Box from '@mui/material/Box';
import { useAuth } from '#/shared/hooks/auth.hook';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedLayout() {
  const { authStatus } = useAuth();

  if (authStatus === 'pending') {
    return (
      <Box mt="var(--header-height)" sx={{ textAlign: 'center' }}>
        Loading...
      </Box>
    );
  }

  if (authStatus !== 'authenticated') {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return (
    <Box>
      <Outlet />
    </Box>
  );
}
