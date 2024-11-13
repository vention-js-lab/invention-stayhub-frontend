import Box from '@mui/material/Box';
import { LoginForm } from '../forms/login-form';
import { styles } from '../styles/styles';

export function LoginRoute() {
  return (
    <Box sx={styles.rootContainer}>
      <Box width={400}>
        <LoginForm />
      </Box>
    </Box>
  );
}
