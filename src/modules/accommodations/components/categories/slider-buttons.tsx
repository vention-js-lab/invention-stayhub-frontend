import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const styles = {
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: '-25px',
    display: 'block',
    transform: 'translateY(-50%)',
    minWidth: '30px',
    height: '30px',
    borderRadius: '50%',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: '-25px',
    display: 'block',
    transform: 'translateY(-50%)',
    minWidth: '30px',
    height: '30px',
    borderRadius: '50%',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  },
};

export function CustomPrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick} sx={styles.prevButton}>
      <ArrowBackIosNewIcon fontSize="small" />
    </Button>
  );
}

export function CustomNextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick} sx={styles.nextButton}>
      <ArrowForwardIosIcon fontSize="small" />
    </Button>
  );
}
