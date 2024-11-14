import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import StarRate from '@mui/icons-material/StarRate';
import CardImage from '#/assets/images/The-Balmoral-Executive-View-Room-e1682260891619.jpg';
import { useState } from 'react';
import { truncateString } from '#/utils/truncate-string.util';
import { styles } from './styles';
import { pink } from '@mui/material/colors';

export function AccommodationCard() {
  const [addToWishlist, setAddToWishlist] = useState(true);
  return (
    <Card sx={styles.card}>
      <IconButton aria-label="add to favorites" sx={styles.iconButtonBorder} onClick={() => setAddToWishlist(!addToWishlist)}>
        {addToWishlist ? <FavoriteBorderIcon sx={{ color: 'white' }} /> : <FavoriteIcon sx={{ color: pink[500] }} />}
      </IconButton>
      <IconButton aria-label="add to favorites" sx={styles.iconButton} onClick={() => setAddToWishlist(!addToWishlist)}>
        {!addToWishlist || <FavoriteIcon sx={{ color: 'GrayText' }} />}
      </IconButton>
      <CardMedia component="img" image={CardImage} alt="Apartment" sx={styles.cardMedia} />
      <CardContent sx={styles.cardContent}>
        <Typography variant="h5" component="div" fontSize="large" sx={styles.cardContentText}>
          Apartment name
        </Typography>
        <Typography sx={styles.cardAddress} fontSize="medium">
          {truncateString('Beautiful apartment in the city center address', 40)}
        </Typography>
        <Typography sx={styles.cardContentText} fontSize="medium">
          $50 per night
        </Typography>
      </CardContent>
      <CardActions sx={styles.cardActions}>
        <StarRate fontSize="small" sx={styles.ratingStar} />
        <Typography sx={styles.ratingNumber}>4.5</Typography>
      </CardActions>
    </Card>
  );
}
