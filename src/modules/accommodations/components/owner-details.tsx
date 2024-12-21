import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { readableDate } from '#/shared/utils/readable-date.util';
import { useTranslation } from 'react-i18next';

interface UserDetailsProps {
  since: string;
  image: string | null;
  firstname: string | null;
  lastname: string | null;
  description: string | null;
}

const styles = {
  container: { display: 'flex', padding: '16px 8px', alignItems: 'center', gap: 2 },
  avatar: { width: 70, height: 70, cursor: 'pointer' },
  nameBox: { display: 'flex', alignItems: 'center' },
  since: { pl: '5px', color: '#d1d1d1' },
};

export function OwnerDetails({ since, image, firstname, lastname, description }: UserDetailsProps) {
  const { t } = useTranslation();

  return (
    <Box sx={styles.container}>
      <Link href="/users/profile">
        <Avatar src={image || firstname?.[0] || ''} sx={styles.avatar} />
      </Link>
      <Box>
        <Box sx={styles.nameBox}>
          <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
            {!firstname && !lastname ? `NoName` : `${firstname} ${lastname}`}
          </Typography>
          <Typography sx={styles.since}>
            {t('singleAccommodation.withUs')} {readableDate(since)}
          </Typography>
        </Box>
        <Typography sx={{ p: '0' }}>{description}</Typography>
      </Box>
    </Box>
  );
}
