import Box from '@mui/material/Box';
import { PersonalInfo } from '../components/profile';
import UserImage from '#/assets/images/card-temp-image.jpg';

// const MockUser = {
//   image: '',
//   name: 'name',
//   surname: 'surname',
//   phoneNumber: '',
//   country: '',
//   gender: '',
//   description: '',
// };

export function AccountRoute() {
  return (
    <Box>
      <PersonalInfo
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
