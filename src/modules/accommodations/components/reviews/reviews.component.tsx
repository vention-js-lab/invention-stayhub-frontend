import { useState } from 'react';
import Grid2 from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type Review } from '#/modules/accommodations/types/review.type';
import { ReviewCard } from './review-card';
import { NoDataAvailable } from '#/shared/components/no-data-response';
import { ReviewAllCard } from './review-all-card.component';
import { useTranslation } from 'react-i18next';

const styles = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
  },
};

type ReviewsListProps = {
  reviews: Review[] | null;
};

export function ReviewsList({ reviews }: ReviewsListProps) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!reviews) {
    return <NoDataAvailable data={'reviews'} />;
  }

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const visibleReviews = reviews.slice(0, 4);

  return (
    <div>
      <Grid2 container={true} spacing={3} sx={{ mb: '15px' }}>
        {visibleReviews.map((review) => (
          <Grid2 key={review.id} size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
            <ReviewCard review={review} />
          </Grid2>
        ))}
      </Grid2>

      {reviews.length > visibleReviews.length && (
        <Button variant="contained" onClick={handleOpen} sx={{ marginTop: 2 }}>
          {t('singleAccommodation.showReviews')}
        </Button>
      )}

      <Modal open={isModalOpen} onClose={handleClose}>
        <Box sx={styles.modalBox}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {t('singleAccommodation.allReviews')}
          </Typography>
          {reviews.map((review) => (
            <ReviewAllCard key={review.id} review={review} />
          ))}
          <Button variant="outlined" onClick={handleClose} sx={{ marginTop: 2 }}>
            {t('singleAccommodation.close')}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
