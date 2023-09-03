import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
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
