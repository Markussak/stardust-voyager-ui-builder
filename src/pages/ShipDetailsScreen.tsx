
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import GameNavigation from '@/components/game/GameNavigation';
import ShipVisualizer from '@/components/ship/ShipVisualizer';
import PlayerShipVisual from '@/components/ship/PlayerShipVisual';
import ShipMovementControls from '@/components/ship/ShipMovementControls';
import { Button } from '@/components/ui/button';
import GameHUD from '@/components/hud/GameHUD';

const ShipDetailsScreen = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative flex flex-col h-screen bg-space-bg overflow-hidden">
      <GameHUD />
      <GameNavigation />
      
      <div className="absolute top-4 left-4 z-20">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-space-dark/80 hover:bg-space-dark text-space-ui-text"
          onClick={() => navigate('/game-menu')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zpět
        </Button>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-[90%] h-[85%] bg-space-dark border border-space-border rounded-lg shadow-xl overflow-hidden">
          <div className="h-full flex flex-col">
            <header className="border-b border-space-border p-4">
              <h1 className="text-xl font-pixel text-space-ui-text">Detaily Lodi</h1>
              <p className="text-sm text-space-ui-subtext">Technické specifikace a aktuální stav</p>
            </header>
            
            <div className="flex flex-grow p-4 overflow-hidden">
              <div className="w-1/2 border-r border-space-border pr-4">
                <div className="h-full flex flex-col">
                  <div className="flex-grow">
                    <PlayerShipVisual />
                  </div>
                  <div className="mt-4">
                    <ShipMovementControls />
                  </div>
                </div>
              </div>
              
              <div className="w-1/2 pl-4 overflow-auto">
                <div className="mb-6">
                  <h2 className="text-lg font-pixel mb-2 text-space-ui-text">Třída Lodi</h2>
                  <ShipVisualizer 
                    shipClassId="solar_confederacy_explorer_ship" 
                    showDetails={true}
                    showStats={true}
                  />
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-pixel mb-2 text-space-ui-text">Status Systémů</h2>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-space-dark/50 p-2 rounded border border-space-border">
                      <div className="text-xs text-space-ui-subtext">Energetické jádro</div>
                      <div className="text-sm text-space-ui-text">98% Funkční</div>
                      <div className="w-full bg-gray-700 h-1 mt-1">
                        <div className="bg-green-500 h-1" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                    <div className="bg-space-dark/50 p-2 rounded border border-space-border">
                      <div className="text-xs text-space-ui-subtext">Navigační systém</div>
                      <div className="text-sm text-space-ui-text">100% Funkční</div>
                      <div className="w-full bg-gray-700 h-1 mt-1">
                        <div className="bg-green-500 h-1" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div className="bg-space-dark/50 p-2 rounded border border-space-border">
                      <div className="text-xs text-space-ui-subtext">Štítový generátor</div>
                      <div className="text-sm text-space-ui-text">85% Funkční</div>
                      <div className="w-full bg-gray-700 h-1 mt-1">
                        <div className="bg-yellow-500 h-1" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="bg-space-dark/50 p-2 rounded border border-space-border">
                      <div className="text-xs text-space-ui-subtext">Zbraňové systémy</div>
                      <div className="text-sm text-space-ui-text">92% Funkční</div>
                      <div className="w-full bg-gray-700 h-1 mt-1">
                        <div className="bg-green-500 h-1" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-pixel mb-2 text-space-ui-text">Palivo a Dosah</h2>
                  <div className="flex items-center mb-2">
                    <div className="w-1/3 text-sm text-space-ui-subtext">Aktuální stav paliva</div>
                    <div className="w-2/3">
                      <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-space-ui-subtext mt-1">
                        <span>72%</span>
                        <span>7,650 LY</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ShipDetailsScreen;
