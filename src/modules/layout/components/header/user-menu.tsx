import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { style } from '../../styles/style';

export function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };
  return (
    <Button sx={style.userMenu} onClick={handleClick}>
      <Stack sx={style.userMenuContent}>
        <MenuIcon fontSize="small" />
        <AccountCircleIcon fontSize="medium" />
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
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
        <MenuItem>
          <Link href="/login" sx={{ width: 150 }}>
            Log in
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="#" sx={{ width: 150 }}>
            Sign up
          </Link>
        </MenuItem>
      </Menu>
    </Button>
  );
}
