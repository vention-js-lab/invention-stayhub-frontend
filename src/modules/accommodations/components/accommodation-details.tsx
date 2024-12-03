import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { type Accommodation } from '#/modules/accommodations/types/accommodation.type';

const styles = {
  container: { padding: '0 0 30px 16px' },
  title: { fontSize: '25px', marginBottom: '15px' },
  homeInfo: { display: 'flex', marginBottom: '10px' },
  homeProperties: { padding: '0 8px 0 0' },
};

export function AccommodationDetails({ data }: { data: Accommodation }) {
  return (
    <Box sx={styles.container}>
      <Typography variant="h3" gutterBottom={true} sx={styles.title}>
        {data.name}
      </Typography>
      <Box sx={styles.homeInfo}>
        <Typography sx={styles.homeProperties}>{data.allowedNumberOfPeople} guests </Typography>
        <Divider orientation="vertical" flexItem={true} />
        <Typography>{data.numberOfRooms} rooms</Typography>
        <Divider orientation="vertical" flexItem={true} />
        <Typography>{data.squareMeters} square meters</Typography>
      </Box>
      <Typography sx={styles.homeProperties}>{data.description}</Typography>
    </Box>
  );
}
