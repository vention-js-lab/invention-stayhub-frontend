import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type Review } from '#/modules/accommodations/types/review.type';
import { ReviewCard } from './review-card';
import { NoDataAvailable } from '#/shared/components/no-data-response';
import { ReviewAllCard } from './review-all-card.component';

const styles = {
  allReviews: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 },
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!reviews) {
    return <NoDataAvailable data={'reviews'} />;
  }

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const visibleReviews = reviews.slice(0, 4);

  return (
    <div>
      <Box sx={styles.allReviews}>
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </Box>

      {reviews.length > visibleReviews.length && (
        <Button variant="contained" onClick={handleOpen} sx={{ marginTop: 2 }}>
          Show all {reviews.length} reviews
        </Button>
      )}

      <Modal open={isModalOpen} onClose={handleClose}>
        <Box sx={styles.modalBox}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            All Reviews
          </Typography>
          {reviews.map((review) => (
            <ReviewAllCard key={review.id} review={review} />
          ))}
          <Button variant="outlined" onClick={handleClose} sx={{ marginTop: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
