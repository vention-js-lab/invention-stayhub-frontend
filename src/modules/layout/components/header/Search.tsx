import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { IoSearchCircleSharp } from 'react-icons/io5';
import { pink } from '@mui/material/colors';

export function Search({ search, handleSearch }: { search: boolean; handleSearch: () => void }) {
  return (
    <Box onClick={handleSearch}>
      {search ? (
        <Typography sx={{ fontWeight: 'bold', cursor: 'pointer', ml: 2 }}>Search for accommodation...</Typography>
      ) : (
        <Paper sx={{ borderRadius: 20, ml: 2 }} elevation={2}>
          <Stack sx={{ borderRadius: 20, pl: 2 }}>
            <Button>
              <Typography sx={{ color: (theme) => theme.palette.text.primary, fontWeight: 'bold' }}>
                Search for accommodation...
              </Typography>
              <Box sx={{ ml: 1, mt: 1, mr: 1 }}>
                <IoSearchCircleSharp color={pink[500]} size={32} />
              </Box>
            </Button>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
