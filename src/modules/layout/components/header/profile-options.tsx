import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { UserMenu } from './user-menu';
import { Languages } from './languages';

export function ProfileOptions() {
  return (
    <Box>
      <Stack>
        <Languages />
        <UserMenu />
      </Stack>
    </Box>
  );
}
