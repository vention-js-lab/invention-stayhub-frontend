import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { AccommodationList } from '../components/accommodation-list';

const styles = {
  filterArea: (showShadow: boolean) => ({
    minHeight: 'var(--filter-area-height)',
    position: 'fixed',
    top: `var(--header-height)`,
    left: 0,
    right: 0,
    zIndex: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
    boxShadow: showShadow ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
    transition: 'box-shadow 0.3s ease',
  }),
};

export function HomeRoute() {
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box mt="var(--filter-area-height)">
      <Box sx={styles.filterArea(showShadow)} />
      <AccommodationList />
    </Box>
  );
}
