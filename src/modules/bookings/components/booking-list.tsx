import Grid2 from '@mui/material/Grid2';
import { useBookingsQuery } from '../api/bookings.api';
import { type BookingStatus } from '../constants/booking-status.constant';
import { type Booking } from '../types/booking.type';
import { BookingCard } from './booking-card/booking-card';
import { NoResult } from '#/shared/components/no-result';
import { calculateOverallRating } from '#/modules/accommodations/components/reviews/rating.component';
import { useTranslation } from 'react-i18next';
import DefaultImage from '#/assets/images/default-home-image.png';

interface BookingsProps {
  selectedCategory: BookingStatus;
}

export function Bookings({ selectedCategory }: BookingsProps) {
  const { data, status, refetch } = useBookingsQuery();
  const { t } = useTranslation();

  if (status === 'error') {
    return <p>{t('UI.loadData')}</p>;
  }

  const filteredBookings = data?.[selectedCategory] || [];

  return (
    <Grid2 container={true} spacing={3}>
      {filteredBookings.length > 0 ? (
        filteredBookings.map((booking: Booking) => (
          <Grid2 key={booking.accommodation.id} size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 6 }}>
            <BookingCard
              status={status}
              bookingStatus={booking.status}
              id={booking.id}
              accommodationId={booking.accommodationId}
              pricePerNight={booking.accommodation.price}
              address={booking.accommodation.address}
              image={booking.accommodation.coverImage ? booking.accommodation.coverImage : DefaultImage}
              name={booking.accommodation.name}
              startDate={booking.startDate}
              endDate={booking.endDate}
              onCancel={refetch}
              createdAt={booking.createdAt}
              rating={calculateOverallRating(booking.accommodation.reviews)}
            />
          </Grid2>
        ))
      ) : (
        <NoResult text={t('empties.emptyCategory')} />
      )}
    </Grid2>
  );
}
