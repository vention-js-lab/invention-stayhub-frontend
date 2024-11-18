import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Footer } from './footer/footer';
import { Header, headerHeight } from './header/header';

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
      <Box mt={`${headerHeight}px`}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
