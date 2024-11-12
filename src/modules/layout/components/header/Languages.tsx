import { useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FiGlobe } from 'react-icons/fi';

export function Languages() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const lang = [
    { id: 1, lang: 'English' },
    { id: 1, lang: 'Русский' },
    { id: 1, lang: "O'zbekcha" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };
  return (
    <Button
      sx={{
        color: (theme) => theme.palette.text.primary,
        fontWeight: 'bold',
      }}
      onClick={handleClick}
    >
      <FiGlobe size={22} />
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
        {lang.map((elem) => (
          <MenuItem key={elem.id}>
            <Link href="#" sx={{ width: 150 }}>
              {elem.lang}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Button>
  );
}
