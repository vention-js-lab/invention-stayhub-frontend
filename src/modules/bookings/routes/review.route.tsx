import Box from '@mui/material/Box';
import { LeaveReview } from '../components/leave-review';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export function ReviewRoute() {
  return (
    <Box sx={styles.container}>
      <LeaveReview />
    </Box>
  );
}
