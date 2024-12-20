import { useForm, Controller } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';
import { DatePickerButton } from './datepicker-button';
import { type AccommodationFilterParams } from '../types/accommodation-filter-params.type';
import { useListAccommodationQueryParams } from '../hooks/list-accommodations-query-params.hook';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

const styles = {
  searchContainer: {
    margin: '10px 10px 10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.4)',
    borderRadius: '35px',
    height: '60px',
    maxWidth: '700px',
  },

  searchIcon: {
    margin: '0px 7px',
    height: '48px',
    width: '48px',
    padding: '10px',
    borderRadius: '50%',
    backgroundColor: '#E91E63',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#CA1A55',
    },
  },

  inputBase: {
    paddingX: '16px',
    marginLeft: '7px',
    borderRadius: '35px',
    height: '80%',
    backgroundColor: '#fff',
    fontSize: '16px',
    color: '#333',
  },
};

export function Search() {
  const { t } = useTranslation();
  const { setQueryParams } = useListAccommodationQueryParams();
  const { handleSubmit, control, setValue, getValues } = useForm<AccommodationFilterParams>();

  const handleDateChange = (key: 'availableFrom' | 'availableTo') => (date: Dayjs | null) => {
    const newValue = date ? date.format('YYYY-MM-DD') : undefined;
    setValue(key, newValue);

    const { availableFrom, availableTo } = getValues();

    if (availableFrom && availableTo && dayjs(availableFrom).isAfter(dayjs(availableTo))) {
      const swapKey = key === 'availableTo' ? 'availableFrom' : 'availableTo';
      setValue(swapKey, newValue);
    }
  };

  const onSubmit = (data: AccommodationFilterParams) => {
    setQueryParams(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.searchContainer}>
        <Controller
          name="search"
          control={control}
          defaultValue=""
          render={({ field }) => <InputBase placeholder={t('filterArea.search')} {...field} sx={styles.inputBase} />}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="availableFrom"
            control={control}
            render={({ field }) => (
              <DatePickerButton
                label={t('filterArea.checkin')}
                date={field.value ? dayjs(field.value) : null}
                onDateChange={handleDateChange('availableFrom')}
              />
            )}
          />

          <Controller
            name="availableTo"
            control={control}
            render={({ field }) => (
              <DatePickerButton
                label={t('filterArea.checkout')}
                date={field.value ? dayjs(field.value) : null}
                onDateChange={handleDateChange('availableTo')}
              />
            )}
          />
        </LocalizationProvider>

        <IconButton type="submit" sx={styles.searchIcon}>
          <SearchIcon />
        </IconButton>
      </Box>
    </form>
  );
}
