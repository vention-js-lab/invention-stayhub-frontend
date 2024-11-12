import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const styles = {
  passwordBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'right',
  },
};

export function LoginCard() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" textAlign="center">
        Welcome back
      </Typography>
      <TextField id="login-email" label="Email" />
      <Box sx={styles.passwordBox}>
        <TextField id="login-password" label="Password" fullWidth={true} />
        <Link href="" fontSize="small" ml="auto" variant="body2">
          Forgot your password?
        </Link>
      </Box>
      <Button id="login-submit" variant="contained" size="large" color="info">
        Log in
      </Button>
      <Box display="flex" justifyContent="center">
        <Typography>New to StayHub?</Typography>
        <Link href="/register" ml={0.5}>
          Create your account
        </Link>
      </Box>
    </Stack>
  );
}
