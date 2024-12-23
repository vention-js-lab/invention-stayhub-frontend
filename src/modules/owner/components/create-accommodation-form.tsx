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
import { addCreatedAccommodation } from '#/redux/slices/accommodation-slice';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { time } from '#/shared/libs/time.lib';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SelectCategory } from './select-category';
import { useEffect, useState } from 'react';

const styles = {
  heading: {
    marginTop: '16px',
    marginBottom: '16px',
    fontWeight: 'bold',
    fontSize: '28px',
    color: '#333',
    '@media (max-width: 960px)': {
      fontSize: '24px',
    },
    '@media (max-width: 600px)': {
      marginBottom: 0,
      fontSize: '20px',
    },
  },
  button: {
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
    height: '42px',
    py: 2,
    px: 4,
    mt: 2,
  },
  availability: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

export function CreateAccommodationForm() {
  const { t } = useTranslation();
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const createAccommodationMutation = useCreateAccommodationMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
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
      categories: [],
    },
  });

  useEffect(() => {
    setValue('categories', categoryIds);
  }, [categoryIds, setValue]);

  const onSubmit: SubmitHandler<CreateAccommodation> = (data) => {
    createAccommodationMutation.mutate(
      { ...data, categories: categoryIds },
      {
        onSuccess: (response) => {
          if (response.data.id) {
            dispatch(addCreatedAccommodation(response.data.id));
            if (response.data.id) localStorage.setItem('createdAccommodationId', response.data.id);
          }
          navigate('/accommodations/create/address');
        },
        onError: () => {
          showSnackbar({
            message: t('snackbars.errorSomething'),
            variant: 'error',
          });
        },
      }
    );
  };

  const watchAvailableFrom = watch('availableFrom');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container={true} spacing={2}>
        <Grid2 size={{ xs: 12, sm: 10 }}>
          <Typography sx={styles.heading}>{t('accommodation.new')}</Typography>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 1 }} style={styles.availability}>
          <FormControlLabel
            label={t('accommodation.available')}
            control={<Switch {...register('available')} defaultChecked={true} color="success" defaultValue="true" />}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="text"
            fullWidth={true}
            label={t('accommodation.name')}
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="number"
            fullWidth={true}
            label={t('accommodation.rooms')}
            {...register('numberOfRooms', { valueAsNumber: true })}
            error={Boolean(errors.numberOfRooms)}
            helperText={errors.numberOfRooms?.message}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="number"
            fullWidth={true}
            label={t('accommodation.squareMeters')}
            {...register('squareMeters', { valueAsNumber: true })}
            error={Boolean(errors.squareMeters)}
            helperText={errors.squareMeters?.message}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="number"
            fullWidth={true}
            label={t('accommodation.price')}
            {...register('price', { valueAsNumber: true })}
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="number"
            fullWidth={true}
            label={t('accommodation.people')}
            {...register('allowedNumberOfPeople', { valueAsNumber: true })}
            error={Boolean(errors.allowedNumberOfPeople)}
            helperText={errors.allowedNumberOfPeople?.message}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="date"
            fullWidth={true}
            label={t('accommodation.availableFrom')}
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
            label={t('accommodation.description')}
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
            label={t('accommodation.availableTo')}
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
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <SelectCategory categoryIds={categoryIds} setCategoryIds={setCategoryIds} />
        </Grid2>
      </Grid2>

      <Box mt={3} display="flex" justifyContent="flex-end" mb={6}>
        <Button type="submit" variant="contained" sx={styles.button} disabled={createAccommodationMutation.isPending}>
          {createAccommodationMutation.isPending ? t('accommodation.saving') : t('accommodation.next')}
        </Button>
      </Box>
    </form>
  );
}
