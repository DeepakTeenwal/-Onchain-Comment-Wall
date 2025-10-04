export type ChainType = 'celo' | 'arbitrum';

export interface Comment {
  id: bigint;
  user: string;
  message: string;
  fid: string;
  timestamp: bigint;
  likes: bigint;
  chain: ChainType;
  txHash?: string;
}

export interface WallComment extends Omit<Comment, 'id' | 'timestamp' | 'likes'> {
  id: string;
  timestamp: number;
  likes: number;
}

export interface UserStats {
  totalMessages: number;
  totalLikes: number;
  chainsUsed: ChainType[];
  firstMessageDate: number;
}

export interface FarcasterUser {
  fid: string;
  username: string;
  displayName: string;
  pfpUrl: string;
  bio?: string;
}

export interface ContractConfig {
  address: `0x${string}`;
  chainId: number;
  chainName: string;
  rpcUrl: string;
  blockExplorer: string;
  icon: string;
}

export const CHAIN_CONFIGS: Record<ChainType, ContractConfig> = {
  celo: {
    address: (process.env.NEXT_PUBLIC_CELO_CONTRACT_ADDRESS as `0x${string}`) || '0x',
    chainId: 42220,
    chainName: 'Celo',
    rpcUrl: 'https://forno.celo.org',
    blockExplorer: 'https://celoscan.io',
    icon: '🌱',
  },
  arbitrum: {
    address: (process.env.NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS as `0x${string}`) || '0x',
    chainId: 42161,
    chainName: 'Arbitrum',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    icon: '🦄',
  },
};
