import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { type Theme } from '@mui/material/styles';

const styles = {
  button: {
    padding: 1,
  },
  spinner: {
    color: (theme: Theme) => theme.palette.action.disabled,
    marginRight: 1,
  },
};

export function LoadingButton() {
  return (
    <Button variant="contained" size="large" fullWidth={true} disabled={true} sx={styles.button}>
      <CircularProgress size={16} sx={styles.spinner} />
      Logging in...
    </Button>
  );
}
