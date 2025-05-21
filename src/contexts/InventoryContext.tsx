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
      { id: 'titanium', itemInstanceId: 'titanium_1', baseItemId: 'titanium', name: 'Titan', quantity: 150, type: 'resource', icon: 'titanium', value: 50, description: 'Lehký, silný kov', defaultItemName: 'Titan', defaultItemType: 'Zdroj' },
      { id: 'crystal', itemInstanceId: 'crystal_1', baseItemId: 'crystal', name: 'Krystal', quantity: 75, type: 'resource', icon: 'crystal', value: 100, description: 'Energeticky fokusující krystal', defaultItemName: 'Krystal', defaultItemType: 'Zdroj' },
      { id: 'fuel', itemInstanceId: 'fuel_1', baseItemId: 'fuel', name: 'Palivo', quantity: 200, type: 'resource', icon: 'fuel', value: 30, description: 'Pohonná hmota pro vesmírné lodě', defaultItemName: 'Palivo', defaultItemType: 'Zdroj' },
      { id: 'organic', itemInstanceId: 'organic_1', baseItemId: 'organic', name: 'Organická Hmota', quantity: 120, type: 'resource', icon: 'organic', value: 20, description: 'Biologické sloučeniny', defaultItemName: 'Organická Hmota', defaultItemType: 'Zdroj' },
      { id: 'IronOre', itemInstanceId: 'iron_ore_1', baseItemId: 'IronOre', name: 'Železná Ruda', quantity: 100, type: 'resource', icon: 'iron_ore', value: 5, description: 'Běžná ruda obsahující železo', defaultItemName: 'Železná Ruda', defaultItemType: 'Zdroj' },
      { id: 'CopperOre', itemInstanceId: 'copper_ore_1', baseItemId: 'CopperOre', name: 'Měděná Ruda', quantity: 80, type: 'resource', icon: 'copper_ore', value: 8, description: 'Běžná ruda obsahující měď', defaultItemName: 'Měděná Ruda', defaultItemType: 'Zdroj' },
      { id: 'TitaniumOre', itemInstanceId: 'titanium_ore_1', baseItemId: 'TitaniumOre', name: 'Titanová Ruda', quantity: 40, type: 'resource', icon: 'titanium_ore', value: 20, description: 'Vzácná ruda obsahující titan', defaultItemName: 'Titanová Ruda', defaultItemType: 'Zdroj' },
      { id: 'Helium3Gas', itemInstanceId: 'helium3_gas_1', baseItemId: 'Helium3Gas', name: 'Hélium-3', quantity: 30, type: 'resource', icon: 'helium3_gas', value: 25, description: 'Vzácný izotop hélia', defaultItemName: 'Hélium-3', defaultItemType: 'Zdroj' }
    ],
    maxCapacity: 1000,
    usedCapacity: 545
  },
  components: {
    items: [
      { id: 'engine_part', itemInstanceId: 'engine_part_1', baseItemId: 'engine_part', name: 'Součást Motoru', quantity: 5, type: 'component', icon: 'engine_part', value: 300, description: 'Používá se pro opravy a vylepšení lodí', defaultItemName: 'Součást Motoru', defaultItemType: 'Komponenta' },
      { id: 'circuit', itemInstanceId: 'circuit_1', baseItemId: 'circuit', name: 'Obvodová Deska', quantity: 12, type: 'component', icon: 'circuit', value: 200, description: 'Elektronická komponenta', defaultItemName: 'Obvodová Deska', defaultItemType: 'Komponenta' },
      { id: 'weapon_part', itemInstanceId: 'weapon_part_1', baseItemId: 'weapon_part', name: 'Součást Zbraně', quantity: 3, type: 'component', icon: 'weapon_part', value: 400, description: 'Používá se při výrobě zbraní', defaultItemName: 'Součást Zbraně', defaultItemType: 'Komponenta' }
    ],
    maxCapacity: 100,
    usedCapacity: 20
  },
  artifacts: {
    items: [
      { id: 'ancient_relic', itemInstanceId: 'ancient_relic_1', baseItemId: 'ancient_relic', name: 'Starobylá Relikvie', quantity: 1, type: 'artifact', icon: 'ancient_relic', value: 5000, description: 'Tajemný artefakt neznámého původu', defaultItemName: 'Starobylá Relikvie', defaultItemType: 'Artefakt' }
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
  },
  IronOre: { 
    id: 'IronOre', 
    baseItemId: 'IronOre', 
    name: 'Železná Ruda', 
    type: 'resource', 
    icon: 'iron_ore', 
    value: 5, 
    description: 'Běžná ruda obsahující železo, základní stavební materiál', 
    defaultItemName: 'Železná Ruda', 
    defaultItemType: 'Zdroj', 
    defaultItemDescription: 'Běžná ruda obsahující železo, základní stavební materiál', 
    isStackable: true, 
    maxStackSize: 999, 
    baseValue_Credits: 5
  },
  CopperOre: { 
    id: 'CopperOre', 
    baseItemId: 'CopperOre', 
    name: 'Měděná Ruda', 
    type: 'resource', 
    icon: 'copper_ore', 
    value: 8, 
    description: 'Běžná ruda obsahující měď, důležitá pro elektroniku', 
    defaultItemName: 'Měděná Ruda', 
    defaultItemType: 'Zdroj', 
    defaultItemDescription: 'Běžná ruda obsahující měď, důležitá pro elektroniku', 
    isStackable: true, 
    maxStackSize: 999, 
    baseValue_Credits: 8
  },
  TitaniumOre: { 
    id: 'TitaniumOre', 
    baseItemId: 'TitaniumOre', 
    name: 'Titanová Ruda', 
    type: 'resource', 
    icon: 'titanium_ore', 
    value: 20, 
    description: 'Vzácná ruda obsahující titan, vysoce odolný kov', 
    defaultItemName: 'Titanová Ruda', 
    defaultItemType: 'Zdroj', 
    defaultItemDescription: 'Vzácná ruda obsahující titan, vysoce odolný kov', 
    isStackable: true, 
    maxStackSize: 999, 
    baseValue_Credits: 20
  },
  Helium3Gas: { 
    id: 'Helium3Gas', 
    baseItemId: 'Helium3Gas', 
    name: 'Hélium-3', 
    type: 'resource', 
    icon: 'helium3_gas', 
    value: 25, 
    description: 'Vzácný izotop hélia, používaný jako palivo pro pokročilé fúzní reaktory', 
    defaultItemName: 'Hélium-3', 
    defaultItemType: 'Zdroj', 
    defaultItemDescription: 'Vzácný izotop hélia, používaný jako palivo pro pokročilé fúzní reaktory', 
    isStackable: true, 
    maxStackSize: 999, 
    baseValue_Credits: 25
  },
  laser_pulse_mk1_red: {
    id: 'laser_pulse_mk1_red',
    baseItemId: 'laser_pulse_mk1_red',
    name: 'Pulzní Laser Mk.I',
    type: 'module',
    icon: 'weapon_laser_mk1',
    value: 1000,
    description: 'Základní pulzní laser pro malé lodě. Efektivní proti štítům.',
    defaultItemName: 'Pulzní Laser Mk.I',
    defaultItemType: 'Modul',
    defaultItemDescription: 'Základní pulzní laser pro malé lodě. Efektivní proti štítům.',
    isStackable: false,
    baseValue_Credits: 1000
  },
  shield_generator_basic: {
    id: 'shield_generator_basic',
    baseItemId: 'shield_generator_basic',
    name: 'Základní Štítový Generátor',
    type: 'module',
    icon: 'shield_generator_basic',
    value: 1500,
    description: 'Generátor pro vytvoření základní energetické bariéry kolem vaší lodi.',
    defaultItemName: 'Základní Štítový Generátor',
    defaultItemType: 'Modul',
    defaultItemDescription: 'Generátor pro vytvoření základní energetické bariéry kolem vaší lodi.',
    isStackable: false,
    baseValue_Credits: 1500
  },
  repair_kit_small: {
    id: 'repair_kit_small',
    baseItemId: 'repair_kit_small',
    name: 'Malá Opravná Sada',
    type: 'consumable',
    icon: 'repair_kit_small',
    value: 100,
    description: 'Základní sada nástrojů pro rychlé opravy poškození trupu lodi.',
    defaultItemName: 'Malá Opravná Sada',
    defaultItemType: 'Spotřební',
    defaultItemDescription: 'Základní sada nástrojů pro rychlé opravy poškození trupu lodi.',
    isStackable: true,
    maxStackSize: 10,
    baseValue_Credits: 100
  }
};

// All the InventoryItems in an array for easier searching
const inventoryItems = [
  ...mockInventory.resources.items,
  ...mockInventory.components.items,
  ...mockInventory.artifacts.items
];

// Create the inventory context
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  // State for inventory, selected item, filters, etc.
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ItemType | null>(null);
  const [sort, setSort] = useState<'name' | 'quantity' | 'value'>('name');
  const [searchText, setSearchText] = useState<string>('');

  const inventory = mockInventory;
  
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
    const baseItem = mockItemDatabase[itemId];
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
    console.log(`Přidávám ${quantity} kusů ${itemId} do ${storageType}`);
    // In a real implementation, we would update the inventory here
  };

  // Function to remove an item from inventory
  const removeItem = (itemId: string, quantity: number) => {
    console.log(`Odebírám ${quantity} kusů ${itemId}`);
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
    itemDatabase: mockItemDatabase,
    filter,
    setFilter: handleSetFilter,
    sort,
    setSort: handleSetSort,
    searchText,
    setSearchText,
    getItemById,
    inventoryItems // Add the combined array of inventory items
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
