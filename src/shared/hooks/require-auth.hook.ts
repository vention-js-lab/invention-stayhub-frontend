import { useAuth } from '#/shared/hooks/auth.hook';
import { enqueueSnackbar } from 'notistack';
import { authToastMessages } from '../constants/auth-toast-messages.constant';

export function useRequireAuth() {
  const { currentUser } = useAuth();

  return (callback: () => void) => {
    if (currentUser) {
      callback();
    } else {
      enqueueSnackbar(authToastMessages.unauthorized, {
        variant: 'error',
        hideIconVariant: true,
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };
}
