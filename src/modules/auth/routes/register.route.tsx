import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { RegisterForm } from '../components/register-form';
import { style } from '../styles/style';
import { useNavigate } from 'react-router-dom';

export function RegisterRoute() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={style.regRouter}>
        <Typography variant="h2" sx={style.heading} gutterBottom={true}>
          Welcome to StayHub
        </Typography>
        <CloseIcon fontSize="small" sx={style.closeIcon} onClick={() => navigate('/')} />
        <RegisterForm />
      </Box>
    </Box>
  );
}
