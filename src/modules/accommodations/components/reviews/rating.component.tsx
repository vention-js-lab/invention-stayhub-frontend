import { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { type Review } from '#/modules/accommodations/types/review.type';
import { useTranslation } from 'react-i18next';

type ReviewsListProps = {
  reviews: Review[] | null;
};

const styles = {
  box: { display: 'flex', alignItems: 'center', padding: 2 },
  rating: { fontWeight: 'bold', fontSize: '1.2rem' },
};
export const calculateOverallRating = (reviewsList: Review[] | null) => {
  if (!reviewsList || reviewsList.length === 0) return 0;
  const totalRating = reviewsList.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);
  return parseFloat((totalRating / reviewsList.length).toFixed(2));
};

export function AccommodationRating({ reviews }: ReviewsListProps) {
  const { t } = useTranslation();
  const overallRating = useMemo(() => calculateOverallRating(reviews), [reviews]);
  const reviewCount = reviews ? reviews.length : 0;

  const getStarColor = (rating: number) => {
    if (rating >= 4) return 'gold';
    if (rating >= 2.5) return 'orange';
    return 'gray';
  };

  return (
    <Box sx={styles.box}>
      <StarIcon sx={{ color: getStarColor(overallRating), marginRight: 1 }} />
      <Typography variant="h6" sx={styles.rating}>
        {overallRating} · {reviewCount} {t('singleAccommodation.reviews')}
      </Typography>
    </Box>
  );
}
