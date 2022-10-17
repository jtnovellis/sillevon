import { Avatar, Text, Button, Paper } from '@mantine/core';
import { NextPage } from 'next';

interface MusicianCardProps {
  avatar: string;
  name: string;
  instrument: string;
  genre: string;
}

const MusicianCard: NextPage<MusicianCardProps> = ({
  avatar,
  name,
  instrument,
  genre,
}) => {
  return (
    <Paper
      radius='md'
      withBorder
      p='lg'
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx='auto' />
      <Text align='center' size='lg' weight={500} mt='md'>
        {name}
      </Text>
      <Text align='center' color='dimmed' size='sm'>
        {instrument} • {genre}
      </Text>
      <Button variant='default' fullWidth mt='md' radius='md'>
        Show more
      </Button>
    </Paper>
  );
};

export default MusicianCard;
