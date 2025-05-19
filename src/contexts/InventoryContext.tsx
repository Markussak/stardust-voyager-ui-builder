
import React, { createContext, useContext, useReducer, useState, ReactNode } from "react";
import { InventoryItem, InventorySlotType, SpecializedStorageType } from "../types/inventory";

// Initial state type definition
interface InventoryState {
  slots: {
    [key: string]: InventoryItem | null;
  };
  selectedItemId: string | null;
  specializedStorage: {
    [key in SpecializedStorageType]?: {
      [slotId: string]: InventoryItem | null;
    };
  };
  filters: {
    category: string | null;
    search: string;
    sortBy: 'name' | 'value' | 'weight' | 'rarity';
    sortDirection: 'asc' | 'desc';
  };
}

// Define the context interface
interface InventoryContextType {
  inventoryState: InventoryState;
  selectItem: (itemId: string | null) => void;
  addItem: (item: InventoryItem) => boolean;
  removeItem: (slotId: string) => InventoryItem | null;
  moveItem: (fromSlotId: string, toSlotId: string) => boolean;
  updateFilters: (filters: Partial<InventoryState["filters"]>) => void;
  clearFilters: () => void;
  getItemById: (itemId: string) => InventoryItem | null;
}

// Initial state
const initialInventoryState: InventoryState = {
  slots: {
    "slot1": {
      id: "item1",
      name: "Power Crystal",
      description: "A rare energy source that powers advanced technology.",
      type: "resource",
      quantity: 5,
      value: 500,
      rarity: "rare",
      iconSrc: "/placeholder.svg",
    },
    "slot2": {
      id: "item2",
      name: "Shield Module",
      description: "Enhanced shield generator for spacecraft.",
      type: "module",
      quantity: 1,
      value: 1200,
      rarity: "uncommon",
      iconSrc: "/placeholder.svg",
    },
    "slot3": {
      id: "item3",
      name: "Repair Kit",
      description: "Basic kit for repairing hull damage.",
      type: "consumable",
      quantity: 3,
      value: 150,
      rarity: "common",
      iconSrc: "/placeholder.svg",
    },
    "slot4": null,
    "slot5": null,
    "slot6": null,
    "slot7": null,
    "slot8": null,
    "slot9": null,
    "slot10": null,
    "slot11": null,
    "slot12": null
  },
  selectedItemId: null,
  specializedStorage: {
    [SpecializedStorageType.Resources]: {
      "resource1": {
        id: "resource_crystal",
        name: "Raw Crystal",
        description: "Raw crystalline material for crafting.",
        type: "resource",
        quantity: 25,
        value: 10,
        rarity: "common",
        iconSrc: "/placeholder.svg",
      },
      "resource2": {
        id: "resource_metal",
        name: "Refined Metal",
        description: "Processed metal alloy.",
        type: "resource",
        quantity: 40,
        value: 15,
        rarity: "common",
        iconSrc: "/placeholder.svg",
      }
    },
    [SpecializedStorageType.Components]: {
      "component1": {
        id: "component_circuit",
        name: "Circuit Board",
        description: "Electronic component used in crafting.",
        type: "component",
        quantity: 8,
        value: 75,
        rarity: "uncommon",
        iconSrc: "/placeholder.svg",
      }
    }
  },
  filters: {
    category: null,
    search: "",
    sortBy: 'name',
    sortDirection: 'asc'
  }
};

// Create context
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Provider component
export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [inventoryState, setInventoryState] = useState<InventoryState>(initialInventoryState);

  const selectItem = (itemId: string | null) => {
    setInventoryState(prevState => ({
      ...prevState,
      selectedItemId: itemId
    }));
  };

  const getItemById = (itemId: string): InventoryItem | null => {
    // Check in regular slots
    for (const slotId in inventoryState.slots) {
      const item = inventoryState.slots[slotId];
      if (item && item.id === itemId) {
        return item;
      }
    }
    
    // Check in specialized storage
    for (const storageType in inventoryState.specializedStorage) {
      const storage = inventoryState.specializedStorage[storageType as SpecializedStorageType];
      if (storage) {
        for (const slotId in storage) {
          const item = storage[slotId];
          if (item && item.id === itemId) {
            return item;
          }
        }
      }
    }
    
    return null;
  };

  const addItem = (item: InventoryItem): boolean => {
    // Find an empty slot
    let emptySlotId: string | null = null;
    
    for (const slotId in inventoryState.slots) {
      if (!inventoryState.slots[slotId]) {
        emptySlotId = slotId;
        break;
      }
    }
    
    if (!emptySlotId) {
      console.log("Inventory is full");
      return false;
    }
    
    setInventoryState(prevState => ({
      ...prevState,
      slots: {
        ...prevState.slots,
        [emptySlotId!]: item
      }
    }));
    
    return true;
  };

  const removeItem = (slotId: string): InventoryItem | null => {
    const item = inventoryState.slots[slotId];
    
    if (!item) {
      console.log("No item in this slot");
      return null;
    }
    
    setInventoryState(prevState => ({
      ...prevState,
      slots: {
        ...prevState.slots,
        [slotId]: null
      }
    }));
    
    return item;
  };

  const moveItem = (fromSlotId: string, toSlotId: string): boolean => {
    const fromItem = inventoryState.slots[fromSlotId];
    const toItem = inventoryState.slots[toSlotId];
    
    if (!fromItem) {
      console.log("No item to move");
      return false;
    }
    
    setInventoryState(prevState => ({
      ...prevState,
      slots: {
        ...prevState.slots,
        [fromSlotId]: toItem,
        [toSlotId]: fromItem
      }
    }));
    
    return true;
  };

  const updateFilters = (filters: Partial<InventoryState["filters"]>) => {
    setInventoryState(prevState => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        ...filters
      }
    }));
  };

  const clearFilters = () => {
    setInventoryState(prevState => ({
      ...prevState,
      filters: {
        category: null,
        search: "",
        sortBy: 'name',
        sortDirection: 'asc'
      }
    }));
  };

  return (
    <InventoryContext.Provider value={{
      inventoryState,
      selectItem,
      addItem,
      removeItem,
      moveItem,
      updateFilters,
      clearFilters,
      getItemById
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook to use the inventory context
export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};
