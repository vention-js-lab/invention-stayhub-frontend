import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { AccommodationList } from '../components/accommodation-list';
import { ReviewCard } from '../components/review-card';

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

  const reviewsData = {
    reviews: [
      {
        id: '0c6ff9f4-50d4-4c7c-96fd-2d4f5f328830',
        content: 'Very nice to stay here',
        rating: 4,
        createdAt: '2023-12-10',
        user: {
          firstName: 'Muhammadjon',
          lastName: 'Ubaydullaev',
          photo: null,
          profileCreatedAt: '2020-09-01',
          country: 'Uzbekistan',
        },
      },
    ],
  };

  return (
    <Box mt="var(--filter-area-height)">
      <Box sx={styles.filterArea(showShadow)} />
      <AccommodationList />
      <ReviewCard review={reviewsData.reviews[0]} />
    </Box>
  );
}
