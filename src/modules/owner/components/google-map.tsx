import { useState } from 'react';
import { GoogleMap, Autocomplete, MarkerF, useLoadScript, type LoadScriptProps } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { validatedEnv } from '#/configs/env.config';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const libraries: LoadScriptProps['libraries'] = ['places'];

interface GoogleMapComponentProps {
  onLocationChange: (lat: number, lng: number) => void;
}

export function GoogleMapComponent({ onLocationChange }: GoogleMapComponentProps) {
  const [mapCenter, setMapCenter] = useState({ lat: 41.299496, lng: 69.240074 });
  const [markerPosition, setMarkerPosition] = useState({ lat: 41.299496, lng: 69.240074 });
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: validatedEnv.VITE_GOOGLE_MAP_APIKEY,
    libraries,
  });

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });
        setMarkerPosition({ lat: latitude, lng: longitude });
        onLocationChange(latitude, longitude);
      },
      () => {
        showSnackbar({
          message: 'Error getting current location. Please check your settings.',
          variant: 'error',
        });
      },
      { enableHighAccuracy: true }
    );
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMapCenter({ lat, lng });
        setMarkerPosition({ lat, lng });
        onLocationChange(lat, lng);
      }
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng;
    if (latLng) {
      setMarkerPosition({ lat: latLng.lat(), lng: latLng.lng() });
      onLocationChange(latLng.lat(), latLng.lng());
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Box>
      <Typography mt={5} mb={2} fontSize={18} fontWeight={500} color="#333">
        Mark Acommodation Address on the Map
      </Typography>
      <Box mb={2}>
        <Autocomplete onLoad={(auto) => setAutocomplete(auto)} onPlaceChanged={handlePlaceChanged}>
          <TextField type="text" fullWidth={true} label="Enter an address" />
        </Autocomplete>
      </Box>
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={getCurrentLocation}
        center={mapCenter}
        zoom={14}
        onClick={handleMapClick}
      >
        <MarkerF
          position={markerPosition}
          draggable={true}
          onDragEnd={(e) => {
            setMarkerPosition({
              lat: e.latLng?.lat() || 0,
              lng: e.latLng?.lng() || 0,
            });
          }}
        />
      </GoogleMap>
    </Box>
  );
}
