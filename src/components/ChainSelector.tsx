'use client';

import { CHAIN_CONFIGS, type ChainType } from '@/types';

interface ChainSelectorProps {
  selectedChain: ChainType;
  onChainChange: (chain: ChainType) => void;
}

export function ChainSelector({ selectedChain, onChainChange }: ChainSelectorProps) {
  const chains: ChainType[] = ['celo', 'arbitrum'];

  return (
    <div className="flex gap-3">
      {chains.map((chain) => {
        const config = CHAIN_CONFIGS[chain];
        const isSelected = selectedChain === chain;

        return (
          <button
            key={chain}
            type="button"
            onClick={() => onChainChange(chain)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all
              ${isSelected
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
          >
            <span className="text-2xl">{config.icon}</span>
            <div className="text-left">
              <div className="font-medium text-gray-900">{config.chainName}</div>
              <div className="text-xs text-gray-500">Low fees</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
