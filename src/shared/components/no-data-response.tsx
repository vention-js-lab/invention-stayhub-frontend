import Typography from '@mui/material/Typography';

const styles = {
  noData: { alignContent: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' },
};
export function NoDataAvailable({ data }: { data: string }) {
  return <Typography sx={styles.noData}>No {data} are provided</Typography>;
}
