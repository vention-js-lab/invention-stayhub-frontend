import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styles } from '../styles/styles';

export function RegisterLink() {
  return (
    <Box display="flex" justifyContent="center">
      <Typography>New to StayHub?</Typography>
      <Link href="/register" sx={styles.registerLink}>
        Create your account
      </Link>
    </Box>
  );
}
