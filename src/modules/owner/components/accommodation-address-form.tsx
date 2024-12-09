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
import { countries } from '#/shared/constants/countries';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { GoogleMapComponent } from './google-map';
import { useNavigate } from 'react-router-dom';

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
  const updateAccommodationMutation = useUpdateAccommodationMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    // watch,
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
          data,
        },
        {
          onSuccess: () => {
            navigate('/accommodations/create/image-amenities');
            localStorage.removeItem('createdAccommodationId');
          },
          onError: (error) => {
            showSnackbar({
              message: error.message,
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
      <Typography sx={styles.heading}>Enter Acommodation Address</Typography>
      <Grid2 container={true} spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="text"
            fullWidth={true}
            label="Street"
            {...register('street')}
            error={Boolean(errors.street)}
            helperText={errors.street?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="text"
            fullWidth={true}
            label="City"
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
                label="Choose a country"
                // {...register('country')}
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
            label="Zip Code"
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
          {updateAccommodationMutation.isPending ? 'Saving...' : 'Next'}
        </Button>
      </Box>
    </form>
  );
}
