import { grey, pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const appTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Roboto',
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
