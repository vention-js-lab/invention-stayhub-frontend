import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AccommodationAmenitiesImagesForm } from '../components/accommodation-amenities-images-form';

export function UpdateAccommodationImageAmenitiesRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    const createdAccommodationId = localStorage.getItem('createdAccommodationId');
    if (!createdAccommodationId) navigate('/accommodations/create');
  }, [navigate]);

  return (
    <Box>
      <AccommodationAmenitiesImagesForm />
    </Box>
  );
}
