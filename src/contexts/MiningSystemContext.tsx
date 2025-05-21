
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  MinableResourceData, 
  MiningSystemConfig,
  MiningToolTypeDefinition,
  ResourceCategory,
  MiningTargetType
} from '@/types/mining';

interface MiningSystemContextType {
  activeTool: string | null;
  isActivelyMining: boolean;
  targetResourceId: string | null;
  miningProgress: number; // 0-1
  setActiveTool: (toolId: string | null) => void;
  startMining: (targetId: string) => void;
  stopMining: () => void;
  getMiningToolById: (toolId: string) => MiningToolTypeDefinition | null;
  getResourceById: (resourceId: string) => MinableResourceData | null;
  availableResources: Record<string, MinableResourceData>;
}

const MiningSystemContext = createContext<MiningSystemContextType | undefined>(undefined);

export const MiningSystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isActivelyMining, setIsActivelyMining] = useState(false);
  const [targetResourceId, setTargetResourceId] = useState<string | null>(null);
  const [miningProgress, setMiningProgress] = useState(0);
  const [miningInterval, setMiningInterval] = useState<NodeJS.Timeout | null>(null);

  // Mock mining tools data - in a real implementation, this would be loaded from a config file
  const miningTools: MiningToolTypeDefinition[] = [
    {
      toolModuleId_Base: "mining_laser_mk1",
      targetResourceType: "Solid_Asteroid" as MiningTargetType,
      baseMiningRate_UnitsPerSec: 1,
      powerConsumption_MW_PerSec: 5,
      effectiveRange_Units: 50,
      beamOrCollector_VisualEffect: {
        beamColorPalette: { core: "#FF8C00", glow: "#FFA50060" },
        beamThicknessPx_Range: [2, 4],
        beamTextureStyle: "Pulsating_Wave" as const,
        beamAnimation_Active: { frameCount: 8, speed: 10, loop: true },
        impactEffect_OnTarget: {
          animation_SparksAndDebris: { frameCount: 16, speed: 15, loop: true },
          glowEffect_Hotspot: { color: "#FF4500", radiusPx: 10, intensityAnimation: { frameCount: 4, speed: 5, loop: true } },
          soundEffect_Impact_Loop: "sfx/mining/laser_impact_rock_loop.wav"
        }
      },
      beamOrCollector_SoundEffect_Loop: "sfx/mining/laser_fire_loop_mk1.wav",
      upgradeTiers: []
    },
    {
      toolModuleId_Base: "gas_collector_basic",
      targetResourceType: "Gas_NebulaCloud" as MiningTargetType,
      baseMiningRate_UnitsPerSec: 0.5,
      powerConsumption_MW_PerSec: 3,
      effectiveRange_Units: 30,
      beamOrCollector_VisualEffect: {
        intakeAnimation: { frameCount: 8, speed: 10, loop: true },
        particleFlow_ToShip: {
          particleSprite_Template: "assets/images/particles/gas_mote_{gasType}.png",
          particleColor_ByGasType: { "Helium3Gas": "#FF00FF" },
          density: 10,
          speed: 1,
          animation: { frameCount: 4, speed: 8, loop: true }
        }
      },
      beamOrCollector_SoundEffect_Loop: "sfx/mining/gas_collector_active_loop_low_hum.wav",
      upgradeTiers: []
    }
  ];

  // Mock minable resource data - in a real implementation, this would be loaded from a database
  const minableResources: Record<string, MinableResourceData> = {
    "IronOre": {
      id: "IronOre",
      name: "Železná Ruda",
      type: "resource",
      description: "Běžná ruda obsahující železo, základní stavební materiál.",
      // Removed icon property as it's not in the MinableResourceData interface
      value: 5,
      rarity: "Common" as any,
      resourceCategory: ResourceCategory.Metal_Common,
      miningDifficultyFactor: 0.8,
      isSolid: true,
      refiningRequired: true,
      refinedTo_ItemId: "IronIngot",
      refiningRatio: 2
    },
    "Helium3Gas": {
      id: "Helium3Gas",
      name: "Hélium-3",
      type: "resource",
      description: "Vzácný izotop hélia, používaný jako palivo pro pokročilé fúzní reaktory.",
      // Removed icon property as it's not in the MinableResourceData interface
      value: 25,
      rarity: "Uncommon" as any,
      resourceCategory: ResourceCategory.Gas_Fuel,
      miningDifficultyFactor: 1.2,
      isSolid: false
    },
    "CopperOre": {
      id: "CopperOre",
      name: "Měděná Ruda",
      type: "resource",
      description: "Běžná ruda obsahující měď, důležitá pro elektroniku.",
      value: 8,
      rarity: "Common" as any,
      resourceCategory: ResourceCategory.Metal_Common,
      miningDifficultyFactor: 0.9,
      isSolid: true,
      refiningRequired: true,
      refinedTo_ItemId: "CopperIngot",
      refiningRatio: 2
    },
    "TitaniumOre": {
      id: "TitaniumOre",
      name: "Titanová Ruda",
      type: "resource",
      description: "Vzácná ruda obsahující titan, vysoce odolný kov.",
      value: 20,
      rarity: "Uncommon" as any,
      resourceCategory: ResourceCategory.Metal_Rare,
      miningDifficultyFactor: 1.4,
      isSolid: true,
      refiningRequired: true,
      refinedTo_ItemId: "TitaniumIngot",
      refiningRatio: 3
    }
  };

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (miningInterval) {
        clearInterval(miningInterval);
      }
    };
  }, [miningInterval]);

  const getMiningToolById = (toolId: string): MiningToolTypeDefinition | null => {
    return miningTools.find(tool => tool.toolModuleId_Base === toolId) || null;
  };

  const getResourceById = (resourceId: string): MinableResourceData | null => {
    return minableResources[resourceId] || null;
  };

  const startMining = (targetId: string) => {
    if (!activeTool) {
      toast.error("Žádný těžební nástroj není vybraný");
      return;
    }

    // Check if target resource exists
    const resource = getResourceById(targetId);
    if (!resource) {
      toast.error("Neplatný cíl těžby");
      return;
    }

    // Check if the active tool can mine this resource type
    const tool = getMiningToolById(activeTool);
    if (!tool) {
      toast.error("Neplatný těžební nástroj");
      return;
    }

    const canMine = 
      (tool.targetResourceType.includes("Solid") && resource.isSolid) || 
      (tool.targetResourceType.includes("Gas") && !resource.isSolid);
      
    if (!canMine) {
      toast.error("Tento nástroj nemůže těžit tento typ suroviny");
      return;
    }

    setTargetResourceId(targetId);
    setIsActivelyMining(true);
    setMiningProgress(0);
    
    // Start mining progress loop
    const interval = setInterval(() => {
      setMiningProgress((prev) => {
        const newProgress = prev + (tool.baseMiningRate_UnitsPerSec / 10) / (resource.miningDifficultyFactor || 1);
        
        if (newProgress >= 1) {
          // Mining completed
          clearInterval(interval);
          setMiningInterval(null);
          setIsActivelyMining(false);
          setMiningProgress(0);
          
          // Inform the player
          toast.success(`Těžba dokončena: získáno ${resource.name}`);
          
          // In a real implementation, we would add the resource to player's inventory here
          
          return 0;
        }
        
        return newProgress;
      });
    }, 100); // Update every 100ms
    
    setMiningInterval(interval);
    
    console.log(`Začala těžba ${resource.name} s ${tool.toolModuleId_Base}`);
    toast.info(`Těžím: ${resource.name}`);
  };

  const stopMining = () => {
    if (miningInterval) {
      clearInterval(miningInterval);
      setMiningInterval(null);
    }
    setIsActivelyMining(false);
    setTargetResourceId(null);
    setMiningProgress(0);
    console.log("Těžba zastavena");
    toast.info("Těžba zastavena");
  };

  const value = {
    activeTool,
    isActivelyMining,
    targetResourceId,
    miningProgress,
    setActiveTool,
    startMining,
    stopMining,
    getMiningToolById,
    getResourceById,
    availableResources: minableResources
  };

  return (
    <MiningSystemContext.Provider value={value}>
      {children}
    </MiningSystemContext.Provider>
  );
};

export const useMiningSystem = (): MiningSystemContextType => {
  const context = useContext(MiningSystemContext);
  if (context === undefined) {
    throw new Error('useMiningSystem must be used within a MiningSystemProvider');
  }
  return context;
};
