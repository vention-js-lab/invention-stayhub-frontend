import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { readableDate } from '#/shared/utils/readable-date.util';
import { useTranslation } from 'react-i18next';

interface UserDetailsProps {
  id: string;
  since: string;
  image: string | null;
  firstname: string | null;
  lastname: string | null;
  description: string | null;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    padding: '16px 8px',
    alignItems: { xs: 'flex-start', md: 'center' },
    gap: 2,
  },
  avatar: { width: { xs: 50, md: 70 }, height: { xs: 50, md: 70 }, cursor: 'pointer', mr: '10px' },
  nameBox: { display: 'flex', alignItems: 'center', flexWrap: 'wrap' },
  since: {
    color: '#d1d1d1',
    fontSize: { xs: '12px', md: '14px' },
  },
};

export function OwnerDetails({ id, since, image, firstname, lastname, description }: UserDetailsProps) {
  const { t } = useTranslation();

  return (
    <Box sx={styles.container}>
      <Link href={`/users/profile/${id}`} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={image || firstname?.[0] || ''} sx={styles.avatar} />
        <Box>
          <Box sx={styles.nameBox}>
            <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '18px' }, mr: '10px' }}>
              {!firstname && !lastname ? `NoName` : `${firstname} ${lastname}`}
            </Typography>
            <Typography sx={styles.since}>
              {t('singleAccommodation.withUs')} {readableDate(since)}
            </Typography>
          </Box>
          <Typography
            component="div"
            sx={{
              maxWidth: '200px',
              p: '0',
              fontSize: { xs: '14px', md: '16px' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}
