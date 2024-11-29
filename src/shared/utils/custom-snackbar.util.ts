import { enqueueSnackbar } from 'notistack';

interface CustomSnackbar {
  message: string;
  variant?: 'default' | 'error' | 'success' | 'warning' | 'info';
}

export function showSnackbar({ message, variant }: CustomSnackbar) {
  enqueueSnackbar(message, {
    variant,
    hideIconVariant: true,
    autoHideDuration: 3000,
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
  });
}
