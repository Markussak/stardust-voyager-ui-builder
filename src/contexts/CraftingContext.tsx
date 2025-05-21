
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { useInventory } from './InventoryContext';
import {
  BlueprintData,
  UpgradePath,
  CraftingMaterial,
  BlueprintSource,
  BlueprintCategory,
  CraftingStationType,
  CraftingContextType,
} from '@/types/crafting';

// Mock blueprints data
const mockBlueprints: BlueprintData[] = [
  {
    blueprintId: "bp_laser_mk1_craft",
    resultingItemId: "laser_pulse_mk1_red",
    resultingItemQuantity: 1,
    blueprintNameKey: "blueprint.laser_mk1.name",
    defaultBlueprintName: "Plán: Pulzní Laser Mk.I",
    blueprintDescriptionKey: "blueprint.laser_mk1.description",
    defaultBlueprintDescription: "Základní pulzní laser pro malé lodě. Efektivní proti štítům.",
    iconAsset: "assets/images/items/icons/blueprints/bp_weapon_laser.png",
    category: BlueprintCategory.ShipModules_Weapons,
    requiredMaterials: [
      { itemId: "IronOre", quantityRequired: 20 },
      { itemId: "CopperOre", quantityRequired: 15 },
    ],
    craftingTime_Seconds: 30,
    requiredCraftingStation_Type: CraftingStationType.Station_Workshop_Tier1,
    sourceType: [BlueprintSource.ResearchUnlock, BlueprintSource.LootDrop_Container],
    isUnlocked_StoreKey: "player.blueprints.unlocked.bp_laser_mk1_craft",
    rarity: "Common" as any
  },
  {
    blueprintId: "bp_shield_generator_basic",
    resultingItemId: "shield_generator_basic",
    resultingItemQuantity: 1,
    blueprintNameKey: "blueprint.shield_basic.name",
    defaultBlueprintName: "Plán: Základní Štítový Generátor",
    blueprintDescriptionKey: "blueprint.shield_basic.description",
    defaultBlueprintDescription: "Generátor pro vytvoření základní energetické bariéry kolem vaší lodi.",
    iconAsset: "assets/images/items/icons/blueprints/bp_shield_basic.png",
    category: BlueprintCategory.ShipModules_Defense,
    requiredMaterials: [
      { itemId: "IronOre", quantityRequired: 15 },
      { itemId: "Helium3Gas", quantityRequired: 10 },
    ],
    craftingTime_Seconds: 45,
    requiredCraftingStation_Type: CraftingStationType.Station_Workshop_Tier1,
    sourceType: [BlueprintSource.ResearchUnlock],
    isUnlocked_StoreKey: "player.blueprints.unlocked.bp_shield_generator_basic",
    rarity: "Common" as any
  },
  {
    blueprintId: "bp_repair_kit_small",
    resultingItemId: "repair_kit_small",
    resultingItemQuantity: 5,
    blueprintNameKey: "blueprint.repair_kit_small.name",
    defaultBlueprintName: "Plán: Malá Opravná Sada",
    blueprintDescriptionKey: "blueprint.repair_kit_small.description",
    defaultBlueprintDescription: "Základní sada nástrojů pro rychlé opravy poškození trupu lodi.",
    iconAsset: "assets/images/items/icons/blueprints/bp_repair_kit_small.png",
    category: BlueprintCategory.Consumables_Repair,
    requiredMaterials: [
      { itemId: "IronOre", quantityRequired: 5 },
    ],
    craftingTime_Seconds: 15,
    requiredCraftingStation_Type: CraftingStationType.Onboard_BasicFabricator,
    sourceType: [BlueprintSource.ResearchUnlock],
    isUnlocked_StoreKey: "player.blueprints.unlocked.bp_repair_kit_small",
    rarity: "Common" as any
  },
];

// Mock upgrades data
const mockUpgrades: UpgradePath[] = [
  {
    baseItemId: "laser_pulse_mk1_red",
    upgradedItemId: "laser_pulse_mk2_red",
    upgradeNameKey: "upgrade.laser_mk1_to_mk2.name",
    defaultUpgradeName: "Vylepšit Laser Mk.I -> Mk.II",
    requiredMaterials: [
      { itemId: "TitaniumOre", quantityRequired: 10 },
      { itemId: "CopperOre", quantityRequired: 20 },
    ],
    cost_Credits: 2000,
    upgradeTime_Seconds: 60,
    requiredUpgradeStation_Type: "Station_AdvancedLab_Tier2",
    unlock_TechId: "tech.weapons.laser.improved_focusing_mk2"
  },
  {
    baseItemId: "shield_generator_basic",
    upgradedItemId: "shield_generator_improved",
    upgradeNameKey: "upgrade.shield_basic_to_improved.name",
    defaultUpgradeName: "Vylepšit Základní Štít -> Vylepšený Štít",
    requiredMaterials: [
      { itemId: "TitaniumOre", quantityRequired: 15 },
      { itemId: "Helium3Gas", quantityRequired: 25 },
    ],
    cost_Credits: 3000,
    upgradeTime_Seconds: 90,
    requiredUpgradeStation_Type: "Station_AdvancedLab_Tier2",
    unlock_TechId: "tech.defense.shield.improved_capacity"
  },
];

const CraftingContext = createContext<CraftingContextType | undefined>(undefined);

