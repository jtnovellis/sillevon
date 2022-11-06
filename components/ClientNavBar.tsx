import Cookies from 'js-cookie';
import { Text, Navbar, Group, Avatar, Button } from '@mantine/core';
import { useClientProfile } from './ui/useClientProfile';
import {
  IconSettings,
  IconLogout,
  IconHome,
  IconChartBar,
  IconFileAnalytics,
  IconMessageCircle,
  IconCalendar,
  IconUsers,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import { useAppSelector } from '../hooks/redux';

const data = [
  {
    link: '/profile/client',
    label: 'Dashboard',
    icon: IconHome,
  },
  {
    link: '/profile/client/connections',
    label: 'Connections',
    icon: IconUsers,
  },
  { link: '/profile/client/stats', label: 'Stats', icon: IconChartBar },
  {
    link: '/profile/client/contracts',
    label: 'Contracts',
    icon: IconFileAnalytics,
  },
  { link: '/profile/client/chat', label: 'Chat', icon: IconMessageCircle },
  {
    link: '/profile/client/calendar',
    label: 'Calendar',
    icon: IconCalendar,
  },
  { link: '/profile/client/settings', label: 'Settings', icon: IconSettings },
];

interface ClientNavBarProps {}

export function ClientNavbar({}: ClientNavBarProps) {
  const { classes, cx } = useClientProfile();
  const router = useRouter();
  const { name } = useAppSelector((state) => state.user);

  const links = data.map((item) => (
    <Button
      variant='outline'
      key={item.label}
      className={cx(classes.link)}
      onClick={(event: any) => {
        event.preventDefault();
        router.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Button>
  ));

  return (
    <Navbar
      height={700}
      width={{ sm: 300 }}
      p='md'
      className={classes.navContainer}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position='apart'>
          <Avatar size={38} />
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
