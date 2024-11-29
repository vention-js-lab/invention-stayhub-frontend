import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, Button, Box, Rating, Modal } from '@mui/material';
import { Review } from '../types/review.type';

const styles = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '80vh',
    overflowY: 'auto',
  },

  cardStyle: {
    maxWidth: 400,
    margin: 'auto',
    boxShadow: 3,
    borderRadius: 2,
    mb: 2,
  },
};

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleOpen = (newReview: Review) => {
    setSelectedReview(newReview);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReview(null);
  };
  const truncatedContent =
    review.content && review.content.length > 150 ? `${review.content.slice(0, 150)}...` : review.content || '';

  const shouldShowMoreButton = review.content && review.content.length > 150;

  return (
    <div>
      <Card key={review.id} sx={styles.cardStyle}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ marginRight: 2 }}>{review.user.photo || review.user.firstName?.[0] || ''}</Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {review.user.firstName || ''} {review.user.lastName || ''}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {review.user.country || ''}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="textSecondary">
            {review.createdAt}
          </Typography>
          <Rating value={review.rating} readOnly sx={{ marginY: 1 }} />
          <Typography variant="body2" color="textPrimary" paragraph>
            {truncatedContent}
          </Typography>
          {shouldShowMoreButton && (
            <Button variant="text" color="primary" onClick={() => handleOpen(review)}>
              Show more
            </Button>
          )}
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalBox} aria-labelledby="modal-title" aria-describedby="modal-description">
          {selectedReview && (
            <>
              <Typography id="modal-title" variant="h6" fontWeight="bold" mb={2}>
                {selectedReview.user.firstName || ''} {selectedReview.user.lastName || ''}
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={1}>
                {selectedReview.user.country || 'Unknown'} - from {selectedReview.user.createdAt || 'Unknown'} in Airbnb
              </Typography>
              <Rating value={selectedReview.rating} readOnly />
              <Typography id="modal-description" variant="body2" color="textPrimary" paragraph={true}>
                {selectedReview.content || ''}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};
