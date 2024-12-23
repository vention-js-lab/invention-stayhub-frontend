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
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';

const styles = {
  container: { paddingTop: { xs: '20px', md: '30px' } },
  offers: { paddingLeft: '16px', fontSize: { xs: '16px', md: '20px' }, fontWeight: 'bold' },
  list: { display: 'flex', flexWrap: 'wrap' },
  listItem: (theme: Theme) => ({
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '200px',
    },
  }),
  amenitiesButton: (theme: Theme) => ({
    marginTop: 2,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': { backgroundColor: 'GrayText' },
    marginLeft: '16px',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      marginBottom: 2,
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
      marginBottom: 2,
    },
  }),
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
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  if (!amenities) {
    return null;
  }
  const amenityList = getAmenities(amenities, amenitiesMap);

  const visibleAmenities = isModalOpen ? amenityList : amenityList.slice(0, isMobile ? 3 : 6);
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.offers}>{t('singleAccommodation.offers')}</Typography>
      <List sx={styles.list}>
        {visibleAmenities.map((offer) => {
          const Icon = offer.icon;
          return (
            <ListItem key={offer.label} sx={(theme) => styles.listItem(theme)}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={offer.label} />
            </ListItem>
          );
        })}
      </List>
      {!isModalOpen && amenityList.length > (isMobile ? 3 : 6) && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
          sx={(theme) => styles.amenitiesButton(theme)}
        >
          {t('singleAccommodation.buttons.showAmenities')}
        </Button>
      )}
      <AmenitiesModal amenity={amenityList} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Box>
  );
}
