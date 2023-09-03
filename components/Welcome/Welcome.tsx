import { Container, Text, Title } from '@mantine/core';
import useStyles from './Welcome.styles';

export default function Welcome() {
  const { classes } = useStyles();

  return (
    <Container fluid py={100}>
      <Title className={classes.title}>
        Welcome to <br />
        <Text
          inherit
          component="span"
          variant="gradient"
          gradient={{ from: 'grape', to: 'violet', deg: 45 }}
        >
          Polygon Launchpad
        </Text>
      </Title>

      <Text color="dimmed" className={classes.subtitle}>
        Discover and participate in the most promising token presales on the Polygon network.
        Let&apos;s build the future of crypto together.
      </Text>
    </Container>
  );
}
