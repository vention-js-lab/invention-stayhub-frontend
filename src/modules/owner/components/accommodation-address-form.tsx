import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateAccommodationMutation } from '../api/update-accommodation.api';
import { addressSchema, type CreateAccommodationAddress } from '../schemas/accommodation-address.schema';
import { type Theme } from '@mui/material';
import { countries } from '#/shared/constants/countries.constant';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { GoogleMapComponent } from './google-map';
import { useNavigate } from 'react-router-dom';
import { type UpdateAddressData } from '../types/create-accommodation-response.type';
import { useTranslation } from 'react-i18next';

const styles = {
  heading: {
    marginTop: '16px',
    marginBottom: '16px',
    fontWeight: 'bold',
    fontSize: '24px',
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

export function AddressForm() {
  const { t } = useTranslation();
  const updateAccommodationMutation = useUpdateAccommodationMutation<UpdateAddressData>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateAccommodationAddress>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit: SubmitHandler<CreateAccommodationAddress> = (data) => {
    const accommodationId = localStorage.getItem('createdAccommodationId');
    if (accommodationId) {
      updateAccommodationMutation.mutate(
        {
          id: accommodationId,
          data: {
            address: {
              street: data.street,
              city: data.city,
              country: data.country,
              zipCode: data.zipCode,
              latitude: data.latitude,
              longitude: data.longitude,
            },
          },
        },
        {
          onSuccess: () => {
            navigate('/accommodations/create/image-amenities');
          },
          onError: () => {
            showSnackbar({
              message: t('snackbars.errorSomething'),
              variant: 'error',
            });
          },
        }
      );
    }
  };

  const onLocationChange = (lat: number, lng: number) => {
    setValue('latitude', lat);
    setValue('longitude', lng);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={styles.heading}>{t('accommodation.enterAccommodationAddress')}</Typography>
      <Grid2 container={true} spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="text"
            fullWidth={true}
            label={t('accommodation.street')}
            {...register('street')}
            error={Boolean(errors.street)}
            helperText={errors.street?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="text"
            fullWidth={true}
            label={t('accommodation.city')}
            {...register('city')}
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Autocomplete
            id="country-select"
            fullWidth={true}
            options={countries}
            autoHighlight={true}
            getOptionLabel={(option) => option.name}
            onChange={(_, value) => setValue('country', value?.name || '', { shouldValidate: true })}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                  />
                  {option.name} ({option.code})
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('accommodation.country')}
                error={Boolean(errors.country)}
                helperText={errors.country?.message}
                slotProps={{
                  htmlInput: {
                    ...params.inputProps,
                    autoComplete: 'password',
                  },
                }}
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="text"
            fullWidth={true}
            label={t('accommodation.zipCode')}
            {...register('zipCode')}
            error={Boolean(errors.zipCode)}
            helperText={errors.zipCode?.message}
          />
        </Grid2>
      </Grid2>
      <Box>
        <GoogleMapComponent onLocationChange={onLocationChange} />
      </Box>
      <Box mt={3} mb={5} display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained" sx={styles.button} disabled={updateAccommodationMutation.isPending}>
          {updateAccommodationMutation.isPending ? t('accommodation.saving') : t('accommodation.next')}
        </Button>
      </Box>
    </form>
  );
}
