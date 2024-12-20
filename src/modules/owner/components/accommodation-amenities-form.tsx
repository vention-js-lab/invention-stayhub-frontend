import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useUpdateAccommodationMutation } from '../api/update-accommodation.api';
import { useNavigate } from 'react-router-dom';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { amenitySchema, type CreateAccommodationAmenity } from '../schemas/accommodation-amenity.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { type Theme } from '@mui/material';
import { amenitiesMap } from '#/shared/constants/amenities-map.constant';
import { type AmenityKey } from '#/shared/constants/accommodation-amenity.type';
import { type UpdateAmenityData } from '../types/create-accommodation-response.type';
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

  amenityButtons: (isSelected: boolean) => ({
    border: '1px solid #C7C7C7',
    borderColor: isSelected ? '#E91E63' : '#C7C7C7',
    fontSize: '16px',
    borderRadius: '20px',
    width: '100%',
    height: '50px',
    backgroundColor: isSelected ? '#E91E63' : '#fff',
    margin: '0 2px 2px 0',
    color: isSelected ? '#fff' : '#C7C7C7',
    '&:hover': {
      borderColor: '#E91E63',
      backgroundColor: '#E91E63',
      color: '#fff',
    },
  }),
};

export function AccommodationAmenitiesForm() {
  const { t } = useTranslation();
  const updateAccommodationMutation = useUpdateAccommodationMutation<UpdateAmenityData>();
  const navigate = useNavigate();
  const { handleSubmit, setValue, getValues, control } = useForm<CreateAccommodationAmenity>({
    resolver: zodResolver(amenitySchema),
  });

  const onSubmit: SubmitHandler<CreateAccommodationAmenity> = (data) => {
    const accommodationId = localStorage.getItem('createdAccommodationId');
    if (accommodationId) {
      updateAccommodationMutation.mutate(
        {
          id: accommodationId,
          data: { amenity: data },
        },
        {
          onSuccess: () => {
            navigate(`/accommodations/${accommodationId}`);
            localStorage.removeItem('createdAccommodationId');
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

  const handleAmenitySelection = (amenityKey: AmenityKey) => {
    setValue(amenityKey, !getValues(amenityKey));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={styles.heading}>{t('accommodation.amenitiesTitle')}</Typography>
      <Grid2 container={true} spacing={2} columns={3}>
        {Object.entries(amenitiesMap).map(([key, { icon: Icon }]) => (
          <Grid2 key={key} size={{ xs: 1 }}>
            <Controller
              key={key}
              name={key as AmenityKey}
              control={control}
              render={({ field }) => (
                <IconButton
                  sx={styles.amenityButtons(Boolean(field.value))}
                  onClick={() => handleAmenitySelection(key as AmenityKey)}
                >
                  <Icon />
                  <Typography>{t(`amenities.${key}`)}</Typography>
                </IconButton>
              )}
            />
          </Grid2>
        ))}
      </Grid2>
      <Box mt={2} mb={5} display="flex" justifyContent="flex-end">
        <Button variant="contained" sx={styles.button} type="submit">
          {t('accommodation.submit')}
        </Button>
      </Box>
    </form>
  );
}
