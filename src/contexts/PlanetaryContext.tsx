
import React, { createContext, useContext, useState } from 'react';
import { 
  PlanetaryContextType,
  PlanetaryBaseInstance,
  PlanetaryBaseType,
  PlanetaryBaseModuleType,
  PlanetaryConfig,
  PlanetaryBaseDefinition,
  PlanetaryBaseModuleDefinition,
  PlanetaryResource,
  EnvironmentalHazard,
  SurfaceExplorationEvent,
  PlanetaryPOI
} from '@/types/planetary';
import { toast } from 'sonner';
import { useGameContext } from './GameContext';

// Mock data for development - will be replaced with proper data from APIs or config files
const mockConfig: PlanetaryConfig = {
  baseBuilding_Enabled: true,
  maxPlayerBases_GalaxyWide: 5,
  maxBasesPerPlanet: 1
};

const mockBaseDefinitions: PlanetaryBaseDefinition[] = [
  {
    baseType: PlanetaryBaseType.Research_Outpost,
    baseNameKey: 'base.research_outpost.name',
    defaultBaseName: 'Výzkumná Stanice',
    baseDescriptionKey: 'base.research_outpost.desc',
    defaultDescription: 'Specializovaná základna pro vědecký výzkum planetárních jevů a anomálií.',
    iconAsset_Map: 'assets/images/bases/icons/research_outpost_icon.png',
    buildConditions: {
      allowedPlanetTypes: [
        PlanetaryBaseType.Research_Outpost,
        PlanetaryBaseType.Mining_Facility,
        PlanetaryBaseType.Trade_Depot, 
        PlanetaryBaseType.Military_Stronghold
      ],
      initialResourceCost_ToEstablish: [
        { itemId: 'metal_parts', quantity: 50 },
        { itemId: 'electronics', quantity: 25 }
      ]
    },
    maxModules_Initial: 5,
    availableModules_ByType: [
      PlanetaryBaseModuleType.Power_SolarArray,
      PlanetaryBaseModuleType.Power_GeothermalPlant,
      PlanetaryBaseModuleType.Research_BasicLab,
      PlanetaryBaseModuleType.Research_XenoBiologyLab,
      PlanetaryBaseModuleType.Defense_LightTurret_AntiAir,
      PlanetaryBaseModuleType.Habitation_CrewQuarters_Basic
    ],
    uniqueBonuses: ['+15% k rychlosti výzkumu'],
    visualStyle_Key: 'HiTech_WhiteBlue',
    canBeAttacked: true,
    personalizationOptions: ['Vizuální styl', 'Obranné moduly', 'Výzkumná zaměření']
  }
  // More base types would be defined here
];

const mockModuleDefinitions: PlanetaryBaseModuleDefinition[] = [
  {
    moduleId: PlanetaryBaseModuleType.Power_SolarArray,
    moduleNameKey: 'module.power_solar_array.name',
    defaultModuleName: 'Solární Pole',
    moduleDescriptionKey: 'module.power_solar_array.desc',
    defaultDescription: 'Generuje energii ze slunečního záření. Méně účinné na planetách daleko od hvězdy.',
    iconAsset: 'assets/images/bases/modules/icons/power_solar_array_icon.png',
    constructionCost_Materials: [
      { itemId: 'metal_parts', quantity: 20 },
      { itemId: 'electronics', quantity: 10 }
    ],
    constructionTime_GameHours: 24,
    powerGeneration_MW: 50,
    upkeepCost_CreditsPerDay: 5,
    maxInstances_PerBase: 3,
    visualSprite_OnBaseMap_AssetPath_Template: 'assets/images/bases/modules/power_solar_array_{level}.png',
    upgradeLevels: [
      {
        level: 2,
        upgradeCost_Materials: [
          { itemId: 'metal_parts', quantity: 15 },
          { itemId: 'electronics', quantity: 15 }
        ],
        upgradeTime_GameHours: 12
      }
    ]
  }
  // More module definitions would go here
];

// Create our context with default values
const PlanetaryContext = createContext<PlanetaryContextType | undefined>(undefined);

