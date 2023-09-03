import { useCountdown } from '@app/hooks';
import { Group, Skeleton, Stack, Text } from '@mantine/core';
import useStyles from './CountdownTimer.styles';

type CountdownTimerProps = {
  endTime: number;
  loading?: boolean;
};

export default function CountdownTimer({ endTime, loading }: CountdownTimerProps) {
  const { classes } = useStyles();

  const { hours, minutes, seconds } = useCountdown(endTime);

  return (
    <Group className={classes.wrapper}>
      {loading ? (
        <>
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
        </>
      ) : (
        <>
          <Stack align="center" spacing="xs" className={classes.item}>
            <Text>{hours}</Text>
            <Text size="xs">HOURS</Text>
          </Stack>
          <Stack align="center" spacing="xs" className={classes.item}>
            <Text>{minutes}</Text>
            <Text size="xs">MINUTES</Text>
          </Stack>
          <Stack align="center" spacing="xs" className={classes.item}>
            <Text>{seconds}</Text>
            <Text size="xs">SECONDS</Text>
          </Stack>
        </>
      )}
    </Group>
  );
}
