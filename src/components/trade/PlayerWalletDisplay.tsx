
import React from 'react';
import { useTrade } from '@/contexts/TradeContext';

const PlayerWalletDisplay: React.FC = () => {
  const { tradeState } = useTrade();
  
  return (
    <div className="flex items-center justify-end bg-space-dark/70 border border-space-buttons-border rounded-md py-1 px-3">
      <div className="flex items-center">
        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-2 text-black font-bold text-xs">
          Cr
        </div>
        <span className="text-space-ui-text font-pixel text-lg">
          {tradeState.playerCredits.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PlayerWalletDisplay;
