import { AccommodationDetails } from '../components/accommodation-details';
import { AccommodationImages } from '../components/accommodation-images';
import { useAccommodationQuery } from '#/modules/home/api/single-accommodation.api';
import { useParams } from 'react-router-dom';
import { ReservationCard } from '../components/reservation-card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function SingleAccommodationRoute() {
  const { id } = useParams<{ id: string }>();
  const { data } = useAccommodationQuery(id || '');
  if (!data) {
    return <Typography>No data is provided</Typography>;
  }

  return (
    <>
      <AccommodationImages images={data.images} />
      <Box sx={{ display: 'flex', gap: 10 }}>
        <AccommodationDetails data={data} />
        <ReservationCard
          pricePerNight={data.price}
          cleaningFee={35}
          serviceFee={70}
          maxGuests={data.allowedNumberOfPeople}
          availableFrom="2024.10.04"
          availableTo="2024.11.04"
        />
      </Box>
    </>
  );
}
