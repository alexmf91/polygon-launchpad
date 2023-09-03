import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 100,
    fontWeight: 900,
    letterSpacing: -2,

    [theme.fn.smallerThan('md')]: {
      fontSize: 60,
      textAlign: 'center',
    },
    [theme.fn.smallerThan('sm')]: {
      fontSize: 50,
      textAlign: 'center',
    },
  },
  subtitle: {
    maxWidth: 700,
    fontSize: 25,
    marginTop: 20,

    [theme.fn.smallerThan('md')]: {
      fontSize: 18,
      textAlign: 'center',
    },
  },
}));
