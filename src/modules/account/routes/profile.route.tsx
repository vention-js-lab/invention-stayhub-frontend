import Box from '@mui/material/Box';
import { ProfileInfo } from '../components/profile';
import UserImage from '#/assets/images/card-temp-image.jpg';
import { useProfileQuery } from '../api/get-user.api';
import { Typography } from '@mui/material';

export function ProfileRoute() {
  const { data } = useProfileQuery();
  if (!data) {
    return <Typography>User's data is not provided</Typography>;
  }

  return (
    <Box>
      <ProfileInfo
        image={UserImage}
        firstName={data?.firstName}
        lastName={data?.lastName}
        phoneNumber={data?.phoneNumber}
        country={data?.country}
        gender={data?.gender}
        description={data?.description}
      />
    </Box>
  );
}
