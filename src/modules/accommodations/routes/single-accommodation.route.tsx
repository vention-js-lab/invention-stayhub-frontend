import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
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
import { SingleAccommodationMap } from '../components/single-accommodation-map';
import { parseAddress } from '../utils/parse-address.util';
import Typography from '@mui/material/Typography';

const styles = {
  skeleton: { display: 'flex', justifyContent: 'space-between', mt: 2 },
  container: { padding: '0 16px 50px 0' },
  mainContent: { display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' },
  details: { maxWidth: { xs: '100%', md: '60%' } },
  reservationCard: { order: { xs: 2, md: 1 } },
  reviewsSection: { order: { xs: 1, md: 2 } },
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
          <OwnerDetails
            id={data.ownerId}
            since={data.owner.createdAt}
            image={data.owner.avatar}
            firstname={data.owner.firstName}
            lastname={data.owner.lastName}
            description={data.owner.description}
          />
          <Divider variant="middle" />
          <AccommodationAmenities amenities={data.amenity} />
        </Box>
        <Box sx={styles.reservationCard}>
          <ReservationCard
            pricePerNight={data.price}
            maxGuests={data.allowedNumberOfPeople}
            availableFrom={data.availableFrom}
            availableTo={data.availableTo}
            accommodationId={data.id}
            bookings={data.bookings || []}
          />
        </Box>
      </Box>
      <Box sx={styles.reviewsSection}>
        <AccommodationRating reviews={data.reviews} />
        <ReviewsList reviews={data.reviews} />
      </Box>
      {data.address?.latitude && data.address.longitude ? (
        <>
          <Divider />
          <SingleAccommodationMap latitude={data.address.latitude} longitude={data.address.longitude} />
        </>
      ) : null}
      <Typography fontSize={16} fontWeight="bold" mt={2}>
        {parseAddress(data.address)}
      </Typography>
    </Box>
  );
}
