import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import { useMutation } from '@tanstack/react-query';

import { style } from '../styles/style';
import { type FormData } from '../types/form-data.type';
import { axiosClient } from '#/configs/axios.config';

export function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const mutation = useMutation<void, Error, FormData>({
    mutationFn: (data: FormData) => axiosClient.post('auth/register', data),
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      setOpenSnackbar(true);
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // navigate('/');
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
    >
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={errorMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={style.snackBar}
      />
    </form>
  );
}
