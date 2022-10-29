import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  zoom: number;
  center: {
    lat: number;
    lng: number;
  };
  className: string;
  position: {
    lat: number;
    lng: number;
  };
}

export default function Map({ zoom, center, className, position }: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });
  const fixedCenter = useMemo(() => center, [center]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={zoom}
      center={fixedCenter}
      mapContainerClassName={className}
    >
      <Marker position={position} />
    </GoogleMap>
  );
}
