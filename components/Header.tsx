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
            <Button
              variant='default'
              onClick={() => {
                openModal({
                  title: 'Stay with us',
                  children: (
                    <>
                      <Login closemodal={closeAllModals} />
                    </>
                  ),
                });
              }}
            >
              Log in
            </Button>
            <Button>Sign up</Button>
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
