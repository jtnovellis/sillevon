import { useState } from 'react';
import { Navbar, Group, Avatar, Button, Text } from '@mantine/core';
import {
  IconBellRinging,
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconChartBar,
  IconLogout,
} from '@tabler/icons';
import { useUserNavProfile } from './ui/useUserNavProfile';
import Cookies from 'js-cookie';
import { useAppSelector } from '../hooks/redux';

const data = [
  { label: 'Notifications', icon: IconBellRinging },
  { label: 'Stats', icon: IconChartBar },
  { label: 'Add a Post', icon: IconPhoto },
  { label: 'Chat', icon: IconMessageCircle },
  { label: 'Settings', icon: IconSettings },
];

interface UserCardProfileProps {
  avatar: string;
  name: string;
}

export function UserCardProfile({ avatar, name }: UserCardProfileProps) {
  const { classes, cx } = useUserNavProfile();
  const [active, setActive] = useState('');
  const { imagesDone } = useAppSelector((state) => state.user);

  const links = data.map((item) => (
    <Button
      variant='outline'
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Button>
  ));

  return (
    <Navbar height={700} width={{ sm: 300 }} p='md'>
      <Navbar.Section grow>
        <Group className={classes.header} position='apart'>
          <Avatar src={avatar} size={37} />
          <Text>{name}</Text>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Button
          variant='outline'
          className={classes.link}
          onClick={() => {
            Cookies.remove('sillusr');
            window.location.assign('/');
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Button>
      </Navbar.Section>
    </Navbar>
  );
}
