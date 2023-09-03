import { presaleABI } from '@app/contracts/abis';
import { useStageEndTime } from '@app/hooks';
import { PublicRoutes } from '@app/utils/routes';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { formatEther } from 'viem';
import { useAccount, useContractReads } from 'wagmi';
import ContractResultDisplay from '../ContractResultDisplay/ContractResultDisplay';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import useStyles from './StageInfo.styles';

const presaleContract = {
  address: process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS,
  abi: presaleABI,
};

export default function StageInfo() {
  const { classes } = useStyles();
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useContractReads({
    contracts: [
      { ...presaleContract, functionName: 'currentStage' },
      { ...presaleContract, functionName: 'currentStageBlockStart' },
      { ...presaleContract, functionName: 'currentStageMaxAmount' },
      { ...presaleContract, functionName: 'currentStageAvailableAmount' },
      { ...presaleContract, functionName: 'currentStagePrice' },
      {
        ...presaleContract,
        functionName: 'currentStageSoldAmount',
        ...(address && { args: [address] }),
      },
      {
        ...presaleContract,
        functionName: 'STAGE_BLOCKS_DURATION',
      },
    ],
    watch: true,
  });

  const [
    currentStage,
    currentStageBlockStart,
    currentStageMaxAmount,
    currentStageAvailableAmount,
    currentStagePrice,
    currentStageSoldAmount,
    stageBlocksDuration,
  ] = data || [];

  const { stageEndTime, loading } = useStageEndTime(
    currentStageBlockStart?.result,
    stageBlocksDuration?.result
  );

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Current Stage Info</Title>

      <CountdownTimer endTime={stageEndTime?.getTime()!} loading={isLoading || loading} />

      <Group className={classes.infoContainer}>
        <Group className={classes.textWrapper}>
          <Text className={classes.label}>Token:</Text>
          <Text className={classes.content}>TSTK</Text>
        </Group>

        <ContractResultDisplay label="Stage" result={currentStage} resultHandler={String} />

        <ContractResultDisplay
          label="Block Start"
          result={currentStageBlockStart}
          resultHandler={String}
        />

        <ContractResultDisplay
          label="Max Amount"
          result={currentStageMaxAmount}
          resultHandler={formatEther}
        />

        <ContractResultDisplay
          label="Available Amount"
          result={currentStageAvailableAmount}
          resultHandler={formatEther}
        />

        <ContractResultDisplay
          label="Price"
          result={currentStagePrice}
          resultHandler={formatEther}
          unit="MATIC"
        />

        <ContractResultDisplay
          label="Stage Purchase Amount"
          result={currentStageSoldAmount}
          resultHandler={formatEther}
          needsAccount
          isConnected={isConnected}
        />
      </Group>

      <Button component={Link} href={PublicRoutes.BUY_TOKENS} fullWidth size="md" color="violet">
        Go Buy Now
      </Button>
    </Container>
  );
}
