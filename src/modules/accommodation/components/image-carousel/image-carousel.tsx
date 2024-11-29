import Box from '@mui/material/Box';
import Slider from 'react-slick';
import { type AccommodationImage } from '#/modules/home/types/accommodation-image.type';
import { NoDataAvailable } from '#/shared/components/no-data-response';
import { CustomNextArrow, CustomPrevArrow } from './carousel-buttons';

const styles = {
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

export function ImageCarousel({ images }: { images: AccommodationImage[] | null }) {
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
