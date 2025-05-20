import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  InventoryContextType, 
  InventoryItem,
  InventorySlot,
  ItemType,
  SpecializedStorageType,
  ItemRarity
} from '../types/inventory';

interface InventoryProviderProps {
  children: ReactNode;
}

// Dummy data for inventory and items
const mockInventory = {
  resources: {
    items: [
      { id: 'titanium', itemInstanceId: 'titanium_1', baseItemId: 'titanium', name: 'Titanium', quantity: 150, type: 'resource', icon: 'titanium', value: 50, description: 'A strong, lightweight metal', defaultItemName: 'Titanium', defaultItemType: 'Resource' },
      { id: 'crystal', itemInstanceId: 'crystal_1', baseItemId: 'crystal', name: 'Crystal', quantity: 75, type: 'resource', icon: 'crystal', value: 100, description: 'An energy-focusing crystal', defaultItemName: 'Crystal', defaultItemType: 'Resource' },
      { id: 'fuel', itemInstanceId: 'fuel_1', baseItemId: 'fuel', name: 'Fuel', quantity: 200, type: 'resource', icon: 'fuel', value: 30, description: 'Spacecraft propellant', defaultItemName: 'Fuel', defaultItemType: 'Resource' },
      { id: 'organic', itemInstanceId: 'organic_1', baseItemId: 'organic', name: 'Organic Matter', quantity: 120, type: 'resource', icon: 'organic', value: 20, description: 'Biological compounds', defaultItemName: 'Organic Matter', defaultItemType: 'Resource' }
    ],
    maxCapacity: 1000,
    usedCapacity: 545
  },
  components: {
    items: [
      { id: 'engine_part', itemInstanceId: 'engine_part_1', baseItemId: 'engine_part', name: 'Engine Component', quantity: 5, type: 'component', icon: 'engine_part', value: 300, description: 'Used for ship repairs and upgrades', defaultItemName: 'Engine Component', defaultItemType: 'Component' },
      { id: 'circuit', itemInstanceId: 'circuit_1', baseItemId: 'circuit', name: 'Circuit Board', quantity: 12, type: 'component', icon: 'circuit', value: 200, description: 'Electronic component', defaultItemName: 'Circuit Board', defaultItemType: 'Component' },
      { id: 'weapon_part', itemInstanceId: 'weapon_part_1', baseItemId: 'weapon_part', name: 'Weapon Component', quantity: 3, type: 'component', icon: 'weapon_part', value: 400, description: 'Used in weapons crafting', defaultItemName: 'Weapon Component', defaultItemType: 'Component' }
    ],
    maxCapacity: 100,
    usedCapacity: 20
  },
  artifacts: {
    items: [
      { id: 'ancient_relic', itemInstanceId: 'ancient_relic_1', baseItemId: 'ancient_relic', name: 'Ancient Relic', quantity: 1, type: 'artifact', icon: 'ancient_relic', value: 5000, description: 'A mysterious artifact of unknown origin', defaultItemName: 'Ancient Relic', defaultItemType: 'Artifact' }
    ],
    maxCapacity: 20,
    usedCapacity: 1
  },
  cargoHold: {
    slots: [
      { slotId: 'cargo_1', itemId: 'titanium', quantity: 50, containedItem: { itemInstanceId: 'titanium_cargo_1', baseItemId: 'titanium', quantity: 50 } },
      { slotId: 'cargo_2', itemId: 'crystal', quantity: 25, containedItem: { itemInstanceId: 'crystal_cargo_1', baseItemId: 'crystal', quantity: 25 } },
      { slotId: 'cargo_3', itemId: null, quantity: 0, containedItem: null },
      // ... more empty slots
      { slotId: 'cargo_24', itemId: null, quantity: 0, containedItem: null }
    ],
    totalCapacity: 1000,
    usedCapacity: 545
  },
  specializedStorage: {
    RawMaterials: { items: [], maxCapacity: 500, usedCapacity: 0 },
    CraftingComponents: { items: [], maxCapacity: 100, usedCapacity: 0 },
    ShipModules_Unequipped: { items: [], maxCapacity: 50, usedCapacity: 0 },
    TradeGoods_Commodities: { items: [], maxCapacity: 200, usedCapacity: 0 },
    QuestItems_KeyItems: { items: [], maxCapacity: 20, usedCapacity: 0 },
    Artifacts_UniqueDiscoveries: { items: [], maxCapacity: 10, usedCapacity: 0 }
  },
  filterType: undefined,
  sortKey: 'name',
  searchText: ''
};

