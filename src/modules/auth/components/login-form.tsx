import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuth } from '#/shared/hooks/auth.hook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormData, loginFormDataSchema } from '../schemas/login-form.schema';
import { LoginButton } from './login-button';
import { LoadingButton } from './login-loading-button';
import { useLoginMutation } from '../api/login.api';
import { setCurrentUser, setAuthStatus } from '#/redux/slices/auth-slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { parseAuthError } from '../utils/auth-error-parser.util';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { RegisterLink } from './register-link';
import { GoogleAuthLogin } from './google-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { validatedEnv } from '#/configs/env.config';

const styles = {
  passwordContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'right',
  },
};

const googleClientId = validatedEnv.VITE_GOOGLE_CLIENT_ID;

export function LoginForm() {
  const loginMutation = useLoginMutation();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormDataSchema),
  });

  function onSubmit(loginFormData: LoginFormData) {
    loginMutation.mutate(loginFormData, {
      onSuccess: (data) => {
        const user = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };

        login(user);
        dispatch(setCurrentUser(user));
        dispatch(setAuthStatus('authenticated'));
        navigate('/');
      },
      onError: (error) => {
        showSnackbar({ message: parseAuthError(error), variant: 'error' });
      },
    });
  }

  return (
    <Stack direction="column" spacing={2}>
      <Typography align="center" mt={1}>
        Please enter your email and password
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
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
            label="Password"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password should be at least 6 characters' },
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        </Box>
        {loginMutation.isPending ? <LoadingButton /> : <LoginButton />}
      </form>
      <RegisterLink />
      <GoogleOAuthProvider clientId={googleClientId}>
        <GoogleAuthLogin />
      </GoogleOAuthProvider>
    </Stack>
  );
}
