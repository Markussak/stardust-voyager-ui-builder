
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GameHUD from '@/components/hud/GameHUD';
import GameNavigation from '@/components/game/GameNavigation';
import { useNexus } from '@/contexts/NexusContext';
import NexusFragmentDisplay from '@/components/nexus/NexusFragmentDisplay';
import NexusAbilityPanel from '@/components/nexus/NexusAbilityPanel';
import { NexusFragmentId } from '@/types/nexus';
import { nexusFragments } from '@/data/nexusFragments';

const NexusScreen = () => {
  const navigate = useNavigate();
  const { 
    discoveredFragments, 
    currentStoryPhase, 
    viewNexusLore, 
    unlockFragment,
    playerChoices 
  } = useNexus();
  
  const handleViewLore = (fragmentId: NexusFragmentId) => {
    viewNexusLore(fragmentId);
  };
  
  // For demo, allow unlocking fragments directly
  const handleUnlockDemo = (fragmentId: NexusFragmentId) => {
    unlockFragment(fragmentId);
  };

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
              <h1 className="text-xl font-pixel text-space-ui-text">Nexus - Odkaz Prastarých</h1>
              <p className="text-sm text-space-ui-subtext">
                {currentStoryPhase?.defaultPhaseName || "Objevte fragmenty tajemného artefaktu Nexus a odhalte jeho původ"}
              </p>
            </header>
            
            <Tabs defaultValue="fragments" className="flex-grow flex flex-col">
              <div className="border-b border-space-border">
                <TabsList className="p-1">
                  <TabsTrigger value="fragments">Fragmenty</TabsTrigger>
                  <TabsTrigger value="story">Příběh</TabsTrigger>
                  <TabsTrigger value="abilities">Schopnosti</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="fragments" className="flex-grow p-4 overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {nexusFragments.map(fragment => {
                    const isDiscovered = discoveredFragments.some(f => f.fragmentId === fragment.fragmentId);
                    return (
                      <NexusFragmentDisplay 
                        key={fragment.fragmentId}
                        fragment={fragment}
                        discovered={isDiscovered}
                        onClick={() => isDiscovered ? handleViewLore(fragment.fragmentId) : handleUnlockDemo(fragment.fragmentId)}
                        showDetails={true}
                      />
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="story" className="flex-grow p-4 overflow-auto">
                {currentStoryPhase ? (
                  <div>
                    <h2 className="text-lg font-pixel text-space-ui-text mb-2">
                      {currentStoryPhase.defaultPhaseName}
                    </h2>
                    
                    <p className="text-space-ui-subtext mb-4">
                      {currentStoryPhase.defaultDescription}
                    </p>
                    
                    <h3 className="text-md font-pixel text-space-ui-text mt-6 mb-2">Klíčové mise</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentStoryPhase.keyMissions_Ids.map(missionId => (
                        <div key={missionId} className="bg-space-dark/50 border border-space-border p-3 rounded">
                          <div className="font-pixel text-sm text-space-ui-text">{missionId}</div>
                          <div className="text-xs text-space-ui-subtext mt-1">
                            Status: <span className="text-yellow-400">V Průběhu</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-md font-pixel text-space-ui-text mt-6 mb-2">Zapojené frakce</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Object.entries(currentStoryPhase.factionInvolvement_Summary).map(([factionId, description]) => (
                        <div key={factionId} className="bg-space-dark/50 border border-space-border p-3 rounded">
                          <div className="font-pixel text-sm text-space-ui-text">{factionId}</div>
                          <div className="text-xs text-space-ui-subtext mt-1">{description}</div>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-md font-pixel text-space-ui-text mt-6 mb-2">Klíčové volby</h3>
                    {currentStoryPhase.keyEvents_Or_Choices.map(choice => {
                      const hasMade = playerChoices[choice.eventId_Or_ChoiceId];
                      return (
                        <div key={choice.eventId_Or_ChoiceId} className="bg-space-dark/50 border border-space-border p-3 rounded mb-3">
                          <div className="font-pixel text-sm text-space-ui-text">{choice.defaultDescription}</div>
                          <div className="text-xs text-space-ui-subtext mt-1">
                            Dopad: {choice.impact_OnStoryProgression}
                          </div>
                          {hasMade ? (
                            <div className="mt-2 text-xs text-green-400">
                              Volba učiněna
                            </div>
                          ) : (
                            <Button size="sm" variant="default" className="mt-2">
                              Učinit volbu
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-space-ui-subtext">
                      Příběhová linie Nexusu ještě nezačala.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="abilities" className="flex-grow p-4 overflow-auto">
                <div className="max-w-3xl mx-auto">
                  <NexusAbilityPanel />
                  
                  {discoveredFragments.length === 0 && (
                    <div className="mt-6 p-4 border border-space-border rounded bg-space-dark/30">
                      <h3 className="text-md font-pixel text-space-ui-text mb-2">Žádné schopnosti Nexusu</h3>
                      <p className="text-space-ui-subtext text-sm">
                        Zatím jste neobjevili žádný fragment Nexusu. Pokračujte v hlavní příběhové linii pro odhalení prvního fragmentu.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NexusScreen;
