import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { RegisterForm } from '../components/register-form';
import { style } from '../styles/style';
import { useNavigate } from 'react-router-dom';
import { LoginLink } from '../components/login-link';

export function RegisterRoute() {
  const navigate = useNavigate();

  return (
    <Box sx={style.mainBox}>
      <Box sx={style.form}>
        <Typography variant="h2" sx={style.heading} gutterBottom={true}>
          Welcome to StayHub
        </Typography>
        <Typography align="center" mt={1}>
          Please fill in the form to create your account
        </Typography>
        <CloseIcon fontSize="small" sx={style.closeIcon} onClick={() => navigate('/')} />
        <RegisterForm />
        <LoginLink />
      </Box>
    </Box>
  );
}
