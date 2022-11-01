import { useCallback, useRef, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import { IconPlayerPlay } from '@tabler/icons';
import styles from '../styles/MapForRegister.module.scss';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import Search from './Search';

type Lib = (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[];

export type PanToCallback = { lat: number; lng: number };

const libraries: Lib = ['places'];

const zoom = 5;
const center = { lat: 4.60688, lng: -74.071838 };
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

type SelectedState = { lat: number; lng: number } | null;

export default function MapForRegister() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });
  const mapRef = useRef<any>();
  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }: PanToCallback) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  const [marked, setMarked] = useState({ lat: 0, lng: 0 });
  const [selected, setSelected] = useState<SelectedState>(null);

  if (!isLoaded) return <div>Loading...</div>;

  const handleClick = (e: any) => {
    setMarked({ lat: e.latLng?.lat(), lng: e.latLng?.lng() });
  };

  return (
    <div className={styles.mapForRegisterContainer}>
      <div className={styles.logoSillevonMapForRegister}>
        <IconPlayerPlay />
        <h2>Sillevon</h2>
      </div>
      <Search panTo={panTo} />
      <GoogleMap
        onLoad={onMapLoad}
        zoom={zoom}
        center={center}
        mapContainerClassName={styles.mapForRegister}
        options={options}
        onClick={handleClick}
      >
        <Marker
          position={marked}
          onClick={() => {
            setSelected(marked);
          }}
        />
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h3>This is your approx location</h3>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
