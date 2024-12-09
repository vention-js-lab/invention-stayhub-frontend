import Box from '@mui/material/Box';
import { Checkout } from '../components/checkout';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export function CheckoutRoute() {
  return (
    <Box sx={styles.container}>
      <Checkout />
    </Box>
  );
}
