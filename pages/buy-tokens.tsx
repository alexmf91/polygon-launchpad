import { Container, createStyles, rem } from '@mantine/core';

import dynamic from 'next/dynamic';

const TokenPurchaseForm = dynamic(
  () => import('@app/components/TokenPurchaseForm/TokenPurchaseForm'),
  {
    ssr: false,
  }
);

const useStyles = createStyles(() => ({
  root: {
    display: 'grid',
    gap: 30,
    width: '100%',
    minHeight: '70vh',
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },
}));

export default function BuyTokensPage() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <TokenPurchaseForm />
    </Container>
  );
}
