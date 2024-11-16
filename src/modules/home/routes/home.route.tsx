import { AccommodationCard } from '#/modules/home/components/accommodation-card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardImage from '#/assets/images/card-temp-image.jpg';
import { headerHeight } from '#/modules/layout/components/header/header';
import { footerHeight } from '#/modules/layout/components/footer/footer';
import { useEffect, useState } from 'react';
import { AccommodationList } from '#/modules/accommodation/components/accommodation-list';

const filterAreaHeight = 60;
const styles = {
  filterArea: (showShadow: boolean) => ({
    minHeight: filterAreaHeight,
    position: 'fixed',
    top: `${headerHeight}px`,
    left: 0,
    right: 0,
    zIndex: 2,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
    boxShadow: showShadow ? '0px 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'box-shadow 0.3s ease',
  }),
};

export function HomeRoute() {
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box>
      <Typography variant="h2">Home sweet home</Typography>
      <Typography>Welcome to the home route.</Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '72px',
        }}
      >
        <AccommodationCard
          image={CardImage}
          name={'Apartment name'}
          address={'Beautiful apartment in the city center address'}
          pricePerNight={50}
          rating={4.8}
        />
        <AccommodationCard
          image={CardImage}
          name={'Apartment name'}
          address={'Beautiful apartment in the city center address'}
          pricePerNight={50}
          rating={4.8}
        />
      </Box>
    <Box mt={`${headerHeight + filterAreaHeight}px`} mb={`${footerHeight}px`}>
      <Box sx={styles.filterArea(showShadow)} />
      <AccommodationList />
    </Box>
  );
}
