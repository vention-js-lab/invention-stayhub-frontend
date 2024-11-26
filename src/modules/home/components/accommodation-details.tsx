import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icons } from '../constants/icons.constant';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { type AmenityKey } from '#/modules/home/types/accommodation-amenity.type';
import Divider from '@mui/material/Divider';
import { type Accommodation } from '#/modules/home/types/accommodation.type';

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

export function AccommodationDetails({ data }: { data: Accommodation }) {
  const amenities = data.amenity;
  const amenity = (Object.keys(amenities) as AmenityKey[])
    .filter((key) => key in amenitiesMap && amenities[key])
    .map((key) => amenitiesMap[key]);

  return (
    <Box sx={{ maxWidth: '55%' }}>
      <Box sx={{ padding: '0 0 30px 16px' }}>
        <Typography variant="h3" gutterBottom={true} sx={{ fontSize: '25px', marginBottom: '15px' }}>
          {data.name}
        </Typography>
        <Box sx={{ display: 'flex', marginBottom: '10px' }}>
          <Typography sx={{ padding: '0 8px 0 0' }}>{data.allowedNumberOfPeople} guests </Typography>
          <Divider orientation="vertical" flexItem={true} />
          <Typography>{data.numberOfRooms} rooms</Typography>
          <Divider orientation="vertical" flexItem={true} />
          <Typography>{data.squareMeters} square meters</Typography>
        </Box>
        <Typography sx={{}}>{data.description}</Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ paddingTop: '30px' }}>
        <Typography sx={{ paddingLeft: '16px', fontSize: '20px', fontWeight: 'bold' }}>What this place offers</Typography>
        <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {amenity.map((offer) => {
            const Icon = offer.icon;
            return (
              <ListItem key={} sx={{ maxWidth: '50%' }}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={offer.label} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
