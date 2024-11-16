import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

const styles = {
  imageSkeleton: { width: '100%', aspectRatio: 1, borderRadius: 3 },
};

export function AccommodationCardSkeleton() {
  return (
    <Card>
      <Skeleton animation="wave" variant="rectangular" sx={styles.imageSkeleton} />
      <Skeleton height={32} width={200} sx={{ mt: 0 }} />
      <Skeleton height={24} sx={{ mt: -0.8 }} />
      <Skeleton height={24} width={140} sx={{ mt: -0.8 }} />
      <Skeleton height={24} width={100} sx={{ mt: -0.8 }} />
    </Card>
  );
}
