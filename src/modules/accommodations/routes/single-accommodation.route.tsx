import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AvatarImage from '#/assets/images/card-temp-image.jpg';
import { AccommodationDetails } from '../components/accommodation-details';
import { AccommodationImages } from '../components/accommodation-images';
import { AccommodationDetailsSkeleton } from '../components/skeleton-details';
import { AccommodationImagesSkeleton } from '../components/skeleton-images';
import { NoDataAvailable } from '#/shared/components/no-data-response';
import { AccommodationAmenities } from '../components/accommodation-amenities';
import { OwnerDetails } from '../components/owner-details';
import { useSingleAccommodationQuery } from '../api/single-accommodation.api';
import { ReviewsList } from '../components/reviews/reviews.component';
import { AccommodationRating } from '../components/reviews/rating.component';
import { ReservationCard } from '../components/reservation-card';
import { useValidatedUrlParams } from '#/shared/hooks/validated-url-params.hook';
import {
  singleAccommodationUrlParamsSchema,
  type SingleAccommodationUrlParams,
} from '../schemas/single-accommodation-url-params.schema';

const styles = {
  skeleton: { display: 'flex', justifyContent: 'space-between', mt: 2 },
  container: { padding: '0 16px 50px 0' },
  mainContent: { display: 'flex', justifyContent: 'space-between' },
  details: { maxWidth: '60%' },
};

export function SingleAccommodationRoute() {
  const { accommodationId } = useValidatedUrlParams<SingleAccommodationUrlParams>(singleAccommodationUrlParamsSchema);
  const { data, status } = useSingleAccommodationQuery(accommodationId);

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

  if (status === 'error') {
    return <NoDataAvailable data={'data'} />;
  }

  return (
    <Box sx={styles.container}>
      <AccommodationImages images={data.images} />
      <Box sx={styles.mainContent}>
        <Box sx={styles.details}>
          <AccommodationDetails data={data} />
          <Divider variant="middle" />
          <OwnerDetails image={AvatarImage} firstname="John" lastname="Doe" description="Something about the user" />
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
          accommodationId={data.id}
          bookings={data.bookings || []}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <AccommodationRating reviews={data.reviews} />
        <ReviewsList reviews={data.reviews} />
      </Box>
    </Box>
  );
}
