import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    border: '2px solid #5F3DC4',
    padding: 40,
    borderRadius: 20,
    maxWidth: 530,
    height: 'fit-content',
    [theme.fn.smallerThan('md')]: {
      maxWidth: 400,
    },
  },
  form: {
    display: 'grid',
    gap: 30,
  },
  inputsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  inputWrapper: {
    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },
}));
