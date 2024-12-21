import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';
import { useTranslation } from 'react-i18next';

const styles = {
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E91E63',
    color: '#fff',
    borderRadius: '35px',
    padding: '18px 20px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.4)',
    '&:hover': {
      backgroundColor: '#CA1A55',
    },
    '@media (max-width: 1024px)': {
      padding: '18px 12px',
    },
  },

  tuneIcon: {
    marginRight: '4px',
  },

  filterText: {
    fontWeight: '500',
    fontSize: '16px',
    '@media (max-width: 700px)': {
      display: 'none',
    },
  },
};

interface FilterButtonProps {
  onClick: () => void;
}

export function FilterButton({ onClick }: FilterButtonProps) {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick} sx={styles.filterButton}>
      <TuneIcon sx={styles.tuneIcon} />
      <Typography sx={styles.filterText}>{t('filterArea.filterButton')}</Typography>
    </Button>
  );
}
