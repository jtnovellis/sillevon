import { Card, Avatar, Text, Group, Button } from '@mantine/core';
import { useUserCardStyles } from './ui/useUserCardStyles';

interface UserCardProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
  stats: { label: string; value: number }[];
}

export function UserCard({ image, avatar, name, job, stats }: UserCardProps) {
  const { classes, theme } = useUserCardStyles();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text align='center' size='lg' weight={500}>
        {stat.value}
      </Text>
      <Text align='center' size='xs' color='dimmed'>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p='xl' radius='md' className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
      <Avatar
        src={avatar}
        size={80}
        radius={80}
        mx='auto'
        mt={-30}
        className={classes.avatar}
      />
      <Text align='center' size='lg' weight={500} mt='sm'>
        {name}
      </Text>
      <Text align='center' size='sm' color='dimmed'>
        {job}
      </Text>
      <Group mt='md' position='center' spacing={30}>
        {items}
      </Group>
      <Button
        fullWidth
        radius='md'
        mt='xl'
        size='md'
        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
      >
        Connect
      </Button>
    </Card>
  );
}
