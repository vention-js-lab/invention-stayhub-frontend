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
};
