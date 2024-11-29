import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function AccommodationDetailsSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '70%' }} />
      <Skeleton variant="text" sx={{ width: '50%' }} />
      <Skeleton variant="rectangular" sx={{ height: 200, mt: 2, borderRadius: 2 }} />
    </Box>
  );
}
