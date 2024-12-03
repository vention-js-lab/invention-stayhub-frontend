import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Wishlist } from '../components/wishlist';

const styles = {
  header: {
    marginTop: '16px',
    marginBottom: '16px',
    fontWeight: 'bold',
    fontSize: '28px',
    color: '#333',
  },
};

export function WishlistRoute() {
  return (
    <Box>
      <Typography sx={styles.header}>Wishlists</Typography>
      <Wishlist />
    </Box>
  );
}
