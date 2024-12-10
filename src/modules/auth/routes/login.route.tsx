import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoginForm } from '../components/login-form';

const styles = {
  rootContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 400,
    border: '1px solid #ddd',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
};

export function LoginRoute() {
  return (
    <Box sx={styles.rootContainer}>
      <Box sx={styles.form}>
        <Typography textAlign="center" fontSize={24} fontWeight={700}>
          Welcome back
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
}
