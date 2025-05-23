
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../components/game/MenuButton';
import VersionInfo from '../components/game/VersionInfo';
import SpaceBackground from '../components/game/SpaceBackground';
import { shipClasses } from '../data/shipClasses';
import ShipTypeSelector from '@/components/ship/ShipTypeSelector';
import { PlayerShipConfig_Nomad, ShipClassDefinition } from '@/types/ships-extended';
import CockpitOverlay from '@/components/game/CockpitOverlay';
import { Button } from '@/components/ui/button';
import ShipVisualizer from '@/components/ship/ShipVisualizer';
import { alienShipClasses, getAlienShipById } from '@/data/alienShips';
import AlienPortraitDisplay from '@/components/aliens/AlienPortraitDisplay';
import { getAlienRaceById } from '@/data/alienRaces';

// Function to convert a ship class to a player ship configuration
const convertShipClassToConfig = (shipClass: ShipClassDefinition): PlayerShipConfig_Nomad => {
  // Use the first predefined model if available, otherwise use defaults
  const predefinedModel = shipClass.predefinedModels?.[0];
  
  return {
    id: predefinedModel?.modelId || shipClass.classId,
    className: predefinedModel?.defaultModelName || shipClass.defaultClassName,
    role: shipClass.defaultRoleDescription,
    appearancePhilosophy: shipClass.visualDesignCues.join(". "),
    dimensionsPx: {
      width: shipClass.pixelSize_ApproxRange_Px.x,
      length: shipClass.pixelSize_ApproxRange_Px.y
    },
    baseSpriteAsset: predefinedModel?.specificSpriteAsset || 
                     shipClass.baseSprite_AssetPath_Template.replace('{variant}', '1'),
    visualDetails: {
      hull: {
        primaryMaterial: "Slitiny titanu a oceli s kompozitními prvky",
        baseColorPalette: {
          primary: "#336699",
          panelVariants: ["#2d5b88", "#306090", "#4073aa", "#386898"],
          accentPiping: "#B0B0B0",
          accentLights: "#FFAA00"
        },
        panelingDescription: "Povrch lodi je složen z desítek viditelných panelů různých geometrických tvarů."
      }
    },
    functionalStats: {
      mobility: {
        turnRate_degPerSec: Math.floor((shipClass.baseStats.turnRate_DegPerSec_Range[0] + shipClass.baseStats.turnRate_DegPerSec_Range[1]) / 2),
        maxSpeed_unitsPerSec: Math.floor((shipClass.baseStats.maxSpeed_UnitsPerSec_Range[0] + shipClass.baseStats.maxSpeed_UnitsPerSec_Range[1]) / 2),
        acceleration_unitsPerSec2: Math.floor((shipClass.baseStats.acceleration_UnitsPerSec2_Range[0] + shipClass.baseStats.acceleration_UnitsPerSec2_Range[1]) / 2),
        strafeSpeedFactor: 0.5
      },
      hullPoints_Base: Math.floor((shipClass.baseStats.hullPoints_Range[0] + shipClass.baseStats.hullPoints_Range[1]) / 2),
      shieldPoints_Base: Math.floor((shipClass.baseStats.shieldPoints_Base_Range[0] + shipClass.baseStats.shieldPoints_Base_Range[1]) / 2),
      shieldRegenRate_PerSec_Base: 2,
      sensorRange_Base_Units: Math.floor((shipClass.baseStats.sensorRange_Units_Range[0] + shipClass.baseStats.sensorRange_Units_Range[1]) / 2),
      cargoCapacity_BaseUnits: Math.floor((shipClass.baseStats.cargoCapacity_Units_Range[0] + shipClass.baseStats.cargoCapacity_Units_Range[1]) / 2),
    },
    internalLayout_Conceptual: [
      `Kokpit: ${shipClass.baseStats.crewCapacity_MinMax[0]} až ${shipClass.baseStats.crewCapacity_MinMax[1]} míst`,
      "Obytná sekce: Kajuty pro posádku, společenský prostor",
      "Technická místnost: Přístup k motorům a systémům podpory života",
      "Nákladový prostor: Pro základní vybavení a náklad",
      "Místnost pro moduly: Prostor pro instalaci a údržbu vylepšení"
    ],
    loreEntry: {
      title: shipClass.defaultClassName,
      entryText: shipClass.defaultRoleDescription,
      originStoryHint: "Tento model má dlouhou historii služby v různých částech galaxie."
    },
    galaxyMapIcon: {
      assetUrl: "/assets/ships/nomad_map_icon.png",  // Default map icon
      sizePx: { width: 8, length: 16 }
    }
  };
};

