import Box from '@mui/material/Box';
import { ProfileOptions } from './profile-options';
import { Logo } from './logo';
import Link from '@mui/material/Link';

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 'var(--header-height)',
    width: '100%',
    px: 15,
  },
};

export function Header() {
  return (
    <Box sx={styles.header}>
      <Box sx={styles.headerContent}>
        <Link href="/">
          <Logo />
        </Link>
        <ProfileOptions />
      </Box>
    </Box>
  );
}
