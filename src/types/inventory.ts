
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
  Artifacts = "artifacts"
}

export enum ItemRarity {
  Common = "common",
  Uncommon = "uncommon",
  Rare = "rare",
  Epic = "epic",
  Legendary = "legendary",
  Unique = "unique"
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
  defaultItemName?: string;
  defaultItemType?: string;
  isStackable?: boolean;
  baseValue_Credits?: number;
}

export interface InventorySlot {
  itemId: string | null;
  quantity: number;
  containedItem?: string;
  isLocked?: boolean;
}

export interface SpecializedStorage {
  items: InventoryItem[];
  maxCapacity: number;
  usedCapacity: number;
  slots?: InventorySlot[];
  totalCapacity?: number;
}

export interface InventoryContextType {
  inventory: Record<string, SpecializedStorage>;
  selectedItemId: string | null;
  selectItem: (itemId: string | null) => void;
  findItem: (itemId: string) => InventoryItem | null;
  getTotalCapacity: () => number;
  getUsedCapacity: () => number;
  addItem: (itemId: string, quantity: number, storageType: SpecializedStorageType) => void;
  removeItem: (itemId: string, quantity: number) => void;
  itemDatabase: Record<string, Omit<InventoryItem, 'quantity'>>;
  filter: ItemType | null;
  setFilter: (filter: ItemType | null) => void;
  sort: 'name' | 'quantity' | 'value';
  setSort: (sort: 'name' | 'quantity' | 'value') => void;
  searchText: string;
  setSearchText: (text: string) => void;
  getItemById?: (itemId: string) => InventoryItem | null;
}
