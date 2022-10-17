import { createStyles } from '@mantine/core';

export const useHeaderStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.md,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.blue[6]
          : theme.colors.blue[1],
    }),
  },
  header: {
    position: 'fixed',
    padding: '0 45px !important',

    [theme.fn.smallerThan('sm')]: {
      padding: '0 16px !important',
    },
  },

  logo: {
    fontSize: 25,
    fontWeight: 700,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));
