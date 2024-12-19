import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '#/shared/hooks/auth.hook';
import { style } from '#/layout/styles/style';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

export function UserMenu() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { authStatus, logout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/auth/login');
  };

  return (
    <Button sx={style.userMenu} onClick={handleClick}>
      <Stack sx={style.userMenuContent}>
        <MenuIcon fontSize="small" />
        <AccountCircleIcon fontSize="medium" />
      </Stack>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ mt: 1 }}
      >
        {authStatus === 'authenticated' ? (
          <Box>
            <MenuItem onClick={() => navigate('/account/profile')}>{t('account.account')}</MenuItem>
            <MenuItem onClick={() => navigate('/wishlist')}>{t('account.wishlist')}</MenuItem>
            <MenuItem onClick={() => navigate('/accommodations')}>{t('account.accommodations')}</MenuItem>
            <MenuItem onClick={() => navigate('/bookings')}>{t('account.bookings')}</MenuItem>
            <MenuItem onClick={handleLogout}>
              <Button fullWidth={true} color="error">
                {t('account.logout')}
              </Button>
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem>
              <Link href="/auth/login" sx={{ width: 150, textDecoration: 'none' }}>
                {t('account.login')}
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/auth/register" sx={{ width: 150, textDecoration: 'none' }}>
                {t('account.signup')}
              </Link>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Button>
  );
}
