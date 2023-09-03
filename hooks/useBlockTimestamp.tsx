import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';

type Output = {
  timestamp: number | null;
  loading: boolean;
  error: Error | null;
};

export default function useBlockTimestamp(blockNumber: bigint): Output {
  const publicClient = usePublicClient();
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (blockNumber) {
      (async () => {
        try {
          setLoading(true);
          const blockInfo = await publicClient.getBlock({ blockNumber });
          setTimestamp(Number(blockInfo.timestamp));
        } catch (err) {
          setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [blockNumber]);

  return { timestamp, loading, error };
}
