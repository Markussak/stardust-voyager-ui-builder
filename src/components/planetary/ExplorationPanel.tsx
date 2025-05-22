
import React from 'react';
import { usePlanetary } from '@/contexts/PlanetaryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlanetaryPOI } from '@/types/planetary';

interface ExplorationPanelProps {
  planetId: string;
  systemId: string;
}

const ExplorationPanel: React.FC<ExplorationPanelProps> = ({ planetId, systemId }) => {
  // This would normally come from the planetary state
  const mockPOIs: PlanetaryPOI[] = [
    {
      poiId: 'ruins1',
      poiType: 'AncientRuins',
      iconAsset_SystemMap: '/assets/images/icons/poi/ruins_ancient_map_icon.png',
      interactionType: 'TextAdventure_ChoiceBased',
      interactionEvent_Or_MiniGame_Key: 'event_ancient_ruins_explore',
      spawnChance: 0.3,
      requiredScanLevel_ToDetect: 2,
      loreEntry_CodexKey: 'codex.ruins.ancient'
    },
    {
      poiId: 'crashed1',
      poiType: 'CrashedShip',
      iconAsset_SystemMap: '/assets/images/icons/poi/crashed_ship_map_icon.png',
      interactionType: 'TextAdventure_ChoiceBased',
      interactionEvent_Or_MiniGame_Key: 'event_crashed_ship_explore',
      spawnChance: 0.2,
      requiredScanLevel_ToDetect: 1,
      loreEntry_CodexKey: 'codex.crashed_ship'
    }
  ];

  const handleExplorePOI = (poi: PlanetaryPOI) => {
    console.log('Exploring POI:', poi);
    // This would trigger the text adventure or mini-game
  };

  return (
    <Card className="bg-space-card border-space-border">
      <CardHeader>
        <CardTitle className="font-pixel text-space-ui-text">Průzkum Planety</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-space-card-dark p-3 rounded-md">
            <h3 className="text-space-ui-text font-medium mb-2">Nalezené Body Zájmu</h3>
            
            {mockPOIs.length > 0 ? (
              <div className="space-y-3">
                {mockPOIs.map(poi => (
                  <div key={poi.poiId} className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-space-card rounded-lg flex items-center justify-center">
                      <img 
                        src={poi.iconAsset_SystemMap || '/placeholder.svg'}
                        alt={poi.poiType}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-space-ui-text">
                        {poi.poiType.replace(/_/g, ' ')}
                      </h4>
                      <p className="text-xs text-space-ui-subtext">
                        Klikněte pro interakci
                      </p>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => handleExplorePOI(poi)}
                      className="bg-space-accent text-black hover:bg-space-accent/80"
                    >
                      Prozkoumat
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-space-ui-subtext py-3 text-center">
                Žádné body zájmu nebyly dosud objeveny.
              </p>
            )}
          </div>
          
          <div className="bg-space-card-dark p-3 rounded-md">
            <h3 className="text-space-ui-text font-medium mb-2">Dostupné Zdroje</h3>
            <p className="text-sm text-space-ui-subtext py-2 text-center">
              Pro detailní sken povrchu je potřeba vyšší úroveň skenovacího modulu.
            </p>
            
            <Button 
              className="w-full mt-2 bg-space-buttons border border-space-buttons-border hover:bg-space-buttons-hover"
            >
              Skenovat Povrch
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExplorationPanel;