// Define the item database with proper types - Remove quantity from database items since it's not part of Omit<InventoryItem, "quantity">
const mockItemDatabase: Record<string, Omit<InventoryItem, 'quantity'>> = {
  titanium: { 
    id: 'titanium', 
    baseItemId: 'titanium', 
    name: 'Titanium', 
    type: 'resource', 
    icon: 'titanium', 
    value: 50, 
    description: 'A strong, lightweight metal', 
    defaultItemName: 'Titanium', 
    defaultItemType: 'Resource', 
    defaultItemDescription: 'A strong, lightweight metal', 
    isStackable: true, 
    maxStackSize: 999, 
    baseValue_Credits: 50
  },
  crystal: { 
    id: 'crystal', 
    baseItemId: 'crystal', 
    name: 'Crystal', 
    type: 'resource', 
    icon: 'crystal', 
    value: 100, 
    description: 'An energy-focusing crystal', 
    defaultItemName: 'Crystal', 
    defaultItemType: 'Resource', 
    defaultItemDescription: 'An energy-focusing crystal', 
    isStackable: true, 
    maxStackSize: 999, 
    baseValue_Credits: 100
  },
  fuel: { 
    id: 'fuel', 
    baseItemId: 'fuel', 
    name: 'Fuel', 
    type: 'resource', 
    icon: 'fuel', 
    value: 30, 
    description: 'Spacecraft propellant', 
    defaultItemName: 'Fuel', 
    defaultItemType: 'Resource', 
    defaultItemDescription: 'Spacecraft propellant', 
    isStackable: true, 
    maxStackSize: 999, 
    baseValue_Credits: 30
  },
  organic: { 
    id: 'organic', 
    baseItemId: 'organic', 
    name: 'Organic Matter', 
    type: 'resource', 
    icon: 'organic', 
    value: 20, 
    description: 'Biological compounds', 
    defaultItemName: 'Organic Matter', 
    defaultItemType: 'Resource', 
    defaultItemDescription: 'Biological compounds', 
    isStackable: true, 
    maxStackSize: 999, 
    baseValue_Credits: 20
  },
  engine_part: { 
    id: 'engine_part', 
    baseItemId: 'engine_part', 
    name: 'Engine Component', 
    type: 'component', 
    icon: 'engine_part', 
    value: 300, 
    description: 'Used for ship repairs and upgrades', 
    defaultItemName: 'Engine Component', 
    defaultItemType: 'Component', 
    defaultItemDescription: 'Used for ship repairs and upgrades', 
    isStackable: true, 
    maxStackSize: 10, 
    baseValue_Credits: 300
  },
  circuit: { 
    id: 'circuit', 
    baseItemId: 'circuit', 
    name: 'Circuit Board', 
    type: 'component', 
    icon: 'circuit', 
    value: 200, 
    description: 'Electronic component', 
    defaultItemName: 'Circuit Board', 
    defaultItemType: 'Component', 
    defaultItemDescription: 'Electronic component', 
    isStackable: true, 
    maxStackSize: 20, 
    baseValue_Credits: 200
  },
  weapon_part: { 
    id: 'weapon_part', 
    baseItemId: 'weapon_part', 
    name: 'Weapon Component', 
    type: 'component', 
    icon: 'weapon_part', 
    value: 400, 
    description: 'Used in weapons crafting', 
    defaultItemName: 'Weapon Component', 
    defaultItemType: 'Component', 
    defaultItemDescription: 'Used in weapons crafting', 
    isStackable: true, 
    maxStackSize: 5, 
    baseValue_Credits: 400
  },
  ancient_relic: { 
    id: 'ancient_relic', 
    baseItemId: 'ancient_relic', 
    name: 'Ancient Relic', 
    type: 'artifact', 
    icon: 'ancient_relic', 
    value: 5000, 
    description: 'A mysterious artifact of unknown origin', 
    defaultItemName: 'Ancient Relic', 
    defaultItemType: 'Artifact', 
    defaultItemDescription: 'A mysterious artifact of unknown origin', 
    isStackable: false, 
    baseValue_Credits: 5000, 
    rarity: ItemRarity.Legendary, 
    defaultLoreText: 'This mysterious artifact appears to be of ancient origin. Its purpose remains unknown, but it radiates a strange energy.'
  }
};

