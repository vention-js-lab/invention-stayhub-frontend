import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';

const styles = {
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E91E63',
    color: '#fff',
    borderRadius: '35px',
    padding: '18px 20px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: '#CA1A55',
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
  return (
    <Button onClick={onClick} sx={styles.filterButton}>
      <TuneIcon sx={styles.tuneIcon} />
      <Typography sx={styles.filterText}>Filter</Typography>
    </Button>
  );
}
