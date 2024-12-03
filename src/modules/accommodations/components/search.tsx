import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type Dayjs } from 'dayjs';
import { type FocusedElement } from '../types/search-focused-element.type';
import { DatePickerButton } from './datepicker-button';
import { type AccommodationFilterParams } from '../types/accommodation-filter-params.type';
import { useListAccommodationQueryParams } from '../hooks/list-accommodations-query-params.hook';

const styles = {
  searchContainer: {
    margin: '10px 10px 10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
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

  inputBase: (isFocused: boolean) => ({
    paddingX: '16px',
    marginLeft: '7px',
    borderRadius: '35px',
    height: '80%',
    backgroundColor: isFocused ? '#fff' : '#e0e0e0',
    fontSize: '16px',
    color: '#333',
  }),
};

export function Search() {
  const { setQueryParams } = useListAccommodationQueryParams();
  const { handleSubmit } = useForm();
  const [focusedElement, setFocusedElement] = useState<FocusedElement>(null);
  const [searchParams, setSearchParams] = useState<AccommodationFilterParams>({
    search: '',
  });

  const handleFocus = (element: FocusedElement) => setFocusedElement(element);
  const handleBlur = () => setFocusedElement(null);

  const handleSearchChange = (search: string) => {
    setSearchParams((prev) => ({
      ...prev,
      search,
    }));
  };

  const handleDateChange = (key: 'availableFrom' | 'availableTo') => (date: Dayjs | null) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: date ? date.format('YYYY-MM-DD') : null,
    }));
  };

  const onSubmit = () => {
    setQueryParams(searchParams);
    setSearchParams({ search: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.searchContainer} style={{ backgroundColor: focusedElement ? '#e0e0e0' : '#fff' }}>
        <InputBase
          placeholder="Search..."
          value={searchParams.search}
          onFocus={() => handleFocus('search')}
          onBlur={handleBlur}
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={styles.inputBase(focusedElement === 'search' || focusedElement === null)}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerButton
            label="Check in"
            date={searchParams.availableFrom || null}
            onDateChange={handleDateChange('availableFrom')}
            focused={focusedElement === 'checkin' || focusedElement === null}
            onFocus={() => handleFocus('checkin')}
            onBlur={handleBlur}
          />

          <DatePickerButton
            label="Check out"
            date={searchParams.availableTo || null}
            onDateChange={handleDateChange('availableTo')}
            focused={focusedElement === 'checkout' || focusedElement === null}
            onFocus={() => handleFocus('checkout')}
            onBlur={handleBlur}
          />
        </LocalizationProvider>

        <IconButton type="submit" sx={styles.searchIcon}>
          <SearchIcon />
        </IconButton>
      </Box>
    </form>
  );
}
