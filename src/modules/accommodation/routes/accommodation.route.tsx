import { AccommodationDetails } from '../components/accommodation-details';
import { AccommodationImages } from '../components/accommodation-images';
import { useAccommodationQuery } from '#/modules/accommodation/api/accommodation.api';
import { useParams } from 'react-router-dom';
import { ReservationCard } from '../components/reservation-card';
import Box from '@mui/material/Box';
import { AccommodationDetailsSkeleton } from '../components/skeleton-details';
import { AccommodationImagesSkeleton } from '../components/skeleton-images';
import { NoDataAvailable } from '#/shared/components/no-data-response';
import { AccommodationAmenities } from '../components/accommodation-amenities';
import Divider from '@mui/material/Divider';
import { UserDetails } from '../components/user-details';
import AvatarImage from '#/assets/images/card-temp-image.jpg';

const styles = {
  skeleton: { display: 'flex', justifyContent: 'space-between', mt: 2 },
  container: { padding: '0 16px 50px 0' },
  mainContent: { display: 'flex', justifyContent: 'space-between' },
  details: { maxWidth: '60%' },
};

export function AccommodationRoute() {
  const { id } = useParams<{ id: string }>();
  const { data, status } = useAccommodationQuery(id);

  if (status === 'pending') {
    return (
      <Box>
        <AccommodationImagesSkeleton />
        <Box sx={styles.skeleton}>
          <AccommodationDetailsSkeleton />
        </Box>
      </Box>
    );
  }
  if (!data) {
    return <NoDataAvailable data={'data'} />;
  }
  return (
    <Box sx={styles.container}>
      <AccommodationImages images={data.images} />
      <Box sx={styles.mainContent}>
        <Box sx={styles.details}>
          <AccommodationDetails data={data} />
          <Divider variant="middle" />
          <UserDetails image={AvatarImage} firstname="John" lastname="Doe" description="Something about the user" />
          <Divider variant="middle" />
          <AccommodationAmenities amenities={data.amenity} />
        </Box>
        <ReservationCard
          pricePerNight={data.price}
          cleaningFee={35}
          serviceFee={70}
          maxGuests={data.allowedNumberOfPeople}
          availableFrom={data.availableFrom}
          availableTo={data.availableTo}
        />
      </Box>
    </Box>
  );
}
