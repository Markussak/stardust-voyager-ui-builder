
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GameNavigation from '@/components/game/GameNavigation';
import GameHUD from '@/components/hud/GameHUD';
import { CrewProvider } from '@/contexts/CrewContext';
import CrewList from '@/components/crew/CrewList';
import CrewDetail from '@/components/crew/CrewDetail';
import ShipStationAssignment from '@/components/crew/ShipStationAssignment';
import RecruitmentPanel from '@/components/crew/RecruitmentPanel';
import { useGameContext } from '@/contexts/GameContext';

export default function CrewManagementScreen() {
  const { gameState } = useGameContext();
  const isAtStation = gameState.player?.location?.type === 'station'; // Check if player is at a station
  
  return (
    <div className="relative flex flex-col h-screen bg-space-bg overflow-hidden">
      <GameHUD />
      <GameNavigation />
      
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-[90%] h-[85%] bg-space-dark border border-space-border rounded-lg shadow-xl overflow-hidden">
          <div className="h-full flex flex-col">
            <header className="border-b border-space-border p-4">
              <h1 className="text-xl font-pixel text-space-ui-text">Správa posádky</h1>
              <p className="text-sm text-space-ui-subtext">Přehled, správa a nábor členů posádky</p>
            </header>
            
            <CrewProvider>
              <div className="flex flex-grow overflow-hidden">
                <div className="w-1/4 border-r border-space-border overflow-hidden flex flex-col p-3">
                  <CrewList />
                </div>
                
                <div className="w-3/4 overflow-hidden">
                  <Tabs defaultValue="details" className="h-full">
                    <div className="p-3 border-b border-space-border">
                      <TabsList className="bg-space-card-dark">
                        <TabsTrigger value="details">Detaily</TabsTrigger>
                        <TabsTrigger value="stations">Stanoviště lodi</TabsTrigger>
                        {isAtStation && <TabsTrigger value="recruitment">Nábor</TabsTrigger>}
                      </TabsList>
                    </div>
                    
                    <div className="p-3 h-[calc(100%-60px)] overflow-auto">
                      <TabsContent value="details" className="h-full mt-0">
                        <CrewDetail />
                      </TabsContent>
                      
                      <TabsContent value="stations" className="h-full mt-0">
                        <ShipStationAssignment />
                      </TabsContent>
                      
                      {isAtStation && (
                        <TabsContent value="recruitment" className="h-full mt-0">
                          <RecruitmentPanel />
                        </TabsContent>
                      )}
                    </div>
                  </Tabs>
                </div>
              </div>
            </CrewProvider>
          </div>
        </Card>
      </div>
    </div>
  );
}
