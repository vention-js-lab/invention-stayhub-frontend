import Box from '@mui/material/Box';
import NoResultImg from '#/assets/no-result.png';

const styles = {
  contentBox: {
    height: '72vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e3e3e3',
    mt: '20px',
    fontSize: '30px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    '@media (max-width: 650px)': {
      fontSize: '20px',
    },
  },
  img: {
    width: '250px',
    '@media (max-width: 650px)': {
      width: '150px',
    },
  },
};

export function NoResult({ text }: { text: string }) {
  return (
    <Box sx={styles.contentBox}>
      <Box component={'img'} src={NoResultImg} sx={styles.img} />
      <Box sx={styles.errorText}>{text}</Box>
    </Box>
  );
}
