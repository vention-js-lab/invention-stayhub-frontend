import Grid2 from '@mui/material/Grid2';
import CardImage from '#/assets/images/card-temp-image.jpg';
import { AccommodationCard } from './accommodation-card';
import { useListAccommodationsQuery } from '../api/list-accommodations.api';
import { useEffect, useState } from 'react';
import { type Accommodation } from '../types/accommodation.type';
import { SkeletonList } from './skeleton-list';

export function AccommodationList() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const limit = 20;
  const { error, data: fetchedAccommodations } = useListAccommodationsQuery(page, limit);

  useEffect(() => {
    if (fetchedAccommodations) {
      setAccommodations((prev) => [...prev, ...fetchedAccommodations]);
      setLoading(false);
      setInitialLoading(false);
    }
  }, [fetchedAccommodations]);

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollHeight - 300 < window.scrollY + window.innerHeight) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  if (error) return <div>Couldn&apos;t load data</div>;

  return (
    <Grid2 container={true} spacing={3} px={5} py={3}>
      {initialLoading ? (
        <SkeletonList limit={limit} />
      ) : (
        accommodations.map((accommodation) => (
          <Grid2 key={crypto.randomUUID()} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <AccommodationCard
              image={CardImage}
              name={accommodation.name}
              address={`${accommodation.address.city}, ${accommodation.address.country}`}
              pricePerNight={accommodation.price}
              rating={4.8}
            />
          </Grid2>
        ))
      )}

      {loading ? <SkeletonList limit={limit} /> : null}
    </Grid2>
  );
}
