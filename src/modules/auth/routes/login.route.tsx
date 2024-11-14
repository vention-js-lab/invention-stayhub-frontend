import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoginForm } from '../forms/login-form';

const styles = {
  rootContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export function LoginRoute() {
  return (
    <Box sx={styles.rootContainer}>
      <Box width={400}>
        <Typography textAlign="center" fontSize={24}>
          Welcome back
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
}
