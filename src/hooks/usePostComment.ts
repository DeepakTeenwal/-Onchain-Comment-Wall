import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { getContractConfig } from '@/lib/contracts';
import type { ChainType } from '@/types';

export function usePostComment(chain: ChainType) {
  const contractConfig = getContractConfig(chain);

  const {
    writeContract,
    data: hash,
    isPending: isWriting,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const postComment = async (message: string, fid: string = '') => {
    try {
      await writeContract({
        ...contractConfig,
        functionName: 'postComment',
        args: [message, fid],
      });
    } catch (err) {
      console.error('Error posting comment:', err);
      throw err;
    }
  };

  return {
    postComment,
    isWriting,
    isConfirming,
    isConfirmed,
    hash,
    error: writeError,
    isPending: isWriting || isConfirming,
  };
}
