import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const styles = {
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: '-170px',
    transform: 'translateY(-50%)',
    color: '#fff',
    minWidth: '50px',
    height: '50px',
    borderRadius: '50%',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    zIndex: 10,
    '&:hover': { backgroundColor: 'GrayText' },
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: '-170px',
    transform: 'translateY(-50%)',
    color: '#fff',
    minWidth: '50px',
    height: '50px',
    borderRadius: '50%',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    zIndex: 10,
    '&:hover': { backgroundColor: 'GrayText' },
  },
};

export function CustomPrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick} sx={styles.prevButton}>
      <ArrowBackIosNewIcon fontSize="large" />
    </Button>
  );
}

export function CustomNextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick} sx={styles.nextButton}>
      <ArrowForwardIosIcon fontSize="large" />
    </Button>
  );
}
