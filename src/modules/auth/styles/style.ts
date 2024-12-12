import { pink } from '@mui/material/colors';

export const style = {
  mainBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 400,
    border: '1px solid #ddd',
    padding: '40px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    mb: 4,
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