// Create the inventory context
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  // State for inventory, selected item, filters, etc.
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ItemType | null>(null);
  const [sort, setSort] = useState<'name' | 'quantity' | 'value'>('name');
  const [searchText, setSearchText] = useState<string>('');

  const inventory = mockInventory;
  const itemDatabase = mockItemDatabase;
  
  // Function to select an item
  const selectItem = (itemId: string | null) => {
    setSelectedItemId(itemId);
  };

  // Function to find an item by ID
  const findItem = (itemId: string): InventoryItem | null => {
    if (!itemId) return null;
    
    for (const storageType of Object.values(inventory)) {
      if (storageType.items) {
        const item = storageType.items.find(item => item.id === itemId);
        if (item) return item;
      }
    }
    
    return null;
  };

  // Function to get an item by its ID
  const getItemById = (itemId: string): InventoryItem | null => {
    const baseItem = itemDatabase[itemId];
    if (!baseItem) return null;
    
    // Add a default quantity when returning from database
    return {
      ...baseItem,
      quantity: 0
    } as InventoryItem;
  };

  // Get the total cargo capacity and used capacity
  const getTotalCapacity = () => {
    let total = 0;
    for (const storageType of Object.values(inventory)) {
      if (storageType.maxCapacity) {
        total += storageType.maxCapacity;
      }
    }
    return total;
  };

  const getUsedCapacity = () => {
    let used = 0;
    for (const storageType of Object.values(inventory)) {
      if (storageType.usedCapacity) {
        used += storageType.usedCapacity;
      }
    }
    return used;
  };

  // Function to add an item to inventory
  const addItem = (itemId: string, quantity: number, storageType: SpecializedStorageType) => {
    console.log(`Adding ${quantity} of ${itemId} to ${storageType}`);
    // In a real implementation, we would update the inventory here
  };

  // Function to remove an item from inventory
  const removeItem = (itemId: string, quantity: number) => {
    console.log(`Removing ${quantity} of ${itemId}`);
    // In a real implementation, we would update the inventory here
  };

  // Modified setFilter function to accept string type
  const handleSetFilter = (newFilter: ItemType | null | string) => {
    if (typeof newFilter === 'string') {
      setFilter(newFilter as ItemType);
    } else {
      setFilter(newFilter);
    }
  };

  // Modified setSort function to accept string type
  const handleSetSort = (newSort: 'name' | 'quantity' | 'value' | string) => {
    setSort(newSort as 'name' | 'quantity' | 'value');
  };

  // Value provided by the context
  const value: InventoryContextType = {
    inventory,
    selectedItemId,
    selectItem,
    findItem,
    getTotalCapacity,
    getUsedCapacity,
    addItem,
    removeItem,
    itemDatabase,
    filter,
    setFilter: handleSetFilter,
    sort,
    setSort: handleSetSort,
    searchText,
    setSearchText,
    getItemById
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook for using the inventory context
export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
