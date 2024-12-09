import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { type Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: 4,
    gap: 2,
  },
  actionButton: {
    width: 120,
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
  },
  reloadButton: {
    width: 120,
    marginLeft: 2,
    color: (theme: Theme) => theme.palette.secondary.main,
    borderColor: (theme: Theme) => theme.palette.secondary.main,
  },
};

interface ErrorLayoutProps {
  title: string;
  message: string;
  reloadButton?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorLayout({ title, message, reloadButton, actionLabel, onAction }: ErrorLayoutProps) {
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Typography fontSize={44} fontWeight="bold" sx={{ color: '#333' }}>
        {title}
      </Typography>
      <Typography fontSize={20} sx={{ color: '#666' }}>
        {message}
      </Typography>
      <Box marginTop={1}>
        {onAction && actionLabel ? (
          <Button variant="contained" size="large" sx={styles.actionButton} onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
        {reloadButton ? (
          <Button variant="outlined" size="large" sx={styles.reloadButton} onClick={() => navigate(0)}>
            Reload
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
