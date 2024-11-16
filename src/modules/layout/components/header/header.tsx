import Box from '@mui/material/Box';
import { ProfileOptions } from './profile-options';
import { Logo } from './logo';

export const headerHeight = 80;
const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 2,
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: headerHeight,
    width: '100%',
    px: 5,
  },
};

export function Header() {
  return (
    <Box sx={styles.header}>
      <Box sx={styles.headerContent}>
        <Logo />
        <ProfileOptions />
      </Box>
    </Box>
  );
}
