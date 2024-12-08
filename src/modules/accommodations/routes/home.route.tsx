import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { AccommodationList } from '../components/accommodation-list';
import { Search } from '../components/search';
import { AccommodationFilterModal } from '../components/filter/filter-modal';
import { FilterButton } from '../components/filter/filter-button';

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingX: '40px',
  }),
};

export function HomeRoute() {
  const [showShadow, setShowShadow] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box mt="var(--filter-area-height)">
      <Box sx={styles.filterArea(showShadow)}>
        <Search />
        <FilterButton onClick={() => setIsFilterModalOpen(true)} />
        <AccommodationFilterModal open={isFilterModalOpen} setOpen={setIsFilterModalOpen} />
      </Box>
      <AccommodationList />
    </Box>
  );
}
