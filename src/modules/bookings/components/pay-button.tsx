import Button from '@mui/material/Button';
import { type Theme } from '@mui/material/styles';

const styles = {
  button: {
    mt: 2,
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
  },
};

interface PayButtonProps {
  handleClick: () => void;
}

export function PayButton({ handleClick }: PayButtonProps) {
  return (
    <Button type="button" variant="contained" size="large" fullWidth={true} onClick={handleClick} sx={styles.button}>
      Pay
    </Button>
  );
}
