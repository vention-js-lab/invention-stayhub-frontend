import Box from '@mui/material/Box';
import { useAuth } from '#/shared/hooks/auth.hook';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from './header/header';
import { Footer } from './footer/footer';

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingX: 15,
      }}
    >
      <Header />
      <Box mt="var(--header-height)" mb="var(--footer-height)">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
