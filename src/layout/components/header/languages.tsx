import Button from '@mui/material/Button';
import LanguageIcon from '@mui/icons-material/Language';
import { style } from '#/layout/styles/style';
import { pink } from '@mui/material/colors';

export function Languages() {
  return (
    <Button sx={style.languages}>
      <LanguageIcon fontSize="medium" sx={{ color: pink[500] }} />
    </Button>
  );
}
