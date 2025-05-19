
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { InventoryData, ItemInstance, InventorySlot, SpecializedStorageType, ItemRarity, BaseItemData } from '../types/inventory';
import { toast } from "sonner";

// Mock item data - in a real app, this would come from a database or API
const mockItems: Record<string, BaseItemData> = {
  'iron_ore': {
    itemId: 'iron_ore',
    itemNameKey: 'items.iron_ore.name',
    defaultItemName: 'Železná ruda',
    itemDescriptionKey: 'items.iron_ore.description',
    defaultItemDescription: 'Běžná kovová ruda těžená z asteroidů. Používá se k výrobě základních komponent.',
    itemIconKey: 'resource_iron_ore',
    itemTypeKey: 'item.type.resource',
    defaultItemType: 'Surovina',
    isStackable: true,
    maxStackSize: 100,
    baseValue_Credits: 10,
    weightPerUnit: 1,
    rarity: ItemRarity.Common
  },
  'titanium_alloy': {
    itemId: 'titanium_alloy',
    itemNameKey: 'items.titanium_alloy.name',
    defaultItemName: 'Titanová slitina',
    itemDescriptionKey: 'items.titanium_alloy.description',
    defaultItemDescription: 'Odolná lehká slitina. Ideální pro konstrukci trupu lodí a stanic.',
    itemIconKey: 'resource_titanium_alloy',
    itemTypeKey: 'item.type.component',
    defaultItemType: 'Komponenta',
    isStackable: true,
    maxStackSize: 50,
    baseValue_Credits: 45,
    weightPerUnit: 1.5,
    rarity: ItemRarity.Uncommon
  },
  'quantum_processor': {
    itemId: 'quantum_processor',
    itemNameKey: 'items.quantum_processor.name',
    defaultItemName: 'Kvantový procesor',
    itemDescriptionKey: 'items.quantum_processor.description',
    defaultItemDescription: 'Pokročilý výpočetní komponent pro navigační systémy a AI.',
    itemIconKey: 'component_quantum_processor',
    itemTypeKey: 'item.type.component',
    defaultItemType: 'Komponenta',
    isStackable: true,
    maxStackSize: 10,
    baseValue_Credits: 350,
    weightPerUnit: 0.5,
    rarity: ItemRarity.Rare
  },
  'laser_cannon_mk2': {
    itemId: 'laser_cannon_mk2',
    itemNameKey: 'items.laser_cannon_mk2.name',
    defaultItemName: 'Laserový kanón Mk2',
    itemDescriptionKey: 'items.laser_cannon_mk2.description',
    defaultItemDescription: 'Vylepšená verze standardního laserového kanónu. Vyšší účinnost a rychlost nabíjení.',
    itemIconKey: 'module_weapon_laser_mk2',
    itemTypeKey: 'item.type.ship_module',
    defaultItemType: 'Lodní modul',
    isStackable: false,
    baseValue_Credits: 2500,
    weightPerUnit: 12,
    rarity: ItemRarity.Rare
  },
  'ancient_datapad': {
    itemId: 'ancient_datapad',
    itemNameKey: 'items.ancient_datapad.name',
    defaultItemName: 'Prastarý datapad',
    itemDescriptionKey: 'items.ancient_datapad.description',
    defaultItemDescription: 'Záhadné zařízení s neznámou technologií. Obsahuje fragmenty prastarých textů a souřadnic.',
    itemIconKey: 'questitem_ancient_datapad',
    itemTypeKey: 'item.type.quest_item',
    defaultItemType: 'Misijní předmět',
    isStackable: false,
    baseValue_Credits: 0,
    rarity: ItemRarity.Artifact,
    loreTextKey: 'items.ancient_datapad.lore',
    defaultLoreText: 'Tento datapad byl nalezen v troskách lodi neznámého původu. Jeho pokročilá technologie naznačuje souvislost s legendárními Předchůdci.'
  }
};

// Initialize mock inventory data
const initializeInventoryData = (): InventoryData => {
  // Create cargo hold with 24 slots (6x4 grid)
  const cargoHoldSlots: InventorySlot[] = Array(24).fill(null).map((_, index) => ({
    slotId: `cargo-${index}`,
    isLocked: index >= 18 // Last row is locked initially
  }));
  
  // Add some items to the cargo hold for testing
  cargoHoldSlots[0].containedItem = {
    itemInstanceId: 'instance-iron-1',
    baseItemId: 'iron_ore',
    quantity: 50
  };
  
  cargoHoldSlots[1].containedItem = {
    itemInstanceId: 'instance-titanium-1',
    baseItemId: 'titanium_alloy',
    quantity: 25
  };
  
  cargoHoldSlots[2].containedItem = {
    itemInstanceId: 'instance-laser-1',
    baseItemId: 'laser_cannon_mk2',
    quantity: 1
  };

  // Create specialized storage for each type
  const specializedStorage: Record<SpecializedStorageType, SpecializedStorageData> = {
    [SpecializedStorageType.RawMaterials]: {
      type: SpecializedStorageType.RawMaterials,
      items: [
        {
          itemInstanceId: 'instance-iron-2',
          baseItemId: 'iron_ore',
          quantity: 75
        }
      ]
    },
    [SpecializedStorageType.CraftingComponents]: {
      type: SpecializedStorageType.CraftingComponents,
      items: [
        {
          itemInstanceId: 'instance-quantum-1',
          baseItemId: 'quantum_processor',
          quantity: 2
        }
      ]
    },
    [SpecializedStorageType.ShipModules_Unequipped]: {
      type: SpecializedStorageType.ShipModules_Unequipped,
      items: []
    },
    [SpecializedStorageType.TradeGoods_Commodities]: {
      type: SpecializedStorageType.TradeGoods_Commodities,
      items: []
    },
    [SpecializedStorageType.QuestItems_KeyItems]: {
      type: SpecializedStorageType.QuestItems_KeyItems,
      items: [
        {
          itemInstanceId: 'instance-datapad-1',
          baseItemId: 'ancient_datapad',
          quantity: 1
        }
      ]
    },
    [SpecializedStorageType.Artifacts_UniqueDiscoveries]: {
      type: SpecializedStorageType.Artifacts_UniqueDiscoveries,
      items: []
    }
  };

  // Calculate used capacity
  let usedCapacity = 0;
  cargoHoldSlots.forEach(slot => {
    if (slot.containedItem) {
      const item = mockItems[slot.containedItem.baseItemId];
      usedCapacity += (item.weightPerUnit || 1) * slot.containedItem.quantity;
    }
  });

  return {
    cargoHold: {
      totalCapacity: 100,
      usedCapacity,
      slots: cargoHoldSlots
    },
    specializedStorage,
    selectedItemId: undefined,
    filterType: undefined,
    sortKey: undefined,
    searchText: undefined
  };
};

