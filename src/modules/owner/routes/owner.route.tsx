import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CreateAccommodationButton } from '../components/create-accommodation-button';
import { useTranslation } from 'react-i18next';

const styles = {
  heading: {
    marginTop: '16px',
    marginBottom: '16px',
    fontWeight: 'bold',
    fontSize: '28px',
    color: '#333',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export function OwnerRoute() {
  const { t } = useTranslation();

  return (
    <Box sx={styles.header}>
      <Typography sx={styles.heading}>{t('myAccommodations.title')}</Typography>
      <CreateAccommodationButton />
    </Box>
  );
}
