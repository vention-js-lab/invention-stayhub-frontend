import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Header } from './header/header';
import { Footer } from './footer/footer';

export function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingX: 15,
        '@media (max-width: 960px)': {
          paddingX: 10,
        },
        '@media (max-width: 600px)': {
          paddingX: 4,
        },
      }}
    >
      <Header />
      <Box mt="var(--header-height)" mb="var(--footer-height)">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
