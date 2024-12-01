import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Wishlist } from '../components/wishlist';
import Typography from '@mui/material/Typography';

const styles = {
  shadowBox: (showShadow: boolean) => ({
    height: '2px',
    position: 'fixed',
    top: `var(--header-height)`,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    boxShadow: showShadow ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
    transition: 'box-shadow 0.3s ease',
  }),

  header: {
    marginTop: '16px',
    marginBottom: '16px',
    fontWeight: 'bold',
    fontSize: '28px',
    color: '#333',
  },
};

export function WishlistRoute() {
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box>
      <Box sx={styles.shadowBox(showShadow)} />
      <Typography sx={styles.header}>Wishlists</Typography>
      <Wishlist />
    </Box>
  );
}
