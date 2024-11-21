import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import StarRate from '@mui/icons-material/StarRate';
import { useState } from 'react';
import { pink } from '@mui/material/colors';
import Button from '@mui/material/Button';

interface AccommodationCardProps {
  id: string;
  image: string;
  name: string;
  address: string;
  pricePerNight: number;
  rating: number;
}

const styles = {
  card: {
    position: 'relative',
    cursor: 'pointer',
  },
  iconButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    color: 'pink[500]',
  },
  iconButtonBorder: {
    position: 'absolute',
    zIndex: '2',
    top: '5px',
    right: '5px',
    color: 'pink[500]',
  },
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

export function AccommodationCard({ id, pricePerNight, address, name, rating, image }: AccommodationCardProps) {
  const [addToWishlist, setAddToWishlist] = useState(true);

  const handleHeartClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setAddToWishlist(!addToWishlist);
  };

  return (
    <Button href={`/accommodations/${id}`}>
      <Card sx={styles.card}>
        <IconButton aria-label="add to favorites" sx={styles.iconButtonBorder} onClick={handleHeartClick}>
          {addToWishlist ? <FavoriteBorderIcon sx={{ color: 'white' }} /> : <FavoriteIcon sx={{ color: pink[500] }} />}
        </IconButton>
        <IconButton aria-label="add to favorites" sx={styles.iconButton} onClick={handleHeartClick}>
          {!addToWishlist || <FavoriteIcon sx={{ color: 'GrayText' }} />}
        </IconButton>
        <CardMedia component="img" image={image} alt="Apartment" sx={styles.cardMedia} />
        <CardContent sx={styles.cardContent}>
          <Typography variant="h5" component="div" fontSize="large" sx={styles.cardContentText}>
            {name}
          </Typography>
          <Typography sx={styles.cardAddress} fontSize="medium">
            {address}
          </Typography>
          <Typography sx={styles.cardContentText} fontSize="medium">
            ${pricePerNight} per night
          </Typography>
        </CardContent>
        <CardActions sx={styles.cardActions}>
          <StarRate fontSize="small" sx={styles.ratingStar} />
          <Typography sx={styles.ratingNumber}>{rating}</Typography>
        </CardActions>
      </Card>
    </Button>
  );
}
