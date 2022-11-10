import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { useJwt } from 'react-jwt';
import { fetchUserData } from '../lib/userdata';
import Cookies from 'js-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const token = Cookies.get('sillusr');
    async function userdata() {
      if (token) {
        const res = await fetchUserData({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = res.data;
        Cookies.remove('mode');
        Cookies.set('mode', user.mode, { expires: 1 });
        Cookies.set('name', user.name, { expires: 1 });
        Cookies.set('avatar', user.imagesDone.avatar, { expires: 1 });
        Cookies.set('background', user.imagesDone.background, { expires: 1 });
      } else {
        Cookies.remove('sillusr');
        Cookies.remove('mode');
        Cookies.remove('name');
        Cookies.remove('avatar');
        Cookies.remove('background');
      }
    }
    userdata();
  }, []);

  return (
    <Provider store={store}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <NotificationsProvider>
            <ModalsProvider>
              <Component {...pageProps} />
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Provider>
  );
}

export default MyApp;
