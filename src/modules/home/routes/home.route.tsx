import { ApartmentCard } from '#/modules/home/components/card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Filters } from '../components/Filters';

export function HomeRoute() {
  return (
    <Box>
      <Filters />
      <Typography variant="h2">Home sweet home</Typography>
      <Typography>Welcome to the home route.</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 3,
        }}
      >
        <ApartmentCard />
        <ApartmentCard />
        <ApartmentCard />
        <ApartmentCard />
      </Box>
    </Box>
  );
}
