import Grid2 from '@mui/material/Grid2';
import DefaultImage from '#/assets/images/default-home-image.png';
import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useInView } from 'react-intersection-observer';
import { useListAccommodationQueryParams } from '#/modules/accommodations/hooks/list-accommodations-query-params.hook';
import { useInfiniteScroll } from '#/shared/hooks/infinite-scroll.hook';
import { usePaginationLimit } from '#/modules/accommodations/hooks/pagination-limit.hook';
import { NoResult } from '#/shared/components/no-result';
import { useListAccommodationsQuery } from '#/modules/accommodations/api/list-accommodations.api';
import { CardSkeleton } from '#/modules/accommodations/components/accommodation-card/card-skeleton';
import { AccommodationCard } from '#/modules/accommodations/components/accommodation-card/accommodation-card';
import { SkeletonList } from '#/modules/accommodations/components/skeleton-list';
import { calculateOverallRating } from '#/modules/accommodations/components/reviews/rating.component';

export function OwnerAccommodations() {
  const { ref: bottomOfPageRef, inView: isBottomOfPageInView } = useInView();
  const { validatedQueryParams } = useListAccommodationQueryParams();
  const cardRef = useRef<HTMLDivElement>(null);

  const { limit } = usePaginationLimit({ cardRef });
  const { fetchNextPage, hasNextPage, isFetchingNextPage, status, data } = useListAccommodationsQuery(
    limit,
    validatedQueryParams,
    true
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
      <Grid2 container={true} spacing={3}>
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
    <Grid2 container={true} spacing={3}>
      {data.pages.map((group) => (
        <React.Fragment key={uuidv4()}>
          {group.result.length > 0 ? (
            group.result.map((accommodation) => (
              <Grid2 key={accommodation.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                <AccommodationCard
                  status={status}
                  id={accommodation.id}
                  image={accommodation.coverImage ? accommodation.coverImage : DefaultImage}
                  name={accommodation.name}
                  address={accommodation.address}
                  pricePerNight={accommodation.price}
                  rating={calculateOverallRating(accommodation.reviews)}
                />
              </Grid2>
            ))
          ) : (
            <NoResult text={'Oops! No accommodation has found :('} />
          )}
        </React.Fragment>
      ))}
      {isFetchingNextPage ? <SkeletonList limit={limit} /> : null}
      {hasNextPage ? <div ref={bottomOfPageRef} /> : null}
    </Grid2>
  );
}
