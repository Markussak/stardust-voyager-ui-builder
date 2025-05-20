
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShipMovementProvider } from '@/contexts/ShipMovementContext';
import StarSystemBackground from '@/components/ship/StarSystemBackground';
import PlayerShipVisual from '@/components/ship/PlayerShipVisual';
import ShipMovementControls from '@/components/ship/ShipMovementControls';
import GameHUD from '@/components/hud/GameHUD';
import { LogOut } from 'lucide-react';

const ShipTestContent: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <StarSystemBackground />
      <PlayerShipVisual />
      <ShipMovementControls />
      <GameHUD />
      
      <div className="fixed top-4 left-4 z-30">
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => navigate('/')}
        >
          <LogOut className="h-4 w-4 mr-1" />
          Exit Test
        </Button>
      </div>
      
      <div className="fixed top-4 right-4 z-30 bg-black/50 p-2 rounded text-xs text-white">
        <p>Ship Movement Test</p>
      </div>
    </div>
  );
};

const ShipTestScreen: React.FC = () => {
  return (
    <ShipMovementProvider>
      <ShipTestContent />
    </ShipMovementProvider>
  );
};

export default ShipTestScreen;
