import Button from '@mui/material/Button';
import { type Theme } from '@mui/material/styles';

const styles = {
  loginButton: {
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
    padding: 1,
  },
};

export function LoginButton() {
  return (
    <Button type="submit" variant="contained" size="large" fullWidth={true} sx={styles.loginButton}>
      Log in
    </Button>
  );
}
