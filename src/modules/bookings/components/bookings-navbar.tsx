import { BookingStatus } from '../constants/booking-status.constant';
import Typography from '@mui/material/Typography';

interface BookingsNavbarProps {
  selectedCategory: BookingStatus;
  onCategoryChange: (status: BookingStatus) => void;
}

const styles = {
  navItem: (isSelected: boolean) => ({
    textTransform: 'capitalize',
    width: '100%',
    textAlign: 'center',
    borderBottom: isSelected ? '3px solid #E91E63' : '1px solid #e9e9e9',
    fontSize: '16px',
    fontWeight: '500',
    padding: '10px 5px',
    '&:hover': {
      transition: 'border-bottom-color 0.2s linear',
      borderBottom: isSelected ? '' : '3px solid #e9e9e9',
    },
  }),
};

export function BookingsNavbar({ selectedCategory, onCategoryChange }: BookingsNavbarProps) {
  return (
    <nav style={{ display: 'flex', marginBottom: '18px' }}>
      {Object.values(BookingStatus).map((status) => (
        <Typography key={status} sx={styles.navItem(selectedCategory === status)} onClick={() => onCategoryChange(status)}>
          {status}
        </Typography>
      ))}
    </nav>
  );
}
