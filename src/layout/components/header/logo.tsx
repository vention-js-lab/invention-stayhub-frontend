import Box from '@mui/material/Box';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { style } from '#/layout/styles/style';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

export function Logo() {
  return (
    <Box sx={style.logo}>
      <LoyaltyIcon fontSize="large" sx={{ color: pink[500] }} />
      <Typography sx={style.logoName} component="h3">
        StayHub
      </Typography>
    </Box>
  );
}