// Check if a ship is an alien ship
const isAlienShip = (shipClassId: string): boolean => {
  return alienShipClasses.some(ship => ship.classId === shipClassId);
};

// Get the alien race ID for a ship
const getAlienRaceForShip = (shipClassId: string): string | null => {
  if (!isAlienShip(shipClassId)) return null;
  
  // Extract race ID from ship class ID (e.g., "sylvan_seedling_fighter" -> "sylvans_flora_based")
  const prefix = shipClassId.split('_')[0];
  
  if (prefix === 'sylvan') return 'sylvans_flora_based';
  if (prefix === 'shard') return 'shard_collective_crystalline';
  if (prefix === 'krall') return 'krall_hegemony_insectoid';
  
  return null;
};

const ShipDetailsScreen = () => {
  const navigate = useNavigate();
  const [selectedShipClassId, setSelectedShipClassId] = useState<string>("explorer_scout_nomad");
  const [shipConfig, setShipConfig] = useState<PlayerShipConfig_Nomad | null>(null);
  const [showSelector, setShowSelector] = useState<boolean>(true);
  const [alienRaceId, setAlienRaceId] = useState<string | null>(null);

  // Find the selected ship class and convert to ship configuration
  useEffect(() => {
    let selectedClass = shipClasses.find(ship => ship.classId === selectedShipClassId);
    
    // If not found in regular ships, check alien ships
    if (!selectedClass) {
      selectedClass = getAlienShipById(selectedShipClassId);
    }
    
    if (selectedClass) {
      setShipConfig(convertShipClassToConfig(selectedClass));
      
      // Check if it's an alien ship and set the race ID
      const raceId = getAlienRaceForShip(selectedShipClassId);
      setAlienRaceId(raceId);
    }
  }, [selectedShipClassId]);

  if (!shipConfig) {
    return <div className="flex items-center justify-center h-screen">Načítání...</div>;
  }
  
  return (
    <div className="h-screen w-screen overflow-hidden bg-space-dark text-space-ui-text font-pixel-mono relative">
      <SpaceBackground />
      <CockpitOverlay />
      
      <div className="absolute top-4 left-4 z-10">
        <MenuButton 
          text="ZPĚT NA MAPU" 
          onClick={() => navigate('/galaxy-map')}
          className="w-48"
        />
      </div>

      <div className="flex h-full p-4 z-10 relative">
        {/* Ship visualization */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center">
          <div className="relative mb-4 flex items-center justify-center">
            {/* Use ShipVisualizer component with fallback logic */}
            <ShipVisualizer 
              shipClassId={selectedShipClassId} 
              size="lg" 
              showDetails={false} 
            />
            
            {/* If it's an alien ship, show the alien race portrait */}
            {alienRaceId && (
              <div className="absolute top-2 right-2">
                <AlienPortraitDisplay 
                  raceId={alienRaceId}
                  size="sm"
                  showName={false}
                />
              </div>
            )}
          </div>
          
          <Button
            onClick={() => setShowSelector(!showSelector)}
            variant="outline"
            className="border border-space-buttons-border hover:bg-space-buttons-hover text-space-ui-text mt-4"
          >
            {showSelector ? "Skrýt výběr lodí" : "Zobrazit výběr lodí"}
          </Button>
        </div>
        
        {/* Ship details or selector */}
        <div className="w-1/2 h-full p-8 overflow-y-auto">
          {showSelector ? (
            <div className="bg-space-dark bg-opacity-80 rounded-lg border border-space-buttons-border p-4 h-full">
              <h2 className="text-xl mb-4 text-space-ui-text font-bold">Výběr typu lodi</h2>
              <ShipTypeSelector 
                onSelectShip={setSelectedShipClassId}
                currentShipClassId={selectedShipClassId}
                includeAlienShips={true}
              />
            </div>
          ) : (
            <>
              <h1 className="text-2xl mb-6 text-space-buttons-glow font-bold">
                {shipConfig.className}
                {alienRaceId && (
                  <span className="ml-3 text-sm px-2 py-0.5 bg-purple-800 rounded-full">
                    Mimozemská loď
                  </span>
                )}
              </h1>
              
              {/* If it's an alien ship, show info about the alien race */}
              {alienRaceId && (
                <div className="mb-6 bg-space-dark bg-opacity-50 p-4 rounded-lg border border-purple-900">
                  <div className="flex items-center gap-4 mb-3">
                    <AlienPortraitDisplay raceId={alienRaceId} size="sm" />
                    <div>
                      <h3 className="text-lg font-bold text-space-ui-text">
                        {getAlienRaceById(alienRaceId)?.raceName || 'Neznámá rasa'}
                      </h3>
                      <p className="text-xs text-space-ui-subtext">
                        {getAlienRaceById(alienRaceId)?.aiBehavior.diplomaticProfile.baseEthos.split('_').join(' ')}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm italic text-space-ui-subtext">
                    {getAlienRaceById(alienRaceId)?.techAndStyle.shipDesignLanguage.split('_').join(' ')}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl mb-2 border-b border-space-buttons-border">Technické specifikace</h2>
                <ul className="space-y-2">
                  <li>Manévrovatelnost: {shipConfig.functionalStats.mobility.turnRate_degPerSec}°/s</li>
                  <li>Max. rychlost: {shipConfig.functionalStats.mobility.maxSpeed_unitsPerSec} j/s</li>
                  <li>Zrychlení: {shipConfig.functionalStats.mobility.acceleration_unitsPerSec2} j/s²</li>
                  <li>Integrita trupu: {shipConfig.functionalStats.hullPoints_Base}</li>
                  <li>Štíty: {shipConfig.functionalStats.shieldPoints_Base} (regenerace {shipConfig.functionalStats.shieldRegenRate_PerSec_Base}/s)</li>
                  <li>Nákladový prostor: {shipConfig.functionalStats.cargoCapacity_BaseUnits} jednotek</li>
                  <li>Dosah senzorů: {shipConfig.functionalStats.sensorRange_Base_Units} jednotek</li>
                </ul>
              </div>
              
              {/* For alien ships, show special section about their technology */}
              {alienRaceId && getAlienRaceById(alienRaceId) && (
                <div className="mb-6">
                  <h2 className="text-xl mb-2 border-b border-space-buttons-border">Mimozemská technologie</h2>
                  <ul className="space-y-2">
                    <li><span className="text-purple-400">Tech úroveň:</span> {getAlienRaceById(alienRaceId)?.techAndStyle.overallTechLevel.split('_').join(' ')}</li>
                    <li>
                      <span className="text-purple-400">Preferované zbraně:</span> {' '}
                      {getAlienRaceById(alienRaceId)?.techAndStyle.preferredWeaponTypes?.slice(0, 2).join(', ')}
                    </li>
                    <li>
                      <span className="text-purple-400">Preferovaná obrana:</span> {' '} 
                      {getAlienRaceById(alienRaceId)?.techAndStyle.preferredDefenseTypes?.slice(0, 1).join(', ')}
                    </li>
                  </ul>
                </div>
              )}
              
              <div className="mb-6">
                <h2 className="text-xl mb-2 border-b border-space-buttons-border">Vnitřní uspořádání</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {shipConfig.internalLayout_Conceptual.map((section, index) => (
                    <li key={index}>{section}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl mb-2 border-b border-space-buttons-border">Designové prvky</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {(shipClasses.find(ship => ship.classId === selectedShipClassId) || 
                   alienShipClasses.find(ship => ship.classId === selectedShipClassId))?.visualDesignCues.map((cue, index) => (
                    <li key={index}>{cue}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl mb-2 border-b border-space-buttons-border">Historie</h2>
                <p className="mb-3">{shipConfig.loreEntry.entryText}</p>
                <p className="italic text-space-ui-subtext">{shipConfig.loreEntry.originStoryHint}</p>
              </div>
            </>
          )}
        </div>
      </div>
      
      <VersionInfo />
    </div>
  );
};

export default ShipDetailsScreen;
