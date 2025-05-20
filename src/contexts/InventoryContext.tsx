
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  InventoryContextType, 
  InventoryItem,
  InventorySlot,
  ItemType,
  SpecializedStorageType
} from '../types/inventory';

interface InventoryProviderProps {
  children: ReactNode;
}

// Dummy data for inventory and items
const mockInventory = {
  resources: {
    items: [
      { id: 'titanium', name: 'Titanium', quantity: 150, type: 'resource', icon: 'titanium', value: 50, description: 'A strong, lightweight metal' },
      { id: 'crystal', name: 'Crystal', quantity: 75, type: 'resource', icon: 'crystal', value: 100, description: 'An energy-focusing crystal' },
      { id: 'fuel', name: 'Fuel', quantity: 200, type: 'resource', icon: 'fuel', value: 30, description: 'Spacecraft propellant' },
      { id: 'organic', name: 'Organic Matter', quantity: 120, type: 'resource', icon: 'organic', value: 20, description: 'Biological compounds' }
    ],
    maxCapacity: 1000,
    usedCapacity: 545
  },
  components: {
    items: [
      { id: 'engine_part', name: 'Engine Component', quantity: 5, type: 'component', icon: 'engine_part', value: 300, description: 'Used for ship repairs and upgrades' },
      { id: 'circuit', name: 'Circuit Board', quantity: 12, type: 'component', icon: 'circuit', value: 200, description: 'Electronic component' },
      { id: 'weapon_part', name: 'Weapon Component', quantity: 3, type: 'component', icon: 'weapon_part', value: 400, description: 'Used in weapons crafting' }
    ],
    maxCapacity: 100,
    usedCapacity: 20
  },
  artifacts: {
    items: [
      { id: 'ancient_relic', name: 'Ancient Relic', quantity: 1, type: 'artifact', icon: 'ancient_relic', value: 5000, description: 'A mysterious artifact of unknown origin' }
    ],
    maxCapacity: 20,
    usedCapacity: 1
  }
};

const mockItemDatabase = {
  titanium: { id: 'titanium', name: 'Titanium', type: 'resource', icon: 'titanium', value: 50, description: 'A strong, lightweight metal' },
  crystal: { id: 'crystal', name: 'Crystal', type: 'resource', icon: 'crystal', value: 100, description: 'An energy-focusing crystal' },
  fuel: { id: 'fuel', name: 'Fuel', type: 'resource', icon: 'fuel', value: 30, description: 'Spacecraft propellant' },
  organic: { id: 'organic', name: 'Organic Matter', type: 'resource', icon: 'organic', value: 20, description: 'Biological compounds' },
  engine_part: { id: 'engine_part', name: 'Engine Component', type: 'component', icon: 'engine_part', value: 300, description: 'Used for ship repairs and upgrades' },
  circuit: { id: 'circuit', name: 'Circuit Board', type: 'component', icon: 'circuit', value: 200, description: 'Electronic component' },
  weapon_part: { id: 'weapon_part', name: 'Weapon Component', type: 'component', icon: 'weapon_part', value: 400, description: 'Used in weapons crafting' },
  ancient_relic: { id: 'ancient_relic', name: 'Ancient Relic', type: 'artifact', icon: 'ancient_relic', value: 5000, description: 'A mysterious artifact of unknown origin' }
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
      const item = storageType.items.find(item => item.id === itemId);
      if (item) return item;
    }
    
    return null;
  };

  // Get the total cargo capacity and used capacity
  const getTotalCapacity = () => {
    return Object.values(inventory).reduce((total, storage) => total + storage.maxCapacity, 0);
  };

  const getUsedCapacity = () => {
    return Object.values(inventory).reduce((total, storage) => total + storage.usedCapacity, 0);
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
    setFilter,
    sort,
    setSort,
    searchText,
    setSearchText
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
