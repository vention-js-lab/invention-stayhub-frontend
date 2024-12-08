import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { type Theme } from '@mui/material/styles';

const styles = {
  button: {
    mt: 2,
  },
  spinner: {
    marginRight: 1,
    color: (theme: Theme) => theme.palette.action.disabled,
  },
};

export function PaymentProcessingButton() {
  return (
    <Button type="button" variant="contained" size="large" fullWidth={true} disabled={true} sx={styles.button}>
      <CircularProgress size={16} sx={styles.spinner} />
      Processing...
    </Button>
  );
}
