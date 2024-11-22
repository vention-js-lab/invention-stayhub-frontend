import { AccommodationCard } from '#/modules/home/components/accommodation-card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardImage from '#/assets/images/card-temp-image.jpg';

export function HomeRoute() {
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
    </Box>
  );
}
