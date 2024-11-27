import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from 'react-slick';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { type AccommodationImage } from '../types/accommodation-image.type';
import { NoDataAvailable } from '#/shared/components/no-data-response';

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
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    maxWidth: '850px',
    p: 4,
    borderRadius: 2,
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: 2,
  },
};

function CustomPrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick} sx={styles.prevButton}>
      <ArrowBackIosNewIcon fontSize="large" />
    </Button>
  );
}

function CustomNextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick} sx={styles.nextButton}>
      <ArrowForwardIosIcon fontSize="large" />
    </Button>
  );
}

export function ImagesCarousel({ images }: { images: AccommodationImage[] | null }) {
  if (!images) {
    return <NoDataAvailable data={'images'} />;
  }
  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Box sx={styles.container}>
      <Slider {...carouselSettings}>
        {images.map((image) => (
          <Box key={image.id}>
            <Box component="img" src={image.url} alt={`Carousel Image ${image.id}`} sx={styles.image} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
