import { grey, pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const appTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Raleway',
      fontSize: 15,
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: grey[700],
    },
    secondary: {
      main: pink[500],
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        sx: {
          px: 1,
        },
        variant: 'subtitle2',
      },
    },
    MuiStack: {
      defaultProps: {
        sx: {
          px: 2,
          py: 1,
        },
        spacing: 2,
        direction: 'row',
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiLink: {
      defaultProps: {
        sx: {
          color: (theme) => theme.palette.primary.main,
        },
        underline: 'none',
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          p: 0,
        },
        size: 'small',
        disableRipple: true,
      },
    },
  },
});

type AppTheme = typeof appTheme;

export type { AppTheme };
export { appTheme };
