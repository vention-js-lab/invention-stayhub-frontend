import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Footer } from './footer/footer';
import { Header } from './header/header';

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
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
