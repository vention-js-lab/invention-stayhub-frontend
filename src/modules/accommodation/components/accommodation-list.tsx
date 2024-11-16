import Grid2 from '@mui/material/Grid2';
import { ApartmentCard } from '#/modules/home/components/card';
import { AccommodationCardSkeleton } from './card-skeleton';

export function AccommodationList() {
  const apartments = Array(18)
    .fill(null)
    .map((_, index) => <ApartmentCard key={index} />);

  return (
    <Grid2 container={true} spacing={3} px={5} py={3}>
      {apartments.map((item) => (
        <Grid2 key={item.key} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <AccommodationCardSkeleton />
        </Grid2>
      ))}
    </Grid2>
  );
}
