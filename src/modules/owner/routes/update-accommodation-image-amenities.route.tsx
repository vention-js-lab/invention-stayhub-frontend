import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AccommodationAmenitiesForm } from '../components/accommodation-amenities-form';
import { AccommodationImagesForm } from '../components/accommodation-images-form';

export function UpdateAccommodationImageAmenitiesRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    const createdAccommodationId = localStorage.getItem('createdAccommodationId');
    if (!createdAccommodationId) navigate('/accommodations/create');
  }, [navigate]);

  return (
    <Box>
      <AccommodationImagesForm />
      <AccommodationAmenitiesForm />
    </Box>
  );
}