// Provider component
export const PlanetaryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { gameState, updateGameState } = useGameContext();
  const [config] = useState<PlanetaryConfig>(mockConfig);
  const [baseDefinitions] = useState<PlanetaryBaseDefinition[]>(mockBaseDefinitions);
  const [moduleDefinitions] = useState<PlanetaryBaseModuleDefinition[]>(mockModuleDefinitions);
  const [playerBases, setPlayerBases] = useState<PlanetaryBaseInstance[]>([]);
  const [selectedBase, setSelectedBase] = useState<PlanetaryBaseInstance | null>(null);
  const [planetaryResources] = useState<PlanetaryResource[]>([]);
  const [environmentalHazards] = useState<EnvironmentalHazard[]>([]);
  const [surfaceExplorationEvents] = useState<SurfaceExplorationEvent[]>([]);
  const [planetaryPOIs] = useState<PlanetaryPOI[]>([]);

  // Function to create a new base
  const createNewBase = (baseType: PlanetaryBaseType, planetId: string, systemId: string, name: string) => {
    if (playerBases.length >= config.maxPlayerBases_GalaxyWide) {
      toast.error(`Dosažen maximální počet základen (${config.maxPlayerBases_GalaxyWide}).`);
      return;
    }

    if (playerBases.some(base => base.planetId === planetId)) {
      toast.error("Na této planetě již základnu máte.");
      return;
    }

    // Find the base definition
    const baseDefinition = baseDefinitions.find(def => def.baseType === baseType);
    if (!baseDefinition) {
      toast.error("Typ základny nebyl nalezen.");
      return;
    }

    // Check if player has resources to build the base
    const canAfford = true; // This would be a more complex check in a real implementation
    if (!canAfford) {
      toast.error("Nedostatek zdrojů pro výstavbu základny.");
      return;
    }

    // Create new base
    const newBase: PlanetaryBaseInstance = {
      baseId: `base_${Date.now()}`,
      name: name || baseDefinition.defaultBaseName,
      baseType: baseType,
      planetId,
      systemId,
      modules: [],
      powerBalance: {
        generation: 0,
        consumption: 0
      },
      resources: {
        stored: {},
        production: {},
        consumption: {}
      },
      defenseStrength: 0,
      visualStyle: baseDefinition.visualStyle_Key
    };

    // Add the new base to state
    setPlayerBases(prev => [...prev, newBase]);
    setSelectedBase(newBase);
    
    toast.success(`Základna ${newBase.name} založena!`);
  };

  // Function to construct a new module in a base
  const constructModule = (baseId: string, moduleId: PlanetaryBaseModuleType) => {
    // Find the base
    const baseIndex = playerBases.findIndex(base => base.baseId === baseId);
    if (baseIndex === -1) {
      toast.error("Základna nebyla nalezena.");
      return;
    }

    const base = playerBases[baseIndex];
    
    // Find the module definition
    const moduleDef = moduleDefinitions.find(def => def.moduleId === moduleId);
    if (!moduleDef) {
      toast.error("Typ modulu nebyl nalezen.");
      return;
    }

    // Check if module limit is reached
    if (base.modules.length >= baseDefinitions.find(def => def.baseType === base.baseType)?.maxModules_Initial || 0) {
      toast.error("Maximální počet modulů pro tuto základnu dosažen.");
      return;
    }

    // Check if module instance limit is reached
    const existingModulesCount = base.modules.filter(mod => mod.moduleId === moduleId).length;
    if (moduleDef.maxInstances_PerBase && existingModulesCount >= moduleDef.maxInstances_PerBase) {
      toast.error(`Maximální počet modulů typu ${moduleDef.defaultModuleName} dosažen.`);
      return;
    }

    // Check resources
    const canAfford = true; // This would be a more complex check in a real implementation
    if (!canAfford) {
      toast.error("Nedostatek zdrojů pro výstavbu modulu.");
      return;
    }

    // Create new module instance
    const newModule: PlanetaryBaseModuleInstance = {
      moduleId,
      level: 1,
      health: 100,
      isPowered: true,
      isOperational: false,
      constructionProgress: 0
    };

    // Add the module to the base
    const updatedBases = [...playerBases];
    updatedBases[baseIndex].modules.push(newModule);
    setPlayerBases(updatedBases);
    
    // If this base is selected, update selected base as well
    if (selectedBase && selectedBase.baseId === baseId) {
      setSelectedBase(updatedBases[baseIndex]);
    }
    
    toast.success(`Začala výstavba modulu ${moduleDef.defaultModuleName}.`);
  };

  // Function to upgrade a module
  const upgradeModule = (baseId: string, moduleIndex: number) => {
    const baseIndex = playerBases.findIndex(base => base.baseId === baseId);
    if (baseIndex === -1 || !playerBases[baseIndex].modules[moduleIndex]) {
      toast.error("Modul nebyl nalezen.");
      return;
    }

    const module = playerBases[baseIndex].modules[moduleIndex];
    const moduleDef = moduleDefinitions.find(def => def.moduleId === module.moduleId);
    
    if (!moduleDef || !moduleDef.upgradeLevels || module.level >= moduleDef.upgradeLevels.length + 1) {
      toast.error("Další vylepšení není k dispozici.");
      return;
    }

    // Check resources
    const canAfford = true; // This would be a more complex check
    if (!canAfford) {
      toast.error("Nedostatek zdrojů pro vylepšení modulu.");
      return;
    }

    // Set module to upgrading state
    const updatedBases = [...playerBases];
    updatedBases[baseIndex].modules[moduleIndex].upgradeInProgress = true;
    setPlayerBases(updatedBases);
    
    if (selectedBase && selectedBase.baseId === baseId) {
      setSelectedBase(updatedBases[baseIndex]);
    }
    
    toast.success(`Začalo vylepšování modulu na úroveň ${module.level + 1}.`);
  };

  // Function to demolish a module
  const demolishModule = (baseId: string, moduleIndex: number) => {
    const baseIndex = playerBases.findIndex(base => base.baseId === baseId);
    if (baseIndex === -1 || !playerBases[baseIndex].modules[moduleIndex]) {
      toast.error("Modul nebyl nalezen.");
      return;
    }

    // Remove the module
    const updatedBases = [...playerBases];
    const moduleName = moduleDefinitions.find(def => 
      def.moduleId === updatedBases[baseIndex].modules[moduleIndex].moduleId
    )?.defaultModuleName || "Modul";
    
    updatedBases[baseIndex].modules.splice(moduleIndex, 1);
    setPlayerBases(updatedBases);
    
    if (selectedBase && selectedBase.baseId === baseId) {
      setSelectedBase(updatedBases[baseIndex]);
    }
    
    toast.success(`Modul ${moduleName} byl odstraněn.`);
  };

  // Function to collect resources from a base
  const collectResources = (baseId: string) => {
    // This would collect resources generated by the base
    toast.success("Zdroje shromážděny.");
  };

  // Function to assign crew to a module
  const assignCrew = (baseId: string, moduleIndex: number, crewId: string) => {
    const baseIndex = playerBases.findIndex(base => base.baseId === baseId);
    if (baseIndex === -1 || !playerBases[baseIndex].modules[moduleIndex]) {
      toast.error("Modul nebyl nalezen.");
      return;
    }

    const updatedBases = [...playerBases];
    if (!updatedBases[baseIndex].modules[moduleIndex].assignedCrew) {
      updatedBases[baseIndex].modules[moduleIndex].assignedCrew = [];
    }
    updatedBases[baseIndex].modules[moduleIndex].assignedCrew?.push(crewId);
    setPlayerBases(updatedBases);
    
    if (selectedBase && selectedBase.baseId === baseId) {
      setSelectedBase(updatedBases[baseIndex]);
    }
    
    toast.success("Člen posádky přiřazen k modulu.");
  };

  // Function to unassign crew from a module
  const unassignCrew = (baseId: string, moduleIndex: number, crewId: string) => {
    const baseIndex = playerBases.findIndex(base => base.baseId === baseId);
    if (baseIndex === -1 || 
        !playerBases[baseIndex].modules[moduleIndex] || 
        !playerBases[baseIndex].modules[moduleIndex].assignedCrew) {
      toast.error("Modul nebo člen posádky nebyl nalezen.");
      return;
    }

    const updatedBases = [...playerBases];
    const assignedCrew = updatedBases[baseIndex].modules[moduleIndex].assignedCrew;
    if (assignedCrew) {
      updatedBases[baseIndex].modules[moduleIndex].assignedCrew = assignedCrew.filter(id => id !== crewId);
    }
    setPlayerBases(updatedBases);
    
    if (selectedBase && selectedBase.baseId === baseId) {
      setSelectedBase(updatedBases[baseIndex]);
    }
    
    toast.success("Člen posádky odebrán z modulu.");
  };

  // Create our context value
  const contextValue: PlanetaryContextType = {
    config,
    playerBases,
    baseDefinitions,
    moduleDefinitions,
    selectedBase,
    planetaryResources,
    environmentalHazards,
    surfaceExplorationEvents,
    planetaryPOIs,
    setSelectedBase,
    createNewBase,
    constructModule,
    upgradeModule,
    demolishModule,
    collectResources,
    assignCrew,
    unassignCrew
  };

  return (
    <PlanetaryContext.Provider value={contextValue}>
      {children}
    </PlanetaryContext.Provider>
  );
};

// Custom hook to use the Planetary context
export const usePlanetary = () => {
  const context = useContext(PlanetaryContext);
  if (!context) {
    throw new Error('usePlanetary must be used within a PlanetaryProvider');
  }
  return context;
};
