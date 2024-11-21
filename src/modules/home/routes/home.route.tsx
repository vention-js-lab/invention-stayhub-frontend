import Box from '@mui/material/Box';
import { headerHeight } from '#/modules/layout/components/header/header';
import { useEffect, useState } from 'react';
import { AccommodationList } from '../components/accommodation-list';

const filterAreaHeight = 60;
const styles = {
  filterArea: (showShadow: boolean) => ({
    minHeight: filterAreaHeight,
    position: 'fixed',
    top: `${headerHeight}px`,
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
    <Box mt={`${filterAreaHeight}px`}>
      <Box sx={styles.filterArea(showShadow)} />
      <AccommodationList />
    </Box>
  );
}
