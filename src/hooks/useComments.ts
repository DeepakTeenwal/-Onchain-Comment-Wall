import { useReadContract } from 'wagmi';
import { celo, arbitrum } from 'wagmi/chains';
import { getContractConfig } from '@/lib/contracts';
import type { ChainType, Comment, WallComment } from '@/types';

export function useComments(chain: ChainType, count: number = 50) {
  const chainId = chain === 'celo' ? celo.id : arbitrum.id;
  const contractConfig = getContractConfig(chain);

  const { data, isLoading, error, refetch } = useReadContract({
    ...contractConfig,
    functionName: 'getRecentComments',
    args: [BigInt(count)],
    chainId,
  });

  const comments: WallComment[] = data
    ? (data as Comment[]).map((comment, index) => ({
        id: `${chain}-${index}`,
        user: comment.user,
        message: comment.message,
        fid: comment.fid,
        timestamp: Number(comment.timestamp),
        likes: Number(comment.likes),
        chain,
      }))
    : [];

  return {
    comments,
    isLoading,
    error,
    refetch,
  };
}

export function useAllComments(count: number = 50) {
  const celoComments = useComments('celo', count);
  const arbitrumComments = useComments('arbitrum', count);

  const allComments = [
    ...celoComments.comments,
    ...arbitrumComments.comments,
  ].sort((a, b) => b.timestamp - a.timestamp);

  const isLoading = celoComments.isLoading || arbitrumComments.isLoading;
  const error = celoComments.error || arbitrumComments.error;

  const refetch = async () => {
    await Promise.all([celoComments.refetch(), arbitrumComments.refetch()]);
  };

  return {
    comments: allComments,
    celoComments: celoComments.comments,
    arbitrumComments: arbitrumComments.comments,
    isLoading,
    error,
    refetch,
  };
}
