import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { type Review } from '../../types/review.type';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

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
              {userCountry} from {review.user.createdAt} Airbnb user
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
