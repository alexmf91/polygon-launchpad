import getEstimatedBlockCountdown from '@app/utils';
import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';

type Output = {
  stageEndTime: Date | null;
  loading: boolean;
  error: Error | null;
};

export default function useStageEndTime(
  blockStart: bigint | undefined,
  stageBlocks: bigint | undefined
): Output {
  const publicClient = usePublicClient();
  const [stageEndTime, setStageEndTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getStageEndTime = async () => {
    if (blockStart === undefined || stageBlocks === undefined) {
      setError(new Error('Input values are undefined'));
      return;
    }

    try {
      setLoading(true);

      const currentBlock = await publicClient.getBlock();
      const estimatedEndTime = await getEstimatedBlockCountdown(blockStart + stageBlocks);

      const currentStageEndTime = new Date(
        (Number(currentBlock.timestamp) + Number(estimatedEndTime)) * 1000
      );

      setStageEndTime(currentStageEndTime);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStageEndTime();
  }, [blockStart, stageBlocks]);

  return { stageEndTime, loading, error };
}
