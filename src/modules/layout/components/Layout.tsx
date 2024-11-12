import { Outlet } from 'react-router-dom';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import Box from '@mui/material/Box';

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
      <Box sx={{ padding: 3, flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
