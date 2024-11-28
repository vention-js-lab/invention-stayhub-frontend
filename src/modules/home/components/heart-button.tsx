import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { type MouseEvent } from 'react';
import { type Theme } from '@mui/material/styles';

interface HeartOutlineProps {
  isWishlisted: boolean;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function HeartButton({ isWishlisted, handleClick }: HeartOutlineProps) {
  const styles = {
    iconButtonBorder: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      zIndex: '2',
    },
    iconButton: {
      position: 'absolute',
      top: '5px',
      right: '5px',
    },
    wishlistedHeart: {
      color: (theme: Theme) => theme.palette.secondary.main,
    },
  };

  return (
    <>
      <IconButton type="button" onClick={handleClick} sx={styles.iconButtonBorder}>
        {isWishlisted ? <FavoriteIcon sx={styles.wishlistedHeart} /> : <FavoriteBorderIcon sx={{ color: 'white' }} />}
      </IconButton>
      <IconButton type="button" sx={styles.iconButton}>
        {isWishlisted ? null : <FavoriteIcon sx={{ color: 'black', opacity: 0.5 }} />}
      </IconButton>
    </>
  );
}
