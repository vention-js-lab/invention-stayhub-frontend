import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export const footerHeight = 50;
const styles = {
  footer: {
    backgroundColor: '#f7f7f7',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: footerHeight,
    px: 5,
  },
};

export function Footer() {
  return (
    <Box sx={styles.footer}>
      <Box sx={styles.footerContent}>
        <Typography variant="body2">StayHub © 2024</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2">Follow us on social media!</Typography>
          <Link href="https://www.facebook.com/airbnb">
            <FacebookIcon />
          </Link>
          <Link href="https://x.com/airbnb">
            <TwitterIcon />
          </Link>
          <Link href="https://www.instagram.com/airbnb/">
            <InstagramIcon />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
