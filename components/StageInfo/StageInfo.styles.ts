import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    border: 1,
    borderStyle: 'solid',
    borderColor: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.gray[4],
    borderRadius: 10,
    display: 'grid',
    gap: 30,
    boxShadow: theme.shadows.lg,
    width: 'fit-content',
    marginInline: 20,
    paddingInline: 40,
    paddingBlock: 50,

    [theme.fn.smallerThan('md')]: {
      gap: 20,
      paddingInline: 25,
      paddingBlock: 40,
      textAlign: 'center',
      marginInline: 10,
    },
  },
  infoContainer: {
    display: 'grid',
    width: 'fit-content',
    gap: 15,

    [theme.fn.smallerThan('md')]: {
      gap: 5,
    },
  },
  title: {
    fontSize: 35,

    [theme.fn.smallerThan('md')]: {
      fontSize: 30,
    },
  },
  textWrapper: {
    columnGap: 8,
    rowGap: 1,
  },
  label: {
    fontSize: 18,
    [theme.fn.smallerThan('md')]: {
      fontSize: 16,
      gap: 20,
    },
  },
  content: {
    fontSize: 18,
    fontWeight: 700,
    [theme.fn.smallerThan('md')]: {
      fontSize: 16,
      truncate: true,
      maxWidth: 140,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
}));
