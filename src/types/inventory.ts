
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

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  type: ItemType | string;
  icon: string;
  value: number;
  description: string;
}

export interface InventorySlot {
  itemId: string | null;
  quantity: number;
}

export interface SpecializedStorage {
  items: InventoryItem[];
  maxCapacity: number;
  usedCapacity: number;
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
}
