import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { RegisterLink } from '../components/register-link';
import { useAuth } from '#/shared/hooks/auth.hook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormData, loginFormDataSchema } from '../schemas/login-form.schema';
import { LoginButton } from '../components/login-button';
import { LoadingButton } from '../components/login-loading-button';

const styles = {
  passwordContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'right',
  },
};

export function LoginForm() {
  const { login, status, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormDataSchema),
  });

  function onSubmit(loginFormData: LoginFormData) {
    login({ email: loginFormData.email, password: loginFormData.password });
  }

  return (
    <Stack direction="column" spacing={2}>
      {status === 'error' ? (
        <Typography color="error" align="center" mt={1}>
          {error}
        </Typography>
      ) : (
        <Typography align="center" mt={1}>
          Please enter your email and password to log in
        </Typography>
      )}

      <form
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
        {status === 'pending' ? <LoadingButton /> : <LoginButton />}
      </form>
      <RegisterLink />
    </Stack>
  );
}
