import Box from '@mui/material/Box';
import { ProfileInfo } from '../components/profile';
import UserImage from '#/assets/images/card-temp-image.jpg';

export function ProfileRoute() {
  return (
    <Box>
      <ProfileInfo
        image={UserImage}
        name="name"
        lastname="surname"
        phoneNumber="999899697"
        country="uzb"
        gender="Male"
        description="Write about"
      />
    </Box>
  );
}
