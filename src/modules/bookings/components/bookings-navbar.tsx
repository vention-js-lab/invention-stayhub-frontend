import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookingStatus } from '../constants/booking-status.constant';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Logo } from '#/layout/components/header/logo';

interface BookingsNavbarProps {
  selectedCategory: BookingStatus;
  onCategoryChange: (status: BookingStatus) => void;
}

const styles = {
  navItem: (isSelected: boolean) => ({
    width: '100%',
    textAlign: 'center',
    borderBottom: isSelected ? '3px solid #E91E63' : '1px solid #e9e9e9',
    fontSize: '16px',
    fontWeight: '500',
    padding: '10px 5px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    '&:hover': {
      transition: 'border-bottom-color 0.2s linear',
      borderBottom: isSelected ? '' : '3px solid #e9e9e9',
    },
  }),
};

export function BookingsNavbar({ selectedCategory, onCategoryChange }: BookingsNavbarProps) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <nav style={{ display: 'flex', marginBottom: '14px', width: '100%' }}>
      {!isMobile ? (
        Object.values(BookingStatus).map((status) => (
          <Typography key={status} sx={styles.navItem(selectedCategory === status)} onClick={() => onCategoryChange(status)}>
            {t(`bookings.categories.${status}`)}
          </Typography>
        ))
      ) : (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
          <IconButton sx={{}} aria-label="menu" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ width: 250 }}>
            <div style={{ width: 250, paddingTop: '20px' }}>
              <Box sx={{ mb: '24px' }}>
                <Logo />
              </Box>
              {Object.values(BookingStatus).map((status) => (
                <Typography
                  key={status}
                  sx={styles.navItem(selectedCategory === status)}
                  onClick={() => {
                    onCategoryChange(status);
                    setDrawerOpen(false);
                  }}
                >
                  {t(`bookings.categories.${status}`)}
                </Typography>
              ))}
            </div>
          </Drawer>
        </Box>
      )}
    </nav>
  );
}
