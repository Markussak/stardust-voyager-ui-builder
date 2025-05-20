export enum ItemType {
  Resource = "resource",
  Component = "component",
  Artifact = "artifact",
  Consumable = "consumable",
  Module = "module",
  Special = "special"
}

export enum SpecializedStorageType {
  Resources = "resources",
  Components = "components",
  Artifacts = "artifacts",
  // Adding these for compatibility
  RawMaterials = "RawMaterials",
  CraftingComponents = "CraftingComponents", 
  ShipModules_Unequipped = "ShipModules_Unequipped",
  TradeGoods_Commodities = "TradeGoods_Commodities",
  QuestItems_KeyItems = "QuestItems_KeyItems",
  Artifacts_UniqueDiscoveries = "Artifacts_UniqueDiscoveries"
}

export enum ItemRarity {
  Common = "common",
  Uncommon = "uncommon",
  Rare = "rare",
  Epic = "epic",
  Legendary = "legendary",
  Unique = "unique",
  Artifact = "artifact"  // Added for compatibility
}

// Add this for ship modules
export interface BaseItemData {
  id: string;
  name: string;
  type: string;
  description?: string;
  rarity?: ItemRarity;
  value?: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  type: ItemType | string;
  icon: string;
  value: number;
  description: string;
  rarity?: ItemRarity;
  defaultItemName?: string; // Added for compatibility
  defaultItemType?: string; // Added for compatibility
  isStackable?: boolean;
  baseValue_Credits?: number;
  defaultItemDescription?: string; // Added for compatibility
  maxStackSize?: number; // Added for compatibility
  weightPerUnit?: number; // Added for compatibility
  defaultLoreText?: string; // Added for compatibility
  baseItemId?: string; // Added for compatibility
  itemInstanceId?: string; // Added for compatibility
}

export interface InventorySlot {
  itemId: string | null;
  quantity: number;
  containedItem?: string | any; // Modified for compatibility
  isLocked?: boolean;
  slotId?: string; // Added for compatibility
}

export interface SpecializedStorage {
  items: InventoryItem[];
  maxCapacity: number;
  usedCapacity: number;
  slots?: InventorySlot[];
  totalCapacity?: number;
}

export interface InventoryContextType {
  inventory: Record<string, SpecializedStorage> | {
    cargoHold?: { slots: InventorySlot[], totalCapacity: number, usedCapacity: number },
    specializedStorage?: Record<string, { items: any[] }>,
    searchText?: string,
    filterType?: string,
    sortKey?: string,
    selectedItemId?: string | null  // Add this property
  };
  selectedItemId: string | null;
  selectItem: (itemId: string | null) => void;
  findItem: (itemId: string) => InventoryItem | null;
  getTotalCapacity: () => number;
  getUsedCapacity: () => number;
  addItem: (itemId: string, quantity: number, storageType: SpecializedStorageType) => void;
  removeItem: (itemId: string, quantity: number) => void;
  itemDatabase: Record<string, Omit<InventoryItem, 'quantity'>>;
  filter: ItemType | null;
  setFilter: (filter: ItemType | null | string) => void; // Modified for compatibility
  sort: 'name' | 'quantity' | 'value';
  setSort: (sort: 'name' | 'quantity' | 'value' | string) => void; // Modified for compatibility
  searchText: string;
  setSearchText: (text: string) => void;
  getItemById?: (itemId: string) => InventoryItem | null;
}

// Add these interfaces for TradeContext
export interface ItemInstance {
  itemInstanceId: string;
  baseItemId: string;
  quantity: number;
}

export interface TradeableItemData extends BaseItemData {
  currentPrice: number;
  availability: number;
  marketDemand: number;
}

export interface TraderInventoryItemSlot {
  itemId: string;
  itemInstance: ItemInstance;
  buyPrice_ForPlayer: number;
  stockQuantity: number;
  marketDemandIndicator: string;
}

