import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { type AccommodationImage } from '#/modules/accommodations/types/accommodation-image.type';
import { ImageCarousel } from './image-carousel/image-carousel';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { NoDataAvailable } from '#/shared/components/no-data-response';
import CloseIcon from '@mui/icons-material/Close';
import { type Theme } from '@mui/material/styles';

const styles = {
  homeImages: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 2,
  },
  viewMoreBox: { position: 'absolute', bottom: '10px', right: '10px' },
  viewMoreButton: {
    padding: '6px 26px',
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
    '&:hover': { backgroundColor: (theme: Theme) => theme.palette.primary.main },
  },
  closeButton: { color: 'white', position: 'absolute', top: '10%', right: '13%' },
};

export function AccommodationImages({ images }: { images: AccommodationImage[] | null }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!images || images.length === 0) {
    return <NoDataAvailable data={'images'} />;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Grid container={true} spacing={2} sx={{ marginBottom: '40px' }}>
        <Grid size={6}>
          {images[0].url ? <Box component="img" src={images[0].url} alt="Left Image" sx={styles.homeImages} /> : null}
        </Grid>

        <Grid size={6} container={true} spacing={2}>
          {images.slice(1, 5).map((image) => (
            <Grid size={6} key={image.id}>
              <Box component="img" src={image.url} alt={`Right Image ${image.id + 1}`} sx={styles.homeImages} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Box textAlign="center" mt={2} sx={styles.viewMoreBox}>
        <Button variant="contained" onClick={handleOpen} sx={styles.viewMoreButton}>
          View More
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose} slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.8)' } } }}>
        <Box>
          <ImageCarousel images={images} />
          <Button onClick={handleClose} sx={styles.closeButton}>
            <CloseIcon />
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
