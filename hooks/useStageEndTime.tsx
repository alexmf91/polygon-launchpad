import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';

type Output = {
  stageEndTime: Date | null;
  loading: boolean;
  error: Error | null;
};

export default function useStageEndTime(
  blockStart: bigint | undefined,
  blockDuration: bigint | undefined
): Output {
  const publicClient = usePublicClient();
  const [stageEndTime, setStageEndTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getStageEntTime = async () => {
    if (blockStart === undefined || blockDuration === undefined) {
      setError(new Error('Input values are undefined'));
      return;
    }

    try {
      setLoading(true);

      const blockInfo = await publicClient.getBlock({
        blockNumber: blockStart,
      });

      const currentStageEndTime = new Date(
        (Number(blockInfo.timestamp) + Number(blockDuration) * 2) * 1000
      );

      setStageEndTime(currentStageEndTime);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStageEntTime();
  }, [blockStart, blockDuration]);

  return { stageEndTime, loading, error };
}