export const CraftingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { findItem, inventoryItems } = useInventory();

  const [availableBlueprints, setAvailableBlueprints] = useState<BlueprintData[]>(mockBlueprints);
  const [availableUpgrades, setAvailableUpgrades] = useState<UpgradePath[]>(mockUpgrades);

  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string | null>(null);
  const [selectedUpgradeId, setSelectedUpgradeId] = useState<string | null>(null);
  const [selectedModificationId, setSelectedModificationId] = useState<string | null>(null);
  const [craftingMode, setCraftingMode] = useState<'blueprint' | 'upgrade' | 'modification'>('blueprint');

  const [craftingInProgress, setCraftingInProgress] = useState(false);
  const [craftingProgress, setCraftingProgress] = useState(0);
  const [craftingTimeRemaining, setCraftingTimeRemaining] = useState(0);
  const [craftingInterval, setCraftingInterval] = useState<NodeJS.Timeout | null>(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (craftingInterval) {
        clearInterval(craftingInterval);
      }
    };
  }, [craftingInterval]);

  const setBlueprintId = (id: string | null) => {
    setSelectedBlueprintId(id);
    if (id) {
      setCraftingMode('blueprint');
    }
  };

  const setUpgradeId = (id: string | null) => {
    setSelectedUpgradeId(id);
    if (id) {
      setCraftingMode('upgrade');
    }
  };

  const setModificationId = (id: string | null) => {
    setSelectedModificationId(id);
    if (id) {
      setCraftingMode('modification');
    }
  };

  const hasMaterials = (materials: CraftingMaterial[]): boolean => {
    // This is a simplified version, in a real app would check player's inventory
    return materials.every(material => {
      const item = findItem(material.itemId);
      return item && item.quantity >= material.quantityRequired;
    });
  };

  const getBlueprintById = (id: string): BlueprintData | undefined => {
    return availableBlueprints.find(bp => bp.blueprintId === id);
  };

  const getUpgradeById = (id: string): UpgradePath | undefined => {
    return availableUpgrades.find(upgrade => upgrade.baseItemId === id);
  };

  const startCrafting = () => {
    if (craftingInProgress) {
      toast.error("Výroba již probíhá");
      return;
    }

    let item: BlueprintData | UpgradePath | undefined;
    let materials: CraftingMaterial[] = [];
    let time = 0;

    if (craftingMode === 'blueprint' && selectedBlueprintId) {
      item = getBlueprintById(selectedBlueprintId);
      if (item) {
        materials = item.requiredMaterials;
        time = item.craftingTime_Seconds || 0;
      }
    } else if (craftingMode === 'upgrade' && selectedUpgradeId) {
      item = getUpgradeById(selectedUpgradeId);
      if (item) {
        materials = item.requiredMaterials;
        time = item.upgradeTime_Seconds || 0;
      }
    }

    if (!item) {
      toast.error("Žádný plán nebo vylepšení není vybráno");
      return;
    }

    if (!hasMaterials(materials)) {
      toast.error("Nedostatek materiálů pro výrobu");
      return;
    }

    setCraftingInProgress(true);
    setCraftingProgress(0);
    setCraftingTimeRemaining(time);

    const name = craftingMode === 'blueprint' 
      ? (item as BlueprintData).defaultBlueprintName.replace('Plán: ', '') 
      : (item as UpgradePath).defaultUpgradeName;

    toast.info(`Začala výroba: ${name}`);

    if (time > 0) {
      const interval = setInterval(() => {
        setCraftingProgress(prev => {
          const newProgress = prev + (1 / time);
          return Math.min(newProgress, 1);
        });

        setCraftingTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            completeCurrentCrafting();
            return 0;
          }
          return newTime;
        });
      }, 1000);

      setCraftingInterval(interval);
    } else {
      // Instant crafting
      completeCurrentCrafting();
    }
  };

  const cancelCrafting = () => {
    if (craftingInterval) {
      clearInterval(craftingInterval);
      setCraftingInterval(null);
    }
    
    setCraftingInProgress(false);
    setCraftingProgress(0);
    setCraftingTimeRemaining(0);
    
    toast.info("Výroba zrušena");
  };

  const completeCurrentCrafting = () => {
    if (craftingInterval) {
      clearInterval(craftingInterval);
      setCraftingInterval(null);
    }

    let resultName = "Předmět";
    const mode = craftingMode;

    // Handle blueprint crafting completion
    if (mode === 'blueprint' && selectedBlueprintId) {
      const blueprint = getBlueprintById(selectedBlueprintId);
      if (blueprint) {
        resultName = blueprint.defaultBlueprintName.replace('Plán: ', '');
        // In a real app, we would add the crafted item to inventory here
      }
    }
    // Handle upgrade completion
    else if (mode === 'upgrade' && selectedUpgradeId) {
      const upgrade = getUpgradeById(selectedUpgradeId);
      if (upgrade) {
        resultName = upgrade.defaultUpgradeName.split('->')[1].trim();
        // In a real app, we would replace the base item with the upgraded item here
      }
    }

    // Reset crafting state
    setCraftingInProgress(false);
    setCraftingProgress(0);
    setCraftingTimeRemaining(0);

    toast.success(`Výroba dokončena: ${resultName}`);
  };

  const contextValue: CraftingContextType = {
    availableBlueprints,
    availableUpgrades,
    selectedBlueprintId,
    selectedUpgradeId,
    selectedModificationId,
    craftingMode,
    craftingInProgress,
    craftingProgress,
    craftingTimeRemaining,
    setBlueprintId,
    setUpgradeId,
    setModificationId,
    setCraftingMode,
    startCrafting,
    cancelCrafting,
    hasMaterials,
    getBlueprintById,
    getUpgradeById,
  };

  return (
    <CraftingContext.Provider value={contextValue}>
      {children}
    </CraftingContext.Provider>
  );
};

export const useCrafting = (): CraftingContextType => {
  const context = useContext(CraftingContext);
  if (context === undefined) {
    throw new Error('useCrafting must be used within a CraftingProvider');
  }
  return context;
};
