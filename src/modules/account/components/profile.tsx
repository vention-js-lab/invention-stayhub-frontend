import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { type Theme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { profileSchema, type ProfileData } from '../schemas/profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserUpdateMutation } from '../api/update-user.api';
import { CountrySelect } from './country-select';
import { Countries } from '../constants/countries.constant';
import DefaultImage from '#/assets/images/avatar-placeholder.png';
import { ImageUpload } from './image-upload';
import { type Country } from '../types/country.type';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';

interface UserInfoProps {
  image?: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  country?: string;
  gender?: string;
  description?: string;
}

const styles = {
  userHeader: { alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', padding: '8px 16px' },
  imageBox: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: 'center',
    gap: '15px',
  },
  image: {
    width: { xs: '100px', sm: '150px' },
    height: { xs: '100px', sm: '150px' },
    borderRadius: '50%',
    objectFit: 'cover',
  },
  inputsContainer: { width: '100%' },
  formControl: { width: { xs: '100%', sm: '48%' }, gap: '5px' },
  formControlGender: { m: 1, width: { xs: '100%', sm: '48%' }, gap: '5px' },
  editButton: {
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
    padding: '8px 40px',
  },
  saveButton: {
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
    margin: '15px',
    padding: '8px 40px',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    margin: '15px',
    padding: '8px 40px',
  },
};

// eslint-disable-next-line complexity
export function ProfileInfo({ firstName, lastName, image, country, description, gender, phoneNumber }: UserInfoProps) {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(true);
  const [imageUrl, setImageUrl] = useState(image || DefaultImage);
  const mutation = useUserUpdateMutation();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName, lastName, country, phoneNumber, gender, description },
  });

  const onSubmit: SubmitHandler<ProfileData> = (data) => {
    mutation.mutate(
      { ...data, image: imageUrl },
      {
        onSuccess: () => setDisabled(true),
        onError: () => {
          showSnackbar({
            message: t('snackbars.errorPhoneNumber'),
            variant: 'error',
          });
        },
      }
    );
  };

  const handleCancel = () => {
    setDisabled(true);
    setValue('firstName', firstName);
    setValue('lastName', lastName);
    setValue('country', country);
    setValue('phoneNumber', phoneNumber);
    setValue('gender', gender);
    setValue('description', description);
    clearErrors();
  };
  const handleImageUpload = (uploadedImageUrl: string) => {
    setImageUrl(uploadedImageUrl);
  };
  const handleCountryChange = (_: unknown, newCountry: Country | null) => {
    setValue('country', newCountry?.label || '');
    setValue('phoneNumber', newCountry?.phone ? `+${newCountry.phone}` : '');
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Stack sx={styles.userHeader} direction={isSmallScreen ? 'column' : 'row'}>
        <Box sx={styles.imageBox}>
          <Box sx={{ position: 'relative' }}>
            <ImageUpload defaultImage={imageUrl} onImageUpload={handleImageUpload} disabled={disabled} />
          </Box>
          <Typography sx={{ px: '8px', fontWeight: 500, fontSize: '20px' }}>
            {watch('firstName')} {watch('lastName')}
          </Typography>
        </Box>
        <Button sx={styles.editButton} disabled={!disabled} variant="contained" onClick={() => setDisabled(false)}>
          {t('profile.buttons.edit')}
        </Button>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" sx={styles.inputsContainer}>
          <Stack spacing={4} direction={isSmallScreen ? 'column' : 'row'}>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>{t('profile.name')}</Typography>
              <TextField
                disabled={disabled}
                {...register('firstName')}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
              />
            </FormControl>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>{t('profile.surname')}</Typography>
              <TextField
                disabled={disabled}
                {...register('lastName')}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
              />
            </FormControl>
          </Stack>
          <Stack spacing={4} direction={isSmallScreen ? 'column' : 'row'}>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>{t('profile.country')}</Typography>
              <CountrySelect
                disabled={disabled}
                selectedCountry={Countries.find((c) => c.label === watch('country')) || null}
                onCountryChange={handleCountryChange}
              />
            </FormControl>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>{t('profile.phone')}</Typography>
              <TextField disabled={disabled} {...register('phoneNumber')} />
            </FormControl>
          </Stack>
          <Stack spacing={4} direction={isSmallScreen ? 'column' : 'row'}>
            <FormControl sx={styles.formControlGender}>
              <Typography>{t('profile.gender')}</Typography>
              <Select value={watch('gender')} onChange={(e) => setValue('gender', e.target.value)} disabled={disabled}>
                <MenuItem value="male">{t('profile.genders.male')}</MenuItem>
                <MenuItem value="female">{t('profile.genders.female')}</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={styles.formControl}>
              <Typography>{t('profile.description')}</Typography>
              <TextField multiline={true} disabled={disabled} {...register('description')} />
            </FormControl>
          </Stack>
        </Stack>
        {!disabled && (
          <Stack direction={isSmallScreen ? 'column' : 'row'} justifyContent="flex-start">
            <Button type="submit" sx={styles.saveButton} variant="contained">
              {t('profile.buttons.save')}
            </Button>
            <Button sx={styles.cancelButton} variant="contained" onClick={handleCancel}>
              {t('profile.buttons.cancel')}
            </Button>
          </Stack>
        )}
      </form>
    </Box>
  );
}
