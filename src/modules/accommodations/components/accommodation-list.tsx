import Grid2 from '@mui/material/Grid2';
import CardImage from '#/assets/images/card-temp-image.jpg';
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useListAccommodationsQuery } from '../api/list-accommodations.api';
import { SkeletonList } from './skeleton-list';
import { useInView } from 'react-intersection-observer';
import { useListAccommodationQueryParams } from '#/modules/accommodations/hooks/list-accommodations-query-params.hook';
import { useInfiniteScroll } from '#/shared/hooks/infinite-scroll.hook';
import { usePaginationLimit } from '#/modules/accommodations/hooks/pagination-limit.hook';
import { CardSkeleton } from './accommodation-card/card-skeleton';
import { AccommodationCard } from './accommodation-card/accommodation-card';
import { NoResult } from '#/shared/components/no-result';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AccommodationMap } from './accommodation-map';

export function AccommodationList() {
  const { ref: bottomOfPageRef, inView: isBottomOfPageInView } = useInView();
  const { validatedQueryParams } = useListAccommodationQueryParams();
  const cardRef = useRef<HTMLDivElement>(null);

  const { limit } = usePaginationLimit({ cardRef });
  const { fetchNextPage, hasNextPage, isFetchingNextPage, status, data } = useListAccommodationsQuery(
    limit,
    validatedQueryParams
  );

  const [showMap, setShowMap] = useState(false);

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

  const accommodationsWithCoords = data.pages.flatMap((group) =>
    group.result.map((acc) => ({
      id: Number(acc.id),
      title: acc.name,
      latitude: acc.address?.latitude ? Number(acc.address.latitude) : 41.3111,
      longitude: acc.address?.longitude ? Number(acc.address.longitude) : 69.2797,
    }))
  );

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowMap(true)}
        sx={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          borderRadius: '20px',
          padding: '10px 20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        Show Map
      </Button>

      <Dialog open={showMap} onClose={() => setShowMap(false)} fullWidth={true} maxWidth="lg">
        <IconButton
          onClick={() => setShowMap(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <AccommodationMap accommodations={accommodationsWithCoords} />
      </Dialog>

      <Grid2 container={true} spacing={3}>
        {data.pages.map((group) => (
          <React.Fragment key={uuidv4()}>
            {group.result.length > 0 ? (
              group.result.map((accommodation) => (
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
              ))
            ) : (
              <NoResult text={'Oops! No accommodation has found :('} />
            )}
          </React.Fragment>
        ))}
        {isFetchingNextPage ? <SkeletonList limit={limit} /> : null}
        {hasNextPage ? <div ref={bottomOfPageRef} /> : null}
      </Grid2>
    </div>
  );
}
