
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceBackground from '@/components/game/SpaceBackground';
import CockpitOverlay from '@/components/game/CockpitOverlay';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PlayerTradeInventory from '@/components/trade/PlayerTradeInventory';
import TraderInventory from '@/components/trade/TraderInventory';
import TransactionPanel from '@/components/trade/TransactionPanel';
import MarketInfoPanel from '@/components/trade/MarketInfoPanel';
import PlayerWalletDisplay from '@/components/trade/PlayerWalletDisplay';
import { TradeProvider } from '@/contexts/TradeContext';

const TradeScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/galaxy-map');
  };
  
  return (
    <TradeProvider>
      <div className="h-screen w-screen overflow-hidden bg-space-dark relative text-space-ui-text">
        {/* Background */}
        <SpaceBackground />
        
        {/* Cockpit overlay */}
        <CockpitOverlay />
        
        {/* Trade UI */}
        <div className="relative z-20 flex flex-col h-full w-full p-4">
          {/* Top navigation and header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleBack}
                className="mr-4 border-space-buttons-border hover:bg-space-buttons-hover"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-2xl font-pixel text-space-ui-text">Galaktický Obchod - Stanice Minerva</h1>
            </div>
            <PlayerWalletDisplay />
          </div>
          
          {/* Main content area */}
          <div className="grid grid-cols-3 gap-4 flex-1">
            {/* Player inventory */}
            <PlayerTradeInventory />
            
            {/* Transaction panel */}
            <TransactionPanel />
            
            {/* Trader inventory */}
            <TraderInventory />
          </div>
          
          {/* Market info panel at the bottom */}
          <div className="mt-4">
            <MarketInfoPanel />
          </div>
        </div>
      </div>
    </TradeProvider>
  );
};

export default TradeScreen;
