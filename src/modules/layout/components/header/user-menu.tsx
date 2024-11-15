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
import { style } from '#/modules/layout/styles/style';

export function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { authStatus, logout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/auth/login');
  };

  const handleSignUpClick = () => {
    setOpen((prev) => !prev);
    navigate('/auth/register');
  };

  const handleLoginClick = () => {
    setOpen(false);
    navigate('/auth/login');
  };

  const menuItems =
    authStatus === 'authenticated'
      ? [
          { label: 'My Account', action: () => navigate('/account') },
          { label: 'My Wishlist', action: () => navigate('/wishlist') },
          { label: 'My Accommodations', action: () => navigate('/accommodations') },
          { label: 'My Bookings', action: () => navigate('/bookings') },
          { label: 'Logout', action: handleLogout },
        ]
      : [
          { label: 'Log in', action: handleLoginClick },
          { label: 'Sign up', action: handleSignUpClick },
        ];

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
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.action}>
            <Link href="" sx={{ width: 150 }}>
              {item.label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Button>
  );
}
