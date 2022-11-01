import {
  createStyles,
  Card,
  Avatar,
  Text,
  Button,
  Center,
} from '@mantine/core';
import { DropZone } from './DropZone';
import MapForRegister from './MapForRegister';
import Map from './Map';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    width: '20rem',
    height: '21rem',
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    }`,
  },
  TuneUpProfilePhotos: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  map: {
    width: '30rem',
    height: '25rem',
  },
}));

interface TuneUpProfilePhotosProps {
  image?: string;
  avatar?: string;
  name?: string;
}

export function TuneUpProfilePhotos({
  image,
  avatar,
  name,
}: TuneUpProfilePhotosProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.TuneUpProfilePhotos}>
      <div>
        <Card withBorder p='xl' radius='md' className={classes.card}>
          <Card.Section
            sx={{ backgroundImage: `url(${image})`, height: 140 }}
          />
          <Avatar
            src={avatar}
            size={100}
            radius={80}
            mx='auto'
            mt={-30}
            className={classes.avatar}
          />
          <Text align='center' size='lg' weight={500} mt='sm'>
            {name || 'Jairo'}
          </Text>
          <Center>
            <Button>Avatar</Button>
            <Button>Background</Button>
          </Center>
        </Card>
      </div>
      <div>
        {/* <Map
          zoom={11}
          center={{ lat: 10.96104, lng: -74.800957 }}
          className={classes.map}
          position={{ lat: 10.96104, lng: -74.800957 }}
        /> */}
        <MapForRegister />
      </div>
    </div>
  );
}
