import Box from '@mui/material/Box';
import { AddressForm } from '../components/accommodation-address-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function UpdateAccommodationAddressRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    const createdAccommodationId = localStorage.getItem('createdAccommodationId');
    if (!createdAccommodationId) navigate('/accommodations/create');
  }, [navigate]);

  return (
    <Box>
      <AddressForm />
    </Box>
  );
}
