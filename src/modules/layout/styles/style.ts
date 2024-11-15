import { type Theme } from '@mui/material/styles';

export const style = {
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 80,
    borderBottom: '1px solid #ddd',
  },
  headerContent: {
    display: 'flex',
    justifyContent: { xs: 'center', md: 'space-between' },
    alignItems: 'center',
    minHeight: 80,
    px: 4,
  },
  languages: {
    color: (theme: Theme) => theme.palette.text.primary,
    fontWeight: 'bold',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  logoName: {
    ml: 1,
    color: (theme: Theme) => theme.palette.secondary.main,
    fontSize: '20px',
    fontWeight: 'bold',
  },
  userMenu: {
    borderRadius: 10,
    border: '1px solid #ddd',
    '&:hover': {
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.4)',
    },
  },
  userMenuContent: {
    display: 'flex',
    alignItems: 'center',
    px: 1,
  },
};