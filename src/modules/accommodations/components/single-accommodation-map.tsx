import { GoogleMap, MarkerF, useLoadScript, type LoadScriptProps } from '@react-google-maps/api';
import { validatedEnv } from '#/configs/env.config';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const styles = {
  container: {
    width: '100%',
    height: '500px',
  },
};

const libraries: LoadScriptProps['libraries'] = ['places'];

interface SingleAccommodationMapProps {
  latitude: string;
  longitude: string;
}

export function SingleAccommodationMap({ latitude, longitude }: SingleAccommodationMapProps) {
  const mapCenter = { lat: Number(latitude), lng: Number(longitude) };
  const markerPosition = { lat: Number(latitude), lng: Number(longitude) };
  const { t } = useTranslation();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: validatedEnv.VITE_GOOGLE_MAP_APIKEY,
    libraries,
  });

  if (!isLoaded) return <div>{t('UI.loading')}</div>;

  return (
    <Box>
      <Typography m={3} fontSize={22} fontWeight={500} color="#333">
        {t('singleAccommodation.location')}
      </Typography>
      <GoogleMap mapContainerStyle={styles.container} center={mapCenter} zoom={14}>
        <MarkerF position={markerPosition} />
      </GoogleMap>
    </Box>
  );
}
