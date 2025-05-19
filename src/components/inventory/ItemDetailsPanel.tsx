
import React from 'react';
import { useInventory } from "@/contexts/InventoryContext";
import { ItemRarity, SpecializedStorageType } from "@/types/inventory";

interface ItemDetailsPanelProps {
  itemInstanceId: string;
}

const ItemDetailsPanel: React.FC<ItemDetailsPanelProps> = ({ itemInstanceId }) => {
  const { inventory, itemDatabase, getItemById } = useInventory();
  
  // Find the item instance in the inventory
  let itemInstance = null;
  
  // Check cargo hold first
  for (const slot of inventory.cargoHold.slots) {
    if (slot.containedItem && slot.containedItem.itemInstanceId === itemInstanceId) {
      itemInstance = slot.containedItem;
      break;
    }
  }
  
  // If not found in cargo hold, check specialized storage
  if (!itemInstance) {
    for (const storageType of Object.values(SpecializedStorageType)) {
      const storage = inventory.specializedStorage[storageType];
      const foundItem = storage.items.find(item => item.itemInstanceId === itemInstanceId);
      if (foundItem) {
        itemInstance = foundItem;
        break;
      }
    }
  }
  
  if (!itemInstance) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-space-ui-subtext">Položka nebyla nalezena</p>
      </div>
    );
  }
  
  const itemData = getItemById(itemInstance.baseItemId);
  if (!itemData) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-space-ui-subtext">Neplatná položka</p>
      </div>
    );
  }
  
  // Helper function to get color based on rarity
  const getRarityColor = (rarity: ItemRarity) => {
    switch (rarity) {
      case ItemRarity.Common: return 'text-gray-200';
      case ItemRarity.Uncommon: return 'text-green-400';
      case ItemRarity.Rare: return 'text-blue-400';
      case ItemRarity.Epic: return 'text-purple-400';
      case ItemRarity.Legendary: return 'text-yellow-400';
      case ItemRarity.Artifact: return 'text-red-400';
      default: return 'text-gray-200';
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="h-16 w-16 mr-4 bg-space-buttons flex items-center justify-center text-2xl">
          {itemData.defaultItemName.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-pixel">{itemData.defaultItemName}</h3>
          <div className="flex items-center">
            <span className={`text-sm ${getRarityColor(itemData.rarity)}`}>{itemData.rarity}</span>
            <span className="mx-2 text-space-ui-subtext">•</span>
            <span className="text-sm text-space-ui-subtext">{itemData.defaultItemType}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-space-buttons-border pt-3 mb-4">
        <p className="text-sm text-space-ui-text">
          {itemData.defaultItemDescription}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-4">
        {itemData.isStackable && (
          <div className="bg-space-dark/60 px-3 py-2 rounded-md">
            <span className="text-xs text-space-ui-subtext">Množství</span>
            <p className="text-space-ui-text">{itemInstance.quantity} / {itemData.maxStackSize || "∞"}</p>
          </div>
        )}
        
        {itemData.weightPerUnit && (
          <div className="bg-space-dark/60 px-3 py-2 rounded-md">
            <span className="text-xs text-space-ui-subtext">Váha za jednotku</span>
            <p className="text-space-ui-text">{itemData.weightPerUnit}</p>
          </div>
        )}
        
        <div className="bg-space-dark/60 px-3 py-2 rounded-md">
          <span className="text-xs text-space-ui-subtext">Hodnota</span>
          <p className="text-space-ui-text">{itemData.baseValue_Credits} kr.</p>
        </div>
      </div>
      
      {itemData.defaultLoreText && (
        <div className="mt-auto pt-3 border-t border-space-buttons-border">
          <h4 className="text-sm text-space-ui-subtext mb-1">Informace:</h4>
          <p className="text-sm italic text-space-ui-text/80">
            {itemData.defaultLoreText}
          </p>
        </div>
      )}
    </div>
  );
};

export default ItemDetailsPanel;
