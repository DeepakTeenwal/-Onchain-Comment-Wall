import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { celo, arbitrum } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Onchain Comment Wall',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains: [celo, arbitrum],
  ssr: true,
});
