import { AccommodationCard } from '#/modules/home/components/accommodation-card/accommodation-card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function HomeRoute() {
  return (
    <Box>
      <Typography variant="h2">Home sweet home</Typography>
      <Typography>Welcome to the home route.</Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <AccommodationCard />
        <AccommodationCard />
        <AccommodationCard />
        <AccommodationCard />
      </Box>
    </Box>
  );
}
