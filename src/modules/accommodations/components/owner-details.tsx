import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

interface UserDetailsProps {
  image: string;
  firstname: string;
  lastname: string;
  description: string;
}

const styles = {
  container: { display: 'flex', padding: '16px 8px', alignItems: 'center', gap: 2 },
  avatar: { width: 70, height: 70, cursor: 'pointer' },
};

export function OwnerDetails({ image, firstname, lastname, description }: UserDetailsProps) {
  return (
    <Box sx={styles.container}>
      <Link href="/users/profile">
        <Avatar src={image} sx={styles.avatar} />
      </Link>
      <Box>
        <Typography>
          {firstname} {lastname}
        </Typography>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  );
}
