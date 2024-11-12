import Box from '@mui/material/Box';
import { LoginCard } from '../components/login-form';

export function LoginRoute() {
  return (
    <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
      <Box width={400}>
        <LoginCard />
      </Box>
    </Box>
  );
}
