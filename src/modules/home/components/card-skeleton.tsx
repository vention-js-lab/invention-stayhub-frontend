import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

const styles = {
  imageSkeleton: { width: '100%', paddingTop: '100%', borderRadius: 3 },
};

export function CardSkeleton() {
  return (
    <Card>
      <Skeleton animation="wave" variant="rectangular" sx={styles.imageSkeleton} />
      <Skeleton height={32} sx={{ mt: 0 }} />
      <Skeleton height={28} width="70%" sx={{ mt: -0.8 }} />
      <Skeleton height={28} width="40%" sx={{ mt: -0.6 }} />
      <Skeleton height={28} width="20%" sx={{ mt: -0.6 }} />
    </Card>
  );
}
