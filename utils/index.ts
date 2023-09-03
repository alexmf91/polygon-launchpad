import { BaseError } from 'viem';

export function getContractErrorMessage(error: Error): string {
  if (error instanceof BaseError) {
    return error.shortMessage;
  }
  return error.message;
}
