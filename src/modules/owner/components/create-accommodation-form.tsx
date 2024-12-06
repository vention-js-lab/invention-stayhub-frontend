import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { type Theme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type CreateAccommodation, createAccommodationSchema } from '../schemas/create-accommodation.schema';
import { useCreateAccommodationMutation } from '../api/create-accommodation.api';
import { addCreatedAccommodation } from '#/store/slices/accommodation-slice';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { time } from '#/shared/libs/time.lib';

const styles = {
  heading: {
    marginTop: '16px',
    marginBottom: '16px',
    fontWeight: 'bold',
    fontSize: '28px',
    color: '#333',
  },
  button: {
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
    height: '42px',
    py: 2,
    px: 4,
    mt: 2,
  },
};

export function CreateAccommodationForm() {
  const createAccommodationMutation = useCreateAccommodationMutation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateAccommodation>({
    resolver: zodResolver(createAccommodationSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      available: true,
      squareMeters: 0,
      numberOfRooms: 0,
      allowedNumberOfPeople: 0,
      coverImage: '',
      images: [],
      amenity: undefined,
      address: undefined,
    },
  });

  const onSubmit: SubmitHandler<CreateAccommodation> = (data) => {
    createAccommodationMutation.mutate(data, {
      onSuccess: (response) => {
        dispatch(addCreatedAccommodation(response.id));
      },
      onError: () => {
        showSnackbar({
          message: 'Something went wrong. Please try again later',
          variant: 'error',
        });
      },
    });
  };

  const watchAvailableFrom = watch('availableFrom');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container={true} spacing={2}>
        <Grid2 size={{ xs: 12, sm: 10 }}>
          <Typography sx={styles.heading}>New Accommodation</Typography>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 2 }} mt={3} display="flex" justifyContent="flex-end" alignItems="center">
          <FormControlLabel
            label="Available"
            control={<Switch {...register('available')} defaultChecked={true} color="success" defaultValue="true" />}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="string"
            fullWidth={true}
            label="Accommodation Name"
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="number"
            fullWidth={true}
            label="Number of Rooms"
            {...register('numberOfRooms', { valueAsNumber: true })}
            error={Boolean(errors.numberOfRooms)}
            helperText={errors.numberOfRooms?.message}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="number"
            fullWidth={true}
            label="Square Meters"
            {...register('squareMeters', { valueAsNumber: true })}
            error={Boolean(errors.squareMeters)}
            helperText={errors.squareMeters?.message}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="number"
            fullWidth={true}
            label="Price"
            {...register('price', { valueAsNumber: true })}
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="number"
            fullWidth={true}
            label="Allowed Number of People"
            {...register('allowedNumberOfPeople', { valueAsNumber: true })}
            error={Boolean(errors.allowedNumberOfPeople)}
            helperText={errors.allowedNumberOfPeople?.message}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="date"
            fullWidth={true}
            label="Available From"
            defaultValue={time().format('YYYY-MM-DD')}
            {...register('availableFrom')}
            error={Boolean(errors.availableFrom)}
            helperText={errors.availableFrom?.message}
            slotProps={{
              input: {
                error: Boolean(errors.availableFrom),
                onClick: (event) => {
                  const inputElement = event.target;
                  if (inputElement instanceof HTMLInputElement) {
                    inputElement.showPicker();
                  }
                },
              },
            }}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth={true}
            label="Description"
            multiline={true}
            {...register('description', { required: 'First name is required' })}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="date"
            fullWidth={true}
            label="Available To"
            defaultValue={time().add(1, 'day').format('YYYY-MM-DD')}
            {...register('availableTo')}
            error={Boolean(errors.availableTo)}
            helperText={errors.availableTo?.message}
            slotProps={{
              input: {
                error: Boolean(errors.availableTo),
                onClick: (event) => {
                  const inputElement = event.target;
                  if (inputElement instanceof HTMLInputElement) {
                    inputElement.showPicker();
                  }
                },
              },
              htmlInput: {
                min: time(watchAvailableFrom).format('YYYY-MM-DD'),
              },
            }}
          />
        </Grid2>
      </Grid2>

      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained" sx={styles.button} disabled={createAccommodationMutation.isPending}>
          {createAccommodationMutation.isPending ? 'Saving...' : 'Next'}
        </Button>
      </Box>
    </form>
  );
}
