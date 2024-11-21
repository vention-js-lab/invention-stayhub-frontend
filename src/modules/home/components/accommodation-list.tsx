import Grid2 from '@mui/material/Grid2';
import CardImage from '#/assets/images/card-temp-image.jpg';
import { AccommodationCard } from './accommodation-card';
import { useListAccommodationsQuery } from '../api/list-accommodations.api';
import { useEffect, useRef, useState } from 'react';
import { SkeletonList } from './skeleton-list';
import { debounce } from '#/shared/utils/debouncer.util';
import { type Accommodation } from '../types/accommodation.type';
import { CardSkeleton } from './card-skeleton';

export function AccommodationList() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const { error, data: fetchedData } = useListAccommodationsQuery(page, limit);

  useEffect(() => {
    const calculateInitialLimit = () => {
      if (cardRef.current) {
        const cardHeight = cardRef.current.clientHeight;
        const cardWidth = cardRef.current.clientWidth;

        const itemsPerRow = Math.floor(window.innerWidth / cardWidth);
        const rowsRequired = Math.ceil(window.innerHeight / cardHeight);

        return itemsPerRow * rowsRequired * 2;
      }

      return limit;
    };

    setLimit(calculateInitialLimit());
  }, [limit]);

  useEffect(() => {
    if (fetchedData) {
      setAccommodations((prev) => [...prev, ...fetchedData.result]);
      setLoading(false);
      setInitialLoading(false);
    }
  }, [fetchedData]);

  useEffect(() => {
    let hasNextPage = false;

    if (fetchedData) {
      hasNextPage = fetchedData.metadata.hasNextPage;
    }

    const handleScroll = () => {
      if (document.body.scrollHeight - 300 < window.scrollY + window.innerHeight && hasNextPage && !loading) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 300);
    window.addEventListener('scroll', debouncedHandleScroll);

    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [loading, fetchedData]);

  if (initialLoading) {
    return (
      <Grid2 container={true} spacing={3} px={5} py={3}>
        <Grid2 key={crypto.randomUUID()} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <div ref={cardRef}>
            <CardSkeleton />
          </div>
        </Grid2>
        <SkeletonList limit={limit} />
      </Grid2>
    );
  }

  if (error) return <div>{"Couldn't load data"}</div>;

  return (
    <Grid2 container={true} spacing={3} px={5} py={3}>
      {accommodations.map((accommodation) => (
        <Grid2 key={crypto.randomUUID()} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <AccommodationCard
            id={accommodation.id}
            image={CardImage}
            name={accommodation.name}
            address={`${accommodation.address.city}, ${accommodation.address.country}`}
            pricePerNight={accommodation.price}
            rating={4.8}
          />
        </Grid2>
      ))}

      {loading ? <SkeletonList limit={limit} /> : null}
    </Grid2>
  );
}
