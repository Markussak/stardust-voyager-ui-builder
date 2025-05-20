
import React from 'react';
import GameNavigation from '@/components/game/GameNavigation';
import { MissionsProvider } from '@/contexts/MissionsContext';
import MissionList from '@/components/missions/MissionList';
import MissionDetails from '@/components/missions/MissionDetails';
import MissionFilters from '@/components/missions/MissionFilters';
import { Card } from '@/components/ui/card';
import GameHUD from '@/components/hud/GameHUD';

const MissionLogScreen: React.FC = () => {
  return (
    <div className="relative flex flex-col h-screen bg-space-bg overflow-hidden">
      <GameHUD />
      <GameNavigation />
      
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-[90%] h-[85%] bg-space-dark border border-space-border rounded-lg shadow-xl overflow-hidden">
          <div className="h-full flex flex-col">
            <header className="border-b border-space-border p-4">
              <h1 className="text-xl font-pixel text-space-ui-text">Misijní Log</h1>
              <p className="text-sm text-space-ui-subtext">Přehled aktivních a dokončených misí</p>
            </header>
            
            <MissionsProvider>
              <div className="flex flex-grow overflow-hidden">
                <div className="w-1/3 border-r border-space-border overflow-hidden flex flex-col">
                  <MissionFilters />
                  <div className="flex-grow overflow-auto p-3">
                    <MissionList />
                  </div>
                </div>
                
                <div className="w-2/3 overflow-hidden">
                  <MissionDetails />
                </div>
              </div>
            </MissionsProvider>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MissionLogScreen;
