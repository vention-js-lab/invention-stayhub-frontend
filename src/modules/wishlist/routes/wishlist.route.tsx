import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Wishlist } from '../components/wishlist';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Box>
      <Typography sx={styles.header}>{t('wishlist')}</Typography>
      <Wishlist />
    </Box>
  );
}
