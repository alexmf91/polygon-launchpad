import { Welcome } from '@app/components';
import { Container, createStyles, rem } from '@mantine/core';
import dynamic from 'next/dynamic';

const StageInfo = dynamic(() => import('@app/components/StageInfo/StageInfo'), {
  ssr: false,
});

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-evenly',
    paddingBlock: `calc(${theme.spacing.xl} * 6)`,
    paddingInline: `calc(${theme.spacing.xl} * 1)`,
    [theme.fn.smallerThan('lg')]: {
      paddingBlock: `calc(${theme.spacing.xl} * 1/2)`,
      paddingInline: `calc(${theme.spacing.xl} * 1/2)`,
      display: 'grid',
      placeItems: 'center',
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  content: {
    maxWidth: rem(980),
    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },
}));

export default function HomePage() {
  const { classes } = useStyles();

  return (
    <Container fluid>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Welcome />
        </div>
        <StageInfo />
      </div>
    </Container>
  );
}
