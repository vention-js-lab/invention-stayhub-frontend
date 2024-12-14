import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { amenitiesMap } from '#/shared/constants/amenities-map.constant';
import { type AccommodationAmenity } from '#/shared/constants/accommodation-amenity.type';
import { type Theme } from '@mui/material/styles';
import { AmenitiesModal } from '#/modules/accommodations/components/amenities-modal';
import { getAmenities } from '../utils/get-amenities.util';

const styles = {
  container: { paddingTop: '30px' },
  offers: { paddingLeft: '16px', fontSize: '20px', fontWeight: 'bold' },
  list: { display: 'flex', flexWrap: 'wrap' },
  amenitiesButton: {
    marginTop: 2,
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
    '&:hover': { backgroundColor: 'GrayText' },
    marginLeft: '16px',
  },
  backgroundPaper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxHeight: '60%',
    overflowY: 'auto',
    padding: 4,
  },
};

export function AccommodationAmenities({ amenities }: { amenities: AccommodationAmenity | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!amenities) {
    return null;
  }
  const amenityList = getAmenities(amenities, amenitiesMap);

  const limitedAmenities = amenityList.slice(0, 6);
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.offers}>What this place offers</Typography>
      <List sx={styles.list}>
        {limitedAmenities.map((offer) => {
          const Icon = offer.icon;
          return (
            <ListItem key={offer.label} sx={{ maxWidth: '50%' }}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={offer.label} />
            </ListItem>
          );
        })}
      </List>
      {amenityList.length > 8 && (
        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)} sx={styles.amenitiesButton}>
          Show All Amenities
        </Button>
      )}
      <AmenitiesModal amenity={amenityList} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Box>
  );
}
