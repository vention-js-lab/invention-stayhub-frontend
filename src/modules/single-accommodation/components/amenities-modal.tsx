import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { type Dispatch, type SetStateAction } from 'react';

const styles = {
  backgroundPaper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxHeight: '60%',
    overflowY: 'auto',
    padding: 4,
  },
};
interface Amenity {
  icon: React.ElementType;
  label: string;
}
interface AmenitiesProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  amenity: Amenity[];
}

export function AmenitiesModal({ amenity, isModalOpen, setIsModalOpen }: AmenitiesProps) {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Paper sx={styles.backgroundPaper}>
        <Typography variant="h6" gutterBottom={true}>
          All Amenities
        </Typography>
        <List>
          {amenity.map((value) => {
            const Icon = value.icon;
            return (
              <ListItem key={value.label}>
                <ListItemIcon>
                  <Icon color="primary" />
                </ListItemIcon>
                <ListItemText primary={value.label} />
              </ListItem>
            );
          })}
        </List>
        <Box textAlign="center" marginTop={2}>
          <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
