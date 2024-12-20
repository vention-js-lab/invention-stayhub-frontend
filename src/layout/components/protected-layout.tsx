import Box from '@mui/material/Box';
import { useAuth } from '#/shared/hooks/auth.hook';
import { Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function ProtectedLayout() {
  const { t } = useTranslation();
  const { authStatus } = useAuth();

  if (authStatus === 'pending') {
    return (
      <Box mt="var(--header-height)" sx={{ textAlign: 'center' }}>
        {t('UI.loading')}
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
