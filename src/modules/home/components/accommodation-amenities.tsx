import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Icons } from '../constants/icons.constant';
import { type AccommodationAmenity, type AmenityKey } from '#/modules/home/types/accommodation-amenity.type';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { pink } from '@mui/material/colors';

const styles = {
  container: { paddingTop: '30px' },
  offers: { paddingLeft: '16px', fontSize: '20px', fontWeight: 'bold' },
  list: { display: 'flex', flexWrap: 'wrap' },
  amenitiesButton: { marginTop: 2, backgroundColor: pink[500], '&:hover': { backgroundColor: 'GrayText' }, marginLeft: '16px' },
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

const amenitiesMap: Record<AmenityKey, { icon: React.ElementType; label: string }> = {
  hasWifi: { icon: Icons.Wifi, label: 'WiFi' },
  hasParking: { icon: Icons.Parking, label: 'Parking' },
  hasSwimmingPool: { icon: Icons.SwimmingPool, label: 'Swimming Pool' },
  hasPetAllowance: { icon: Icons.Pets, label: 'Pet Friendly' },
  hasBackyard: { icon: Icons.Backyard, label: 'Backyard' },
  hasSmokingAllowance: { icon: Icons.Smoking, label: 'Smoking Allowed' },
  hasHospitalNearby: { icon: Icons.Hospital, label: 'Hospital Nearby' },
  hasLaundryService: { icon: Icons.Laundry, label: 'Laundry Service' },
  hasKitchen: { icon: Icons.Kitchen, label: 'Kitchen' },
  hasAirConditioning: { icon: Icons.AirConditioning, label: 'Air Conditioning' },
  hasTv: { icon: Icons.TV, label: 'TV' },
  hasAirportTransfer: { icon: Icons.Airport, label: 'Airport Transfer' },
  isCloseToCenter: { icon: Icons.City, label: 'Close to Center' },
  isChildFriendly: { icon: Icons.ChildFriendly, label: 'Child Friendly' },
  isQuietArea: { icon: Icons.QuietArea, label: 'Quiet Area' },
};

export function AccommodationAmenities({ amenities }: { amenities: AccommodationAmenity | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!amenities) {
    return null;
  }
  const amenity = (Object.keys(amenities) as AmenityKey[])
    .filter((key) => key in amenitiesMap && amenities[key])
    .map((key) => ({
      icon: amenitiesMap[key].icon,
      label: amenitiesMap[key].label,
    }));
  const limitedAmenities = amenity.slice(0, 6);
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
      {amenity.length > 8 && (
        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)} sx={styles.amenitiesButton}>
          Show All Amenities
        </Button>
      )}
      {/* Modal to display all amenities */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Paper sx={styles.backgroundPaper}>
          <Typography variant="h6" gutterBottom={true}>
            All Amenities
          </Typography>
          <List>
            {amenity.map((value) => {
              const Icon = value.icon;
              return (
                <ListItem key={value.label}>
                  <ListItemIcon>
                    <Icon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={value.label} />
                </ListItem>
              );
            })}
          </List>
          <Box textAlign="center" marginTop={2}>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}
