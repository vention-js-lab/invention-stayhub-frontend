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
import { useTranslation } from 'react-i18next';

const styles = {
  homeImage: (theme: Theme) => ({
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: 2,
    [theme.breakpoints.down('md')]: {
      height: '200px',
    },
    [theme.breakpoints.down('sm')]: {
      height: '150px',
    },
  }),
  tabletImage: (theme: Theme) => ({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: 2,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }),
  laptopImage: {
    width: '100%',
    height: '190px',
    objectFit: 'cover',
    borderRadius: 2,
  },

  viewMoreBox: (theme: Theme) => ({
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      textAlign: 'center',
      // marginTop: '10px',
    },
  }),
  viewMoreButton: (theme: Theme) => ({
    padding: '6px 26px',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': { backgroundColor: theme.palette.primary.main },
  }),
  closeButton: {
    color: 'white',
    position: 'absolute',
    top: '10%',
    right: '13%',
  },
};

export function AccommodationImages({ images }: { images: AccommodationImage[] | null }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!images || images.length === 0) {
    return <NoDataAvailable data={'images'} />;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Grid container={true} spacing={2} sx={{ marginBottom: '40px' }}>
        <Grid size={{ xs: 12 }} sx={(theme) => ({ [theme.breakpoints.up('sm')]: { display: 'none' } })}>
          <Box component="img" src={images[0].url} alt="Mobile Image" sx={(theme) => styles.homeImage(theme)} />
        </Grid>
        <Grid
          container={true}
          spacing={2}
          sx={(theme) => ({
            [theme.breakpoints.down('sm')]: { display: 'flex' },
            [theme.breakpoints.up('md')]: { display: 'none' },
          })}
        >
          {images.slice(0, 4).map((image) => (
            <Grid size={{ xs: 6 }} key={image.id}>
              <Box component="img" src={image.url} alt={`Tablet Image ${image.id}`} sx={(theme) => styles.tabletImage(theme)} />
            </Grid>
          ))}
        </Grid>
        <Grid
          container={true}
          spacing={2}
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: { display: 'none' },
          })}
        >
          <Grid size={{ xs: 6 }}>
            <Box component="img" src={images[0].url} alt="Main Image" sx={styles.homeImage} />
          </Grid>
          <Grid size={{ xs: 6 }} container={true} spacing={2}>
            {images.slice(1, 5).map((image) => (
              <Grid size={{ xs: 6 }} key={image.id}>
                <Box component="img" src={image.url} alt={`Laptop Image ${image.id}`} sx={styles.laptopImage} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={(theme) => styles.viewMoreBox(theme)}>
        <Button variant="contained" onClick={handleOpen} sx={(theme) => styles.viewMoreButton(theme)}>
          {t('singleAccommodation.buttons.view')}
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
