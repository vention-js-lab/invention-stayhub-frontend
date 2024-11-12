import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Logo } from './Logo';
import { Search } from './Search';
import { ProfileOptions } from './ProfileOptions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export function Header() {
  const [search, setSearch] = useState(false);

  function handleSearch() {
    setSearch((prev) => !prev);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: 80,
        borderBottom: '1px solid #ddd',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'space-between' },
            alignItems: 'center',
            minHeight: 80,
            px: 4,
          }}
        >
          <Logo />
          <Search search={search} handleSearch={handleSearch} />
          <ProfileOptions />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            maxHeight: search ? '100px' : '0px',
            overflow: 'hidden',
            opacity: search ? 1 : 0,
            transform: search ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <TextField sx={{ borderRadius: 20, mt: 1 }} label="Location" variant="outlined" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Check in" />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Check out" />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Container>
    </Box>
  );
}
