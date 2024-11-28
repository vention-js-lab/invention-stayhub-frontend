import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarRate from '@mui/icons-material/StarRate';
import { useState } from 'react';
import { type AccommodationAddress } from '../types/accommodation-address.type';
import { parseAddress } from '../utils/parse-address.util';
import { CardSkeleton } from './card-skeleton';
import { useWishlistMutation } from '#/modules//wishlist/api/wishlist.api';
import { HeartButton } from './heart-button';
import { enqueueSnackbar } from 'notistack';
import { wishlistActionToastMessages } from '#/shared/constants/wishlist-toast-messages.constant';
import { useRequireAuth } from '#/shared/hooks/require-auth.hook';

interface AccommodationCardProps {
  status: 'pending' | 'error' | 'success';
  id?: string;
  image?: string;
  name?: string;
  address?: AccommodationAddress | null;
  pricePerNight?: number;
  rating?: number;
}

const styles = {
  card: {
    position: 'relative',
    cursor: 'pointer',
  },
  cardLoadingBox: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  cardMedia: { width: '100%', aspectRatio: 1, borderRadius: 3 },
  cardContent: { padding: '5px 0 0 0' },
  cardContentBox: { display: 'flex', justifyContent: 'space-between' },
  cardContentText: {
    padding: '0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardAddress: { padding: '0', color: 'gray', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  cardActions: { display: 'flex', padding: 0, alignItems: 'center' },
  ratingNumber: { padding: '0', m: '0' },
  ratingStar: { fontSize: '17px' },
};

export function AccommodationCard({ status, id, pricePerNight, address, name, rating, image }: AccommodationCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { wishlistMutation } = useWishlistMutation();
  const requireAuth = useRequireAuth();

  function handleHeartClick(event: React.MouseEvent) {
    event.preventDefault();
    setIsWishlisted(!isWishlisted);

    requireAuth(() => {
      if (id) {
        wishlistMutation.mutate(
          {
            data: {
              accommodationId: id,
            },
            action: isWishlisted ? 'remove' : 'add',
          },
          {
            onSuccess: (data) => {
              const message = data ? wishlistActionToastMessages.addSuccess : wishlistActionToastMessages.removeSuccess;
              enqueueSnackbar(message, {
                variant: data ? 'success' : 'info',
                hideIconVariant: true,
                autoHideDuration: 3000,
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
              });
            },
            onError: () => {
              const message = wishlistActionToastMessages.fail;
              enqueueSnackbar(message, {
                variant: 'error',
                hideIconVariant: true,
                autoHideDuration: 3000,
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
              });
            },
          }
        );
      }
    });
  }

  return (
    <Card sx={styles.card}>
      {status === 'pending' ? (
        <CardSkeleton />
      ) : (
        <a href={`/accommodations/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <HeartButton isWishlisted={isWishlisted} handleClick={handleHeartClick} />
          <CardMedia component="img" image={image} alt="Apartment" sx={styles.cardMedia} />
          <CardContent sx={styles.cardContent}>
            <Typography variant="h5" component="div" fontSize="large" sx={styles.cardContentText}>
              {name}
            </Typography>
            <Typography sx={styles.cardAddress} fontSize="medium">
              {parseAddress(address)}
            </Typography>
            <Typography sx={styles.cardContentText} fontSize="medium">
              ${pricePerNight} per night
            </Typography>
          </CardContent>
          <CardActions sx={styles.cardActions}>
            <StarRate fontSize="small" sx={styles.ratingStar} />
            <Typography sx={styles.ratingNumber}>{rating}</Typography>
          </CardActions>
        </a>
      )}
    </Card>
  );
}
