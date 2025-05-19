
import { Vector2D } from './galaxy';

export enum ItemRarity {
  Common = "Common",
  Uncommon = "Uncommon",
  Rare = "Rare",
  Epic = "Epic",
  Legendary = "Legendary",
  Artifact = "Artifact" // Pro unikátní příběhové předměty
}

export enum SpecializedStorageType {
  RawMaterials = "RawMaterials",
  CraftingComponents = "CraftingComponents",
  ShipModules_Unequipped = "ShipModules_Unequipped",
  TradeGoods_Commodities = "TradeGoods_Commodities",
  QuestItems_KeyItems = "QuestItems_KeyItems",
  Artifacts_UniqueDiscoveries = "Artifacts_UniqueDiscoveries"
}

export interface BaseItemData {
  itemId: string;
  itemNameKey: string;
  defaultItemName: string;
  itemDescriptionKey: string;
  defaultItemDescription: string;
  itemIconKey: string;
  itemTypeKey: string;
  defaultItemType: string;
  isStackable: boolean;
  maxStackSize?: number;
  baseValue_Credits: number;
  weightPerUnit?: number;
  rarity: ItemRarity;
  loreTextKey?: string;
  defaultLoreText?: string;
}

export interface ItemInstance {
  itemInstanceId: string;
  baseItemId: string;
  quantity: number;
  // Additional item instance properties could go here
}

export interface InventorySlot {
  slotId: string;
  containedItem?: ItemInstance;
  isLocked?: boolean;
  slotTypeRestriction?: string[];
}

export interface CargoHoldData {
  totalCapacity: number;
  usedCapacity: number;
  slots: InventorySlot[];
}

export interface SpecializedStorageData {
  type: SpecializedStorageType;
  items: ItemInstance[];
}

export interface InventoryData {
  cargoHold: CargoHoldData;
  specializedStorage: Record<SpecializedStorageType, SpecializedStorageData>;
  selectedItemId?: string;
  filterType?: string;
  sortKey?: string;
  searchText?: string;
}
