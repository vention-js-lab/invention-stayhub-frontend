import Grid2 from '@mui/material/Grid2';
import { CardSkeleton } from './card-skeleton';

interface SkeletonListProps {
  limit: number;
}

export function SkeletonList({ limit }: SkeletonListProps) {
  return [...Array(limit)].map(() => (
    <Grid2 key={crypto.randomUUID()} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
      <CardSkeleton />
    </Grid2>
  ));
}
