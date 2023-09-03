import { Alert, Group, Skeleton, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { formatEther, stringify } from 'viem';
import useStyles from './ContractResultDisplay.styles';

type ContractReadResult =
  | {
      error: Error;
      result?: undefined;
      status: 'failure';
    }
  | {
      error?: undefined;
      result: bigint;
      status: 'success';
    }
  | undefined;

type ResultDisplayProps = {
  label: string;
  result: ContractReadResult;
  resultHandler: typeof formatEther | typeof stringify | typeof String;
  needsAccount?: boolean;
  isConnected?: boolean;
  unit?: string;
};

export default function ContractResultDisplay({
  label,
  result,
  resultHandler,
  needsAccount,
  isConnected,
  unit,
}: ResultDisplayProps) {
  const { classes } = useStyles();

  const renderResultContent = () => {
    if (needsAccount && !isConnected) {
      return (
        <Alert color="blue" icon={<IconAlertCircle />}>
          Connect your account to see these details
        </Alert>
      );
    }

    if (result?.status === 'success') {
      return (
        <Text component="span" className={classes.content}>
          {resultHandler(result.result)} {unit}
        </Text>
      );
    }

    if (result?.status === 'failure') {
      return (
        <Alert color="red" icon={<IconAlertCircle />}>
          {result.error.message}
        </Alert>
      );
    }

    return <Skeleton height={16} width={100} radius="sm" my={5} />;
  };

  return (
    <Group className={classes.wrapper}>
      <Text className={classes.label}>{label}:</Text>
      {renderResultContent()}
    </Group>
  );
}
