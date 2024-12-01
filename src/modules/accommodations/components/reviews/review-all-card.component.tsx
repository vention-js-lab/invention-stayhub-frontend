import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { type Review } from '#/modules/accommodations/types/review.type';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { format } from 'date-fns';

const styles = {
  cardStyle: {
    width: 600,
    height: 'auto',
    margin: 'auto',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 2,
  },
  author: { display: 'flex', alignItems: 'center', marginBottom: '16px' },
};

interface ReviewCardProps {
  review: Review;
}
export function ReviewAllCard({ review }: ReviewCardProps) {
  const avatarContent = review.user.photo || review.user.firstName?.[0] || '';
  const userName = `${review.user.firstName || ''} ${review.user.lastName || ''}`;
  const userCountry = review.user.country || '';

  const createdAt = review.user.createdAt ? new Date(review.user.createdAt) : null;

  const formattedDate = createdAt
    ? format(
        createdAt,
        createdAt.getFullYear() === new Date().getFullYear() ? "'on StayHub since' MMMM d" : "'on StayHub since' MMMM d, yyyy"
      )
    : null;

  const userInfo = [userCountry, formattedDate].filter(Boolean).join(' • ');

  return (
    <Card key={review.id} sx={styles.cardStyle}>
      <CardContent>
        <div style={styles.author}>
          <Avatar sx={{ marginRight: 2 }}>{avatarContent}</Avatar>
          <div>
            <Typography variant="h6" fontWeight="bold">
              {userName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {userInfo}
            </Typography>
          </div>
        </div>
        <Typography variant="body2" color="textSecondary">
          {review.createdAt}
        </Typography>
        <Rating value={review.rating} readOnly={true} sx={{ marginY: 1 }} />
        <Typography variant="body2" color="textPrimary" paragraph={true}>
          {review.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
