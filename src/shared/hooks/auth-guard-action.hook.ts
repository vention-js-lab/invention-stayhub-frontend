import { useAuth } from '#/shared/hooks/auth.hook';
import { enqueueSnackbar } from 'notistack';
import { useCallback } from 'react';

type CallbackFunction = () => void;

export function useAuthGuardAction() {
  const { authStatus } = useAuth();

  return useCallback(
    (callback: CallbackFunction) => {
      if (authStatus !== 'authenticated') {
        enqueueSnackbar('You need to log in to perform this action', {
          variant: 'error',
          hideIconVariant: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
        return;
      }

      callback();
    },
    [authStatus]
  );
}
