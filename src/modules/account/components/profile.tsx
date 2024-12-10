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
import { personalInfoSchema, type PersonalInfoData } from '../schemas/personal-info.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserUpdateMutation } from '../api/update-user.api';
import { CountrySelect } from './country-select';
import { Countries } from '../constants/countries.constant';
import DefaultImage from '#/assets/images/avatar-placeholder.png';
import { ImageUpload } from './image-upload';
import { type Country } from '../types/country.type';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';

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
  imageBox: { display: 'flex', alignItems: 'center', gap: '25px' },
  image: { width: '150px', height: '150px', borderRadius: '75px', objectFit: 'cover' },
  inputsContainer: { width: '100%' },
  formControl: { m: 1, width: '50%', gap: '5px' },
  formControlGender: { m: 1, width: '50%', gap: '5px' },
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

export function ProfileInfo({ firstName, lastName, image, country, description, gender, phoneNumber }: UserInfoProps) {
  const [disabled, setDisabled] = useState(true);
  const [imageUrl, setImageUrl] = useState(image || DefaultImage);
  const mutation = useUserUpdateMutation();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: { firstName, lastName, country, phoneNumber, gender, description },
  });

  const onSubmit: SubmitHandler<PersonalInfoData> = (data) => {
    mutation.mutate(
      { ...data, image: imageUrl },
      {
        onSuccess: () => setDisabled(true),
        onError: () => {
          showSnackbar({
            message: 'Phone number is invalid',
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
      <Stack sx={styles.userHeader}>
        <Box sx={styles.imageBox}>
          <Box sx={{ position: 'relative' }}>
            <ImageUpload defaultImage={imageUrl} onImageUpload={handleImageUpload} disabled={disabled} />
          </Box>
          <Typography>
            {watch('firstName')} {watch('lastName')}
          </Typography>
        </Box>
        <Button sx={styles.editButton} disabled={!disabled} variant="contained" onClick={() => setDisabled(false)}>
          Edit
        </Button>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" sx={styles.inputsContainer}>
          <Stack spacing={4}>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>First name</Typography>
              <TextField
                disabled={disabled}
                {...register('firstName')}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
              />
            </FormControl>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>Last name</Typography>
              <TextField
                disabled={disabled}
                {...register('lastName')}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
              />
            </FormControl>
          </Stack>
          <Stack spacing={4}>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>Country</Typography>
              <CountrySelect
                disabled={disabled}
                selectedCountry={Countries.find((c) => c.label === watch('country')) || null}
                onCountryChange={handleCountryChange}
              />
            </FormControl>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>Phone number</Typography>
              <TextField disabled={disabled} {...register('phoneNumber')} />
            </FormControl>
          </Stack>
          <Stack spacing={4}>
            <FormControl sx={styles.formControlGender}>
              <Typography>Gender</Typography>
              <Select value={watch('gender')} onChange={(e) => setValue('gender', e.target.value)} disabled={disabled}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={styles.formControl}>
              <Typography>Description</Typography>
              <TextField multiline={true} disabled={disabled} {...register('description')} />
            </FormControl>
          </Stack>
        </Stack>
        {!disabled && (
          <Stack direction="row" justifyContent="flex-start">
            <Button type="submit" sx={styles.saveButton} variant="contained">
              Save
            </Button>
            <Button sx={styles.cancelButton} variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </Stack>
        )}
      </form>
    </Box>
  );
}
