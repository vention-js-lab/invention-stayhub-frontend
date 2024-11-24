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
