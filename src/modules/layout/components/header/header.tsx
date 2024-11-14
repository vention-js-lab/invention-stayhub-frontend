import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ProfileOptions } from './profile-options';
import { Logo } from './logo';
import { style } from '#/modules/layout/styles/style';

export function Header() {
  return (
    <Box sx={style.header}>
      <Container maxWidth="xl">
        <Box sx={style.headerContent}>
          <Logo />
          <ProfileOptions />
        </Box>
      </Container>
    </Box>
  );
}
