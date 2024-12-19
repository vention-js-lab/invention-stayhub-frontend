import { Link } from 'react-router-dom';
import { type Theme } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const styles = {
  button: {
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
    height: '42px',
    py: 2,
    px: 2,
    mt: 2,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
};

export function CreateAccommodationButton() {
  const { t } = useTranslation();

  return (
    <Button type="button" sx={styles.button}>
      <Link style={styles.link} to="/accommodations/create">
        {t('myAccommodations.create')}
      </Link>
    </Button>
  );
}
