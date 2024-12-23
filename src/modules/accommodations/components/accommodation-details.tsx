import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { type Accommodation } from '#/modules/accommodations/types/accommodation.type';
import { useTranslation } from 'react-i18next';
import React from 'react';

const styles = {
  container: { padding: { xs: '0 8px 20px 8px', md: '0 0 30px 16px' } },
  title: { fontSize: { xs: '18px', md: '25px' }, marginBottom: '15px', fontWeight: '500' },
  homeInfo: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' },
  homeProperties: { padding: '0' },
};

export function AccommodationDetails({ data }: { data: Accommodation }) {
  const { t } = useTranslation();

  return (
    <Box sx={styles.container}>
      <Typography variant="h3" gutterBottom={true} sx={styles.title}>
        {data.name}
      </Typography>
      <Box sx={styles.homeInfo}>
        <Typography sx={styles.homeProperties}>
          {data.allowedNumberOfPeople} {t('singleAccommodation.guests')}{' '}
        </Typography>
        <Divider orientation="vertical" flexItem={true} />
        <Typography sx={styles.homeProperties}>
          {data.numberOfRooms} {t('singleAccommodation.rooms')}
        </Typography>
        <Divider orientation="vertical" flexItem={true} />
        <Typography sx={styles.homeProperties}>
          {data.squareMeters} {t('singleAccommodation.squareMeters')}
        </Typography>
        {data.categories.length > 0 &&
          data.categories.map((category) => (
            <React.Fragment key={category.id}>
              <Divider orientation="vertical" flexItem={true} />
              <Typography sx={{ whiteSpace: 'nowrap', px: '8px' }} component="span">
                {t(`categories.${category.name.toLowerCase().replace(/\s+/g, '')}`)}
              </Typography>
            </React.Fragment>
          ))}
      </Box>
      <Typography sx={styles.homeProperties}>{data.description}</Typography>
    </Box>
  );
}
