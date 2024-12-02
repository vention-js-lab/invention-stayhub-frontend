import { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import { type Review } from '#/modules/accommodations/types/review.type';
import { formatDate } from '#/modules/accommodations/utils/get-formatted-date.util';

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
    width: 600,
    height: 270,
    margin: 'auto',
    boxShadow: 2,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  truncatedContent: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [shouldShowMoreButton, setShouldShowMoreButton] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpen = (newReview: Review) => {
    setSelectedReview(newReview);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReview(null);
  };

  const avatarContent = review.user.photo || review.user.firstName?.[0] || '';
  const userName = `${review.user.firstName} ${review.user.lastName}`.trim();
  const userCountry = review.user.country;
  const joinDate = formatDate(review.user.createdAt);
  const userInfo = joinDate ? `${userCountry} • since ${joinDate}` : `${userCountry}`;
  const commentedDate = formatDate(review.createdAt);

  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      setShouldShowMoreButton(element.scrollHeight > element.clientHeight);
    }
  }, [review.content]);

  return (
    <div>
      <Card key={review.id} sx={styles.cardStyle}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ marginRight: 2 }}>{avatarContent}</Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {userName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {userInfo}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Commented in {commentedDate}
          </Typography>
          <Rating value={review.rating} readOnly={true} sx={{ marginY: 1 }} />
          <Typography ref={contentRef} variant="body2" color="textPrimary" paragraph={true} sx={styles.truncatedContent}>
            {review.content}
          </Typography>

          {shouldShowMoreButton ? (
            <Button variant="text" color="primary" onClick={() => handleOpen(review)}>
              Show more
            </Button>
          ) : null}
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalBox} aria-labelledby="modal-title" aria-describedby="modal-description">
          {selectedReview ? (
            <>
              <Typography id="modal-title" variant="h6" fontWeight="bold" mb={2}>
                {userName}
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={1}>
                {userInfo}
              </Typography>
              <Rating value={selectedReview.rating} readOnly={true} />
              <Typography id="modal-description" variant="body2" color="textPrimary" paragraph={true}>
                {selectedReview.content}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