interface InventoryProviderProps {
  children: ReactNode;
}

interface InventoryContextType {
  inventory: InventoryData;
  itemDatabase: Record<string, BaseItemData>;
  selectItem: (itemInstanceId?: string) => void;
  moveItem: (fromSlotId: string, toSlotId: string, quantity?: number) => void;
  dropItem: (itemInstanceId: string, quantity?: number) => void;
  useItem: (itemInstanceId: string) => void;
  setFilter: (filterType?: string) => void;
  setSort: (sortKey?: string) => void;
  setSearchText: (text?: string) => void;
  getItemById: (itemId: string) => BaseItemData | undefined;
  getItemsByFilter: (filterType?: string, searchText?: string) => ItemInstance[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryData>(initializeInventoryData);

  // Simulate loading inventory data from storage on component mount
  useEffect(() => {
    const savedInventory = localStorage.getItem('playerInventory');
    if (savedInventory) {
      try {
        setInventory(JSON.parse(savedInventory));
      } catch (error) {
        console.error('Failed to load inventory from storage:', error);
      }
    }
  }, []);

  // Save inventory changes to storage
  useEffect(() => {
    localStorage.setItem('playerInventory', JSON.stringify(inventory));
  }, [inventory]);

  // Select an item
  const selectItem = (itemInstanceId?: string) => {
    setInventory(prev => ({
      ...prev,
      selectedItemId: itemInstanceId
    }));
  };

  // Get item data by ID
  const getItemById = (itemId: string): BaseItemData | undefined => {
    return mockItems[itemId];
  };

  // Move item between slots
  const moveItem = (fromSlotId: string, toSlotId: string, quantity?: number) => {
    // Implementation would handle moving items between slots in the cargo hold
    // or between cargo hold and specialized storage
    toast.success("Předmět přemístěn");
  };

  // Drop item (destroy)
  const dropItem = (itemInstanceId: string, quantity?: number) => {
    // Implementation would handle removing items from inventory
    toast.error("Předmět byl zahozen");
  };

  // Use item (consumables)
  const useItem = (itemInstanceId: string) => {
    // Implementation would handle using consumable items
    toast.info("Předmět byl použit");
  };

  // Set filter for item display
  const setFilter = (filterType?: string) => {
    setInventory(prev => ({
      ...prev,
      filterType
    }));
  };

  // Set sort method for item display
  const setSort = (sortKey?: string) => {
    setInventory(prev => ({
      ...prev,
      sortKey
    }));
  };

  // Set search text
  const setSearchText = (searchText?: string) => {
    setInventory(prev => ({
      ...prev,
      searchText
    }));
  };

  // Get items matching current filter and search
  const getItemsByFilter = (filterType?: string, searchText?: string): ItemInstance[] => {
    // Start with all items from cargo hold
    let filteredItems: ItemInstance[] = inventory.cargoHold.slots
      .filter(slot => slot.containedItem)
      .map(slot => slot.containedItem as ItemInstance);
    
    // Add items from specialized storage if no filter or if filter matches storage type
    Object.values(inventory.specializedStorage).forEach(storage => {
      if (!filterType || storage.type === filterType) {
        filteredItems = [...filteredItems, ...storage.items];
      }
    });
    
    // Filter by item type if specified
    if (filterType) {
      filteredItems = filteredItems.filter(item => {
        const baseItem = mockItems[item.baseItemId];
        return baseItem.itemTypeKey === filterType;
      });
    }
    
    // Filter by search text if specified
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filteredItems = filteredItems.filter(item => {
        const baseItem = mockItems[item.baseItemId];
        return (
          baseItem.defaultItemName.toLowerCase().includes(searchLower) ||
          baseItem.defaultItemDescription.toLowerCase().includes(searchLower)
        );
      });
    }
    
    return filteredItems;
  };

  const value = {
    inventory,
    itemDatabase: mockItems,
    selectItem,
    moveItem,
    dropItem,
    useItem,
    setFilter,
    setSort,
    setSearchText,
    getItemById,
    getItemsByFilter,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
