import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { UserMenu } from './UserMenu';
import { Languages } from './Languages';

export function ProfileOptions() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack>
        <Languages />
        <UserMenu />
      </Stack>
    </Box>
  );
}
