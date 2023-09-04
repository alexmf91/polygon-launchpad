import { BaseError } from 'viem';

export function getContractErrorMessage(error: Error): string {
  if (error instanceof BaseError) {
    return error.shortMessage;
  }
  return error.message;
}

export default async function getEstimatedBlockCountdown(blockNumber: bigint): Promise<number> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_URL}/api?module=block&action=getblockcountdown&blockno=${blockNumber}&apikey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  );

  const { result } = await response.json();

  return result.EstimateTimeInSec;
}
