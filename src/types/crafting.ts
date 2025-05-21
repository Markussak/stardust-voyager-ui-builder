
import { ItemRarity } from './inventory';

export enum BlueprintSource {
  ResearchUnlock = "ResearchUnlock", // Odemčeno výzkumem
  LootDrop_Enemy = "LootDrop_Enemy", // Padne z nepřátel
  LootDrop_Container = "LootDrop_Container", // Nalezeno v kontejnerech/vracích
  QuestReward = "QuestReward", // Odměna za misi
  VendorPurchase = "VendorPurchase", // Koupeno od obchodníka
  ReverseEngineering = "ReverseEngineering" // Získané rozebráním existujícího itemu (pokročilá mechanika)
}

export enum BlueprintCategory {
  ShipModules_Weapons = "ShipModules_Weapons",
  ShipModules_Defense = "ShipModules_Defense",
  ShipModules_Systems = "ShipModules_Systems",
  Ammunition = "Ammunition",
  Consumables_Repair = "Consumables_Repair",
  Consumables_Buffs = "Consumables_Buffs",
  TradeGoods_Refined = "TradeGoods_Refined"
}

export enum CraftingStationType {
  Onboard_BasicFabricator = "Onboard_BasicFabricator",
  Station_Workshop_Tier1 = "Station_Workshop_Tier1",
  Station_AdvancedLab_Tier2 = "Station_AdvancedLab_Tier2",
  Faction_Specific_Forge = "Faction_Specific_Forge"
}

export interface CraftingMaterial {
  itemId: string; // ID suroviny nebo komponenty
  quantityRequired: number;
  iconAsset_Override?: string; // Pokud se má zobrazit jiná ikona než defaultní pro item
}

export interface BlueprintData {
  blueprintId: string; // Unikátní ID plánu (např. "bp_laser_mk2_craft")
  resultingItemId: string; // ID předmětu, který se vyrobí (odkaz na BaseItemData.itemId)
  resultingItemQuantity: number; // Kolik kusů se vyrobí
  blueprintNameKey: string;
  defaultBlueprintName: string; // např. "Plán: Laser Mk.II"
  blueprintDescriptionKey?: string;
  defaultBlueprintDescription?: string;
  iconAsset: string; // Ikona pro samotný plán
  category: BlueprintCategory;
  requiredMaterials: CraftingMaterial[];
  craftingTime_Seconds?: number; // Čas potřebný na výrobu (0 pro okamžitou)
  requiredCraftingStation_Type?: CraftingStationType;
  requiredPlayerSkill_Level?: { skillId: string; level: number; }; // Pokud má hráč skilly ovlivňující crafting
  sourceType: BlueprintSource[]; // Jak lze tento plán získat
  isUnlocked_StoreKey: string; // Kde je uložen stav odemčení tohoto plánu
  rarity?: ItemRarity; // Vzácnost samotného plánu
}

export interface UpgradePath {
  baseItemId: string; // ID předmětu, který se vylepšuje
  upgradedItemId: string; // ID vylepšeného předmětu (nový item nebo verze Mk.II atd.)
  upgradeNameKey: string;
  defaultUpgradeName: string; // např. "Vylepšit Laser Mk.I na Mk.II"
  requiredMaterials: CraftingMaterial[];
  cost_Credits?: number;
  upgradeTime_Seconds?: number;
  requiredUpgradeStation_Type?: string; // Podobné jako crafting station
  unlock_TechId?: string; // Technologie potřebná pro toto vylepšení
}

export interface ItemModificationDefinition {
  modificationId: string; // např. "laser_beam_focus_mod"
  targetItemCategory: string; // Na jaké typy itemů lze aplikovat
  modificationNameKey: string;
  defaultModificationName: string; // např. "Modifikace: Fokusovaný Paprsek"
  descriptionKey: string;
  defaultDescription: string;
  iconAsset: string; // Ikona pro modifikaci
  requiredMaterials: CraftingMaterial[];
  statModifiers_Applied: Array<{
    statKey: string;
    changeAbsolute?: number;
    changePercent?: number;
    newBehavior?: string;
  }>;
  conflictingModifications_Ids?: string[]; // S jakými jinými modifikacemi nelze kombinovat
  blueprintRequired_ModificationId?: string; // Plán pro aplikaci této modifikace
}

export interface CraftingContextType {
  availableBlueprints: BlueprintData[];
  availableUpgrades: UpgradePath[];
  selectedBlueprintId: string | null;
  selectedUpgradeId: string | null;
  selectedModificationId: string | null;
  craftingMode: 'blueprint' | 'upgrade' | 'modification';
  craftingInProgress: boolean;
  craftingProgress: number; // 0-1 pro progress bar
  craftingTimeRemaining: number; // v sekundách
  setBlueprintId: (id: string | null) => void;
  setUpgradeId: (id: string | null) => void;
  setModificationId: (id: string | null) => void;
  setCraftingMode: (mode: 'blueprint' | 'upgrade' | 'modification') => void;
  startCrafting: () => void;
  cancelCrafting: () => void;
  hasMaterials: (materials: CraftingMaterial[]) => boolean;
  getBlueprintById: (id: string) => BlueprintData | undefined;
  getUpgradeById: (id: string) => UpgradePath | undefined;
}
