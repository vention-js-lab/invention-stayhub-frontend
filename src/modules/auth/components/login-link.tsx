import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const styles = {
  container: {
    mt: 2,
  },
  link: {
    mx: -1,
  },
};

export function LoginLink() {
  return (
    <Box display="flex" justifyContent="center" sx={styles.container}>
      <Typography>Already have an account?</Typography>
      <Link href="/auth/login" sx={styles.link}>
        Log in
      </Link>
    </Box>
  );
}
