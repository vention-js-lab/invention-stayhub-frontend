import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { type Theme } from '@mui/material/styles';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { type SelectChangeEvent } from '@mui/material';
import { PhoneCodes } from '#/shared/data/phone-masks';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { personalInfoSchema, type PersonalInfoData } from '../schemas/personal-info.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserUpdateMutation } from '../api/user-update.api';

interface UserInfoProps {
  image: string;
  name: string;
  lastname: string;
  phoneNumber: string;
  country: string;
  gender: string;
  description: string;
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
};
const CountryDialCodes: Record<string, string> = PhoneCodes;

export function ProfileInfo({ name, lastname, image, country, description, gender, phoneNumber }: UserInfoProps) {
  const [disabled, setDisabled] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [phone, setPhone] = useState(phoneNumber);
  const [selectedDender, setSelectedDender] = useState(gender);
  const mutation = useUserUpdateMutation();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoData>({ resolver: zodResolver(personalInfoSchema) });

  const onSave: SubmitHandler<PersonalInfoData> = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {},
    });
  };

  const handleCountryChange = (event: SelectChangeEvent) => {
    const selectCountryCode = event.target.value;
    setSelectedCountry(selectCountryCode);
    setPhone(CountryDialCodes[selectCountryCode] || '');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack sx={styles.userHeader}>
        <Box sx={styles.imageBox}>
          <Box component="img" sx={styles.image} src={image} alt="User image" />
          <Typography>
            {name} {lastname}
          </Typography>
        </Box>
        <Button sx={styles.editButton} disabled={!disabled} variant="contained" onClick={() => setDisabled(!disabled)}>
          Edit
        </Button>
      </Stack>
      <form onSubmit={handleSubmit(onSave)}>
        <Stack direction="column" sx={styles.inputsContainer}>
          <Stack spacing={4}>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>Firstname</Typography>
              <OutlinedInput
                disabled={disabled}
                id="outlined-adornment-weight"
                defaultValue={name}
                error={Boolean(errors.firstname)}
              />
            </FormControl>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>Lastname</Typography>
              <OutlinedInput disabled={disabled} id="outlined-adornment-weight" defaultValue={lastname} />
            </FormControl>
          </Stack>
          <Stack spacing={4}>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>Country</Typography>
              <Select disabled={disabled} value={selectedCountry} onChange={handleCountryChange}>
                <MenuItem value={'uzb'}>Uzbekistan</MenuItem>
                <MenuItem value={'rus'}>Russia</MenuItem>
                <MenuItem value={'usa'}>USA</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={styles.formControl} variant="outlined">
              <Typography>Phone number</Typography>
              <OutlinedInput
                disabled={disabled}
                id="outlined-adornment-weight"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
          </Stack>
          <Stack spacing={4}>
            <FormControl sx={styles.formControlGender}>
              <Typography>Gender</Typography>
              <Select value={selectedDender} disabled={disabled} onChange={(e) => setSelectedDender(e.target.value)}>
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={styles.formControl}>
              <Typography>Description</Typography>
              <TextField
                placeholder={description}
                multiline={true}
                minRows={3}
                maxRows={4}
                // value={description}
                disabled={disabled}
              />
            </FormControl>
          </Stack>
        </Stack>
      </form>
      {!disabled ? (
        <Button
          sx={styles.saveButton}
          variant="contained"
          onClick={() => {
            setDisabled(!disabled);
          }}
        >
          Save
        </Button>
      ) : null}
    </Box>
  );
}
