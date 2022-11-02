import {
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  Switch,
  ScrollArea,
  Avatar,
  useMantineColorScheme,
} from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoonStars, IconPlayerPlay } from '@tabler/icons';
import Link from 'next/link';
import { useHeaderStyles } from './ui/useHeaderStyles';
import { NextPage } from 'next';
import Login from './Login';

const HeaderNav: NextPage = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useHeaderStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box>
      <Header height={75} px='md' className={classes.header}>
        <Group position='apart' sx={{ height: '100%' }}>
          <Link href='/'>
            <a className={classes.logo}>
              <IconPlayerPlay size={35} />
              <span>Sillevon</span>
            </a>
          </Link>
          <Group
            sx={{ height: '100%' }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link href='/'>
              <a className={classes.link}>Home</a>
            </Link>
            <Link href='/artists'>
              <a className={classes.link}>Artists</a>
            </Link>
            <Link href='/pricing'>
              <a className={classes.link}>Pricing</a>
            </Link>
          </Group>
          <Group className={classes.hiddenMobile}>
            <Switch
              checked={colorScheme === 'dark'}
              onChange={() => toggleColorScheme()}
              size='lg'
              onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
              offLabel={
                <IconMoonStars
                  color={theme.colors.gray[6]}
                  size={20}
                  stroke={1.5}
                />
              }
            />
            {true ? (
              <Button
                variant='default'
                onClick={() => {
                  openModal({
                    title: 'Stay with us',
                    children: <Login closeAllModals={closeAllModals} />,
                  });
                }}
              >
                Log in
              </Button>
            ) : (
              <button className={classes.avatar}>
                <Avatar
                  src={
                    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80'
                  }
                  radius='xl'
                />
              </button>
            )}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        title='Sillevon'
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx='-md'>
          <Divider
            my='sm'
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />
          <Link href='/'>
            <a className={classes.link}>Home</a>
          </Link>
          <Link href='/artists'>
            <a className={classes.link}>Artists</a>
          </Link>
          <Link href='/pricing'>
            <a className={classes.link}>Pricing</a>
          </Link>
          <Divider
            my='sm'
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />
          <Group position='center' grow pb='xl' px='md'>
            <Switch
              checked={colorScheme === 'dark'}
              onChange={() => toggleColorScheme()}
              size='lg'
              onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
              offLabel={
                <IconMoonStars
                  color={theme.colors.gray[6]}
                  size={20}
                  stroke={1.5}
                />
              }
            />
            <Button variant='default'>Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default HeaderNav;
