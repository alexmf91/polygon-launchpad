import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    borderColor: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.gray[4],
    display: 'flex',
    justifyContent: 'center',
    gap: 30,

    [theme.fn.smallerThan('md')]: {
      gap: 20,
    },
  },
  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2],
    fontSize: 40,
    fontWeight: 700,
    padding: 10,
    width: 100,
    borderRadius: 10,
    [theme.fn.smallerThan('md')]: {
      width: 75,
      fontSize: 25,
      textAlign: 'center',
    },
  },
  skeleton: {
    width: 100,
    height: 111,
    borderRadius: 10,
    [theme.fn.smallerThan('md')]: {
      width: 75,
      height: 87,
    },
  },
}));
