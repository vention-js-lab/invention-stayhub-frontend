import Grid2 from '@mui/material/Grid2';
import CardImage from '#/assets/images/card-temp-image.jpg';
import { useWishlistQuery } from '../api/wishlist.api';
import { SkeletonList } from '#/modules/accommodations/components/skeleton-list';
import { CardSkeleton } from '#/modules/accommodations/components/accommodation-card/card-skeleton';
import { AccommodationCard } from '#/modules/accommodations/components/accommodation-card/accommodation-card';

export function Wishlist() {
  const { data, status } = useWishlistQuery();

  if (status === 'error') {
    return <p>{"Couldn't load data"}</p>;
  }

  if (status === 'pending') {
    return (
      <Grid2 container={true} spacing={3}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <div>
            <CardSkeleton />
          </div>
        </Grid2>
        <SkeletonList limit={12} />
      </Grid2>
    );
  }

  return (
    <Grid2 container={true} spacing={3}>
      {data.map((item) => (
        <Grid2 key={item.accommodation.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <AccommodationCard
            status={status}
            id={item.accommodation.id}
            image={CardImage}
            name={item.accommodation.name}
            address={item.accommodation.address}
            pricePerNight={item.accommodation.price}
            rating={4.8}
          />
        </Grid2>
      ))}
    </Grid2>
  );
}
