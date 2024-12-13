import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type AmenityKey } from '#/shared/constants/accommodation-amenity.type';
import { amenitiesMap } from '#/shared/constants/amenities-map.constant';
import { type AccommodationFilterParams } from '../types/accommodation-filter-params.type';

const styles = {
  amenityButtons: (isSelected: boolean) => ({
    border: '1px solid #C7C7C7',
    borderColor: isSelected ? '#E91E63' : '#C7C7C7',
    fontSize: '16px',
    borderRadius: '20px',
    backgroundColor: isSelected ? '#E91E63' : '#fff',
    margin: '0 2px 2px 0',
    color: isSelected ? '#fff' : '#C7C7C7',
    '&:hover': {
      borderColor: '#E91E63',
      backgroundColor: '#E91E63',
      color: '#fff',
    },
  }),
};

interface AmenitiesListProps {
  filterParams: AccommodationFilterParams;
  handleAmenitySelection: (amenityKey: AmenityKey) => void;
}

export function AmenitiesList({ filterParams, handleAmenitySelection }: AmenitiesListProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(amenitiesMap).map(([key, { icon: Icon, label }]) => (
        <IconButton
          sx={styles.amenityButtons(Boolean(filterParams[key as AmenityKey]))}
          key={key}
          onClick={() => handleAmenitySelection(key as AmenityKey)}
        >
          <Icon />
          <Typography>{label}</Typography>
        </IconButton>
      ))}
    </Box>
  );
}
