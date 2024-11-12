import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 2,
        backgroundColor: '#f7f7f7',
        textAlign: 'center',
        height: '80px',
        px: 6,
      }}
    >
      <Typography variant="body2">StayHub © 2024</Typography>
      <Box sx={{ display: 'flex' }}>
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
  );
}
