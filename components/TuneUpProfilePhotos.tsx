import { createStyles, Card, Avatar, Text } from '@mantine/core';
import { DropZone } from './DropZone';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    width: '20rem',
    height: '25rem',
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
  dropZone: {
    width: '20rem',
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
      <div className={classes.dropZone}>
        <DropZone />
      </div>
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
            {name}
          </Text>
        </Card>
      </div>
      <div className={classes.dropZone}>
        <DropZone />
      </div>
    </div>
  );
}
