import { useNavigate } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { zodResolver } from '@hookform/resolvers/zod';

import { style } from '../styles/style';
import { registerFormDataSchema, type RegisterFormData } from '../schemas/register-form.schema';
import { useRegisterMutation } from '../api/register.api';
import { useSnackbar } from 'notistack';

export function RegisterForm() {
  const { mutation } = useRegisterMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormDataSchema),
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error: Error) => {
        enqueueSnackbar(error.message, {
          variant: 'error',
          hideIconVariant: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        {...register('firstName', { required: 'First name is required' })}
        error={Boolean(errors.firstName)}
        helperText={errors.firstName?.message}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        {...register('lastName', { required: 'Last name is required' })}
        error={Boolean(errors.lastName)}
        helperText={errors.lastName?.message}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email format',
          },
        })}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
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
      <TextField
        label="Confirm Password"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        type="password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === watch('password') || 'Passwords do not match',
        })}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
      />
      <Button type="submit" variant="contained" sx={style.button} fullWidth={true}>
        Sign Up
      </Button>
    </form>
  );
}
