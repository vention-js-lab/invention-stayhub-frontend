import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';
import { DatePickerButton } from './datepicker-button';
import { type AccommodationFilterParams } from '../types/accommodation-filter-params.type';
import { useListAccommodationQueryParams } from '../hooks/list-accommodations-query-params.hook';

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
  const { setQueryParams } = useListAccommodationQueryParams();
  const { handleSubmit } = useForm();
  const [searchParams, setSearchParams] = useState<AccommodationFilterParams>({});

  const handleSearchChange = (search: string) => {
    setSearchParams((prev) => ({
      ...prev,
      search,
    }));
  };

  const handleDateChange = (key: 'availableFrom' | 'availableTo') => (date: Dayjs | null) => {
    setSearchParams((prev) => {
      const updatedParams = {
        ...prev,
        [key]: date ? date.format('YYYY-MM-DD') : null,
      };

      const { availableFrom, availableTo } = updatedParams;

      if (availableFrom && availableTo && dayjs(availableFrom).isAfter(dayjs(availableTo))) {
        const swapKey = key === 'availableTo' ? 'availableFrom' : 'availableTo';
        updatedParams[swapKey] = updatedParams[key];
      }

      return updatedParams;
    });
  };

  const onSubmit = () => {
    setQueryParams(searchParams);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.searchContainer}>
        <InputBase
          placeholder="Search..."
          value={searchParams.search || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={styles.inputBase}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerButton
            label="Check in"
            date={searchParams.availableFrom || null}
            onDateChange={handleDateChange('availableFrom')}
          />

          <DatePickerButton
            label="Check out"
            date={searchParams.availableTo || null}
            onDateChange={handleDateChange('availableTo')}
          />
        </LocalizationProvider>

        <IconButton type="submit" sx={styles.searchIcon}>
          <SearchIcon />
        </IconButton>
      </Box>
    </form>
  );
}
