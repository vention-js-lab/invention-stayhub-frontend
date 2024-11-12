import Box from '@mui/material/Box';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { FaStaylinked } from 'react-icons/fa';

export function Logo() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
      <FaStaylinked size={40} color={pink[500]} />
      <Typography
        sx={{
          ml: 1,
          color: (theme) => theme.palette.secondary.main,
          fontSize: '20px',
          fontWeight: 'bold',
        }}
        component="h3"
      >
        StayHub
      </Typography>
    </Box>
  );
}
