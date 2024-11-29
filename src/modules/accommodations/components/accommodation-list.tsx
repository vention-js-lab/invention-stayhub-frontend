import Grid2 from '@mui/material/Grid2';
import CardImage from '#/assets/images/card-temp-image.jpg';
import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AccommodationCard } from './accommodation-card';
import { useListAccommodationsQuery } from '../api/list-accommodations.api';
import { SkeletonList } from './skeleton-list';
import { CardSkeleton } from './card-skeleton';
import { useInView } from 'react-intersection-observer';
import { useListAccommodationQueryParams } from '#/modules/accommodations/hooks/list-accommodations-query-params.hook';
import { useInfiniteScroll } from '#/shared/hooks/infinite-scroll.hook';
import { usePaginationLimit } from '#/modules/accommodations/hooks/pagination-limit.hook';

export function AccommodationList() {
  const { ref: bottomOfPageRef, inView: isBottomOfPageInView } = useInView();
  const { validatedQueryParams } = useListAccommodationQueryParams();
  const cardRef = useRef<HTMLDivElement>(null);

  const { limit } = usePaginationLimit({ cardRef });
  const { fetchNextPage, hasNextPage, isFetchingNextPage, status, data } = useListAccommodationsQuery(
    limit,
    validatedQueryParams
  );

  useInfiniteScroll({
    isBottomOfPageInView,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (status === 'error') {
    return <p>{"Couldn't load data"}</p>;
  }

  if (status === 'pending') {
    return (
      <Grid2 container={true} spacing={3} px={5} py={3}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <div ref={cardRef}>
            <CardSkeleton />
          </div>
        </Grid2>
        <SkeletonList limit={limit - 1} />
      </Grid2>
    );
  }

  return (
    <Grid2 container={true} spacing={3} px={5} py={3}>
      {data.pages.map((group) => (
        <React.Fragment key={uuidv4()}>
          {group.result.map((accommodation) => (
            <Grid2 key={accommodation.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
              <AccommodationCard
                status={status}
                id={accommodation.id}
                image={CardImage}
                name={accommodation.name}
                address={accommodation.address}
                pricePerNight={accommodation.price}
                rating={4.8}
              />
            </Grid2>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage ? <SkeletonList limit={limit} /> : null}
      {hasNextPage ? <div ref={bottomOfPageRef} /> : null}
    </Grid2>
  );
}
