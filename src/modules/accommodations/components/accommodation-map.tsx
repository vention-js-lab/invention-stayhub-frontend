import { GoogleMap, MarkerF, useLoadScript, type LoadScriptProps } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { validatedEnv } from '#/configs/env.config';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    width: '100%',
    height: '500px',
  },
};

const libraries: LoadScriptProps['libraries'] = ['places'];

interface Accommodation {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
}

interface AccommodationMapProps {
  accommodations: Accommodation[];
}

export function AccommodationMap({ accommodations }: AccommodationMapProps) {
  const navigate = useNavigate();
  const defaultCenter = accommodations.length
    ? { lat: accommodations[0].latitude, lng: accommodations[0].longitude }
    : { lat: 41.3111, lng: 69.2797 };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: validatedEnv.VITE_GOOGLE_MAP_APIKEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Box>
      <Typography m={3} fontSize={22} fontWeight={500} color="#333">
        {'Explore Accommodations'}
      </Typography>
      <GoogleMap mapContainerStyle={styles.container} center={defaultCenter} zoom={12}>
        {accommodations.map((acc) => (
          <MarkerF
            key={acc.id}
            position={{ lat: acc.latitude, lng: acc.longitude }}
            title={acc.title}
            onClick={() => navigate(`/accommodation/${acc.id}`)}
          />
        ))}
      </GoogleMap>
    </Box>
  );
}
