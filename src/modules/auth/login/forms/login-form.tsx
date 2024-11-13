import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styles } from '../styles/styles';
import { RegisterLink } from '../components/register-link';
import { useAuth } from '#/hooks/auth.hook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormData, loginFormDataSchema } from '../schemas/login-form.schema';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function LoginForm() {
  const { login, status, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormDataSchema),
  });

  async function onSubmit(loginFormData: LoginFormData) {
    await login({ email: loginFormData.email, password: loginFormData.password });
  }

  useEffect(() => {
    if (status === 'success') {
      navigate('/');
    }
  }, [status, navigate]);

  return (
    <Stack direction="column" spacing={2}>
      <Typography textAlign="center" sx={styles.welcomeText}>
        Welcome back
      </Typography>

      {status === 'failed' && (
        <Typography color="error" align="center" mt={1}>
          {error || 'Login failed. Please try again.'}
        </Typography>
      )}

      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <TextField
          id="email"
          label="Email"
          fullWidth={true}
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          autoComplete="email"
        />
        <Box sx={styles.passwordContainer}>
          <TextField
            id="password"
            label="Password"
            fullWidth={true}
            {...register('password')}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            autoComplete="current-password"
          />
          <Link href="" fontSize="small" ml="auto">
            Forgot your password?
          </Link>
        </Box>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="info"
          fullWidth={true}
          disabled={status === 'pending'}
          sx={styles.loginButton}
        >
          {status === 'pending' ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
      <RegisterLink />
    </Stack>
  );
}
