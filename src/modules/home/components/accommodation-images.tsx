import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { type AccommodationImage } from '#/modules/home/types/accommodation-image.type';

export function AccommodationImages({ images }: { images: AccommodationImage[] }) {
  return (
    <Grid container={true} spacing={2} sx={{ marginBottom: '25px' }}>
      <Grid size={6}>
        {images[0].url ? (
          <Box
            component="img"
            src={images[0].url}
            alt="Left Image"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        ) : null}
      </Grid>

      <Grid size={6} container={true} spacing={2}>
        {images.slice(1, 5).map((image) => (
          <Grid size={6} key={image.id}>
            <Box
              component="img"
              src={image.url}
              alt={`Right Image ${image.id + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
