import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarRate from '@mui/icons-material/StarRate';
import { useState } from 'react';
import { CardSkeleton } from './card-skeleton';
import { HeartButton } from './heart-button';
import { parseAddress } from '#/modules/accommodations/utils/parse-address.util';
import { useWishlistMutation } from '#/modules/accommodations/api/toggle-wishlist.api';
import { useAuthGuardAction } from '#/shared/hooks/auth-guard-action.hook';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { type AccommodationAddress } from '#/modules/accommodations/types/accommodation-address.type';
import { useTranslation } from 'react-i18next';

interface AccommodationCardProps {
  status: 'pending' | 'error' | 'success';
  id?: string;
  image?: string;
  name?: string;
  address?: AccommodationAddress | null;
  pricePerNight?: number;
  rating?: number;
  isSavedToWishlist?: boolean;
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

export function AccommodationCard({
  status,
  id,
  pricePerNight,
  address,
  name,
  rating,
  image,
  isSavedToWishlist,
}: AccommodationCardProps) {
  const { t } = useTranslation();
  const [isWishlisted, setIsWishlisted] = useState(isSavedToWishlist);
  const { wishlistMutation } = useWishlistMutation();
  const authGuardAction = useAuthGuardAction();

  function handleWishlistAction() {
    if (!id) {
      return;
    }

    setIsWishlisted((prev) => !prev);

    wishlistMutation.mutate(
      {
        data: {
          accommodationId: id,
        },
        action: isWishlisted ? 'remove' : 'add',
      },
      {
        onSuccess: (response) => {
          showSnackbar({
            message: response.status === 201 ? t('snackbars.successAddToWishlist') : t('snackbars.infoRemoveFromWishlist'),
            variant: response.status === 201 ? 'success' : 'info',
          });
        },
        onError: () => {
          setIsWishlisted((prev) => !prev);
          showSnackbar({
            message: t('snackbars.errorSomething'),
            variant: 'error',
          });
        },
      }
    );
  }

  function handleHeartClick(event: React.MouseEvent) {
    event.preventDefault();
    authGuardAction(handleWishlistAction);
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
