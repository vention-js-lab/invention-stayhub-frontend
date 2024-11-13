import { pink } from '@mui/material/colors';

export const style = {
  regRouter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 400,
    p: 4,
    boxShadow: 10,
    bgcolor: 'background.paper',
    transform: 'translate(-50%, -50%)',
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    cursor: 'pointer',
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: pink[500],
    py: 2,
    mt: 2,
  },
  snackBar: {
    '& .MuiSnackbarContent-root': {
      backgroundColor: 'red',
      opacity: 2,
      fontSize: '1rem',
      textAlign: 'center',
      padding: '2px 24px',
      width: '100%',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    },
  },
};
