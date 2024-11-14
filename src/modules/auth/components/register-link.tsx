import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const styles = {
  link: {
    mx: -1,
  },
};

export function RegisterLink() {
  return (
    <Box display="flex" justifyContent="center">
      <Typography>New to StayHub?</Typography>
      <Link href="/auth/register" sx={styles.link}>
        Create your account
      </Link>
    </Box>
  );
}
