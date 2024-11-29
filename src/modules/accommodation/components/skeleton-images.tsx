import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function AccommodationImagesSkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Skeleton variant="rectangular" sx={{ width: '50%', height: 300, borderRadius: 2 }} />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, width: '50%' }}>
        <Skeleton variant="rectangular" sx={{ height: 145, borderRadius: 2 }} />
        <Skeleton variant="rectangular" sx={{ height: 145, borderRadius: 2 }} />
        <Skeleton variant="rectangular" sx={{ height: 145, borderRadius: 2 }} />
        <Skeleton variant="rectangular" sx={{ height: 145, borderRadius: 2 }} />
      </Box>
    </Box>
  );
}
