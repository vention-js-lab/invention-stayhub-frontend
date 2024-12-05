import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CreateAccommodationButton } from '../components/create-accommodation-button';

const styles = {
  heading: {
    marginTop: '16px',
    marginBottom: '16px',
    fontWeight: 'bold',
    fontSize: '28px',
    color: '#333',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export function UserAccommodationsRoute() {
  return (
    <Box sx={styles.header}>
      <Typography sx={styles.heading}>My Accommodations</Typography>
      <CreateAccommodationButton />
    </Box>
  );
}
