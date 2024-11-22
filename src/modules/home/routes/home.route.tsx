import { AccommodationCard } from '#/modules/home/components/accommodation-card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardImage from '#/assets/images/card-temp-image.jpg';
import { ReservationCard } from '../components/reservation-card';

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
        <ReservationCard
          pricePerNight={100}
          cleaningFee={35}
          serviceFee={70}
          maxGuests={8}
          availableFrom="2024-10-01"
          availableTo="2025-12-31"
        />
      </Box>
    </Box>
  );
}
