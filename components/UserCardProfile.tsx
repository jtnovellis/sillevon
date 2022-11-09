import { useState } from 'react';
import { Navbar, Group, Avatar, Button, Text } from '@mantine/core';
import {
  IconSettings,
  IconMessageCircle,
  IconUsers,
  IconPhoto,
  IconChartBar,
  IconLogout,
  IconTable,
} from '@tabler/icons';
import { useUserNavProfile } from './ui/useUserNavProfile';
import Cookies from 'js-cookie';
import { openModal, closeAllModals } from '@mantine/modals';
import AddPost from './AddPost';
import ConnectionClient from './ConnectionClients';
import { useRouter } from 'next/router';

const data = [
  { label: 'Connections', icon: IconUsers },
  { label: 'Stats', icon: IconChartBar },
  { label: 'Contracts', icon: IconTable },
  { label: 'Add a Post', icon: IconPhoto },
  { label: 'Chat', icon: IconMessageCircle },
  { label: 'Settings', icon: IconSettings },
];

interface UserCardProfileProps {
  avatar: string;
  name: string;
  user: {
    _id: string;
    imagesDone: {
      avatar: string;
      background: string;
    };
    location: {
      lat: number;
      lng: number;
    };
    skills: {
      improvisation: number;
      show: number;
      repertoire: number;
      versatility: number;
      instrumentation: number;
    };
    name: string;
    email: string;
    terms: boolean;
    mode: string;
    favoriteGenres: [];
    posts: {
      likes: number;
      _id: string;
      title: string;
      urlImage: string;
      comments: {
        body: string;
        _id: string;
        author: {
          imagesDone: {
            avatar: string;
          };
          name: string;
        };
        post: object;
        createdAt: string;
        updatedAt: string;
      }[];
    }[];
    city: string;
    price: number;
    genre: string;
    instrument: string;
    connections: any[];
    contracts: [];
  };
}

export function UserCardProfile({ avatar, name, user }: UserCardProfileProps) {
  const { classes, cx } = useUserNavProfile();
  const [active, setActive] = useState('');
  const router = useRouter();

  const links = data.map((item) => (
    <Button
      variant='outline'
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={() => {
        setActive(item.label);
        if (item.label === 'Add a Post') {
          openModal({
            title: 'Add a post',
            children: <AddPost closeAllModals={closeAllModals} />,
          });
        } else if (item.label === 'Connections') {
          openModal({
            title: 'Connections',
            children: <ConnectionClient user={user} />,
          });
        } else if (item.label === 'Contracts') {
          router.push({
            pathname: '/profile/artists/contracts',
          });
        }
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
