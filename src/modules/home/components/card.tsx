import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export function ApartmentCard() {
  return (
    <Card>
      <CardMedia component="img" height="140" image="https://placehold.co/600x400" alt="Apartment" />
      <CardContent>
        <Typography variant="h5">Apartment</Typography>
        <Typography>Beautiful apartment in the city center</Typography>
      </CardContent>
    </Card>
  );
}
