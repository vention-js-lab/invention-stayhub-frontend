import Grid2 from '@mui/material/Grid2';
import { CardSkeleton } from './card-skeleton';
import { v4 as uuidv4 } from 'uuid';

interface SkeletonListProps {
  limit: number;
}

export function SkeletonList({ limit }: SkeletonListProps) {
  const numberOfSkeletons = limit < 0 ? 0 : limit;

  return [...Array(numberOfSkeletons)].map(() => (
    <Grid2 key={uuidv4()} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
      <CardSkeleton />
    </Grid2>
  ));
}
