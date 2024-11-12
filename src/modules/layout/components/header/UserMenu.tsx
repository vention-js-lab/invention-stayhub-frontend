import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

export function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };
  return (
    <Button
      sx={{
        borderRadius: 10,
        border: '1px solid #ddd',
        '&:hover': {
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.4)',
        },
      }}
      onClick={handleClick}
    >
      <Stack sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
        <AiOutlineMenu size={18} />
        <FaUserCircle size={28} />
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
          <Link href="#" sx={{ width: 150 }}>
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
