import { useState } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type Dayjs } from 'dayjs';
import { type FocusedElement } from '../types/search-focused-element.type';
import { DatePickerButton } from './datepicker-button';

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
  const [searchValue, setSearchValue] = useState('');
  const [focusedElement, setFocusedElement] = useState<FocusedElement>(null);
  const [checkinDate, setCheckinDate] = useState<Dayjs | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Dayjs | null>(null);

  const handleFocus = (element: FocusedElement) => setFocusedElement(element);
  const handleBlur = () => setFocusedElement(null);

  return (
    <Box sx={styles.searchContainer} style={{ backgroundColor: focusedElement ? '#e0e0e0' : '#fff' }}>
      <InputBase
        placeholder="Search..."
        value={searchValue}
        onFocus={() => handleFocus('search')}
        onBlur={handleBlur}
        onChange={(event) => setSearchValue(event.target.value)}
        sx={styles.inputBase(focusedElement === 'search' || focusedElement === null)}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePickerButton
          label="Check in"
          date={checkinDate}
          onDateChange={setCheckinDate}
          focused={focusedElement === 'checkin' || focusedElement === null}
          onFocus={() => handleFocus('checkin')}
          onBlur={handleBlur}
        />

        <DatePickerButton
          label="Check out"
          date={checkoutDate}
          onDateChange={setCheckoutDate}
          focused={focusedElement === 'checkout' || focusedElement === null}
          onFocus={() => handleFocus('checkout')}
          onBlur={handleBlur}
        />
      </LocalizationProvider>

      <SearchIcon sx={styles.searchIcon} />
    </Box>
  );
}
