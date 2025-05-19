
import React from 'react';
import { useInventory } from "@/contexts/InventoryContext";
import { ItemRarity } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, Info, Trash2, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ItemDetailsPanelProps {
  itemInstanceId: string;
}

const getRarityColor = (rarity: ItemRarity): string => {
  switch (rarity) {
    case ItemRarity.Common: return "text-neutral-400";
    case ItemRarity.Uncommon: return "text-green-500";
    case ItemRarity.Rare: return "text-blue-500";
    case ItemRarity.Epic: return "text-purple-500";
    case ItemRarity.Legendary: return "text-amber-500";
    case ItemRarity.Artifact: return "text-yellow-400";
    default: return "text-neutral-400";
  }
};

const getRarityText = (rarity: ItemRarity): string => {
  switch (rarity) {
    case ItemRarity.Common: return "Běžný";
    case ItemRarity.Uncommon: return "Neobvyklý";
    case ItemRarity.Rare: return "Vzácný";
    case ItemRarity.Epic: return "Epický";
    case ItemRarity.Legendary: return "Legendární";
    case ItemRarity.Artifact: return "Artefakt";
    default: return "Neznámý";
  }
};

const ItemDetailsPanel: React.FC<ItemDetailsPanelProps> = ({ itemInstanceId }) => {
  const { inventory, itemDatabase, dropItem, useItem } = useInventory();
  
  // Find the item instance across all storage types
  const findItemInstance = () => {
    // Check cargo hold
    for (const slot of inventory.cargoHold.slots) {
      if (slot.containedItem?.itemInstanceId === itemInstanceId) {
        return slot.containedItem;
      }
    }
    
    // Check specialized storage
    for (const storageType in inventory.specializedStorage) {
      const storage = inventory.specializedStorage[storageType as SpecializedStorageType];
      const found = storage.items.find(item => item.itemInstanceId === itemInstanceId);
      if (found) {
        return found;
      }
    }
    
    return undefined;
  };
  
  const itemInstance = findItemInstance();
  
  if (!itemInstance) {
    return (
      <div className="h-full flex items-center justify-center text-space-ui-subtext">
        <p>Předmět nenalezen</p>
      </div>
    );
  }
  
  const baseItem = itemDatabase[itemInstance.baseItemId];
  
  if (!baseItem) {
    return (
      <div className="h-full flex items-center justify-center text-space-ui-subtext">
        <p>Chyba při načítání dat předmětu</p>
      </div>
    );
  }
  
  const rarityColorClass = getRarityColor(baseItem.rarity);
  const rarityText = getRarityText(baseItem.rarity);
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 mr-3 bg-space-buttons border border-space-buttons-border flex items-center justify-center">
          <Package size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-pixel">{baseItem.defaultItemName}</h3>
          <div className="flex items-center">
            <Badge variant="outline" className="mr-2">{baseItem.defaultItemType}</Badge>
            <span className={`text-xs ${rarityColorClass}`}>{rarityText}</span>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="text-xs text-space-ui-subtext">Popis:</div>
            <p className="text-sm">{baseItem.defaultItemDescription}</p>
          </div>
          
          {itemInstance.quantity > 1 && (
            <div className="space-y-1">
              <div className="text-xs text-space-ui-subtext">Množství:</div>
              <p className="text-sm">{itemInstance.quantity}</p>
            </div>
          )}
          
          <div className="space-y-1">
            <div className="text-xs text-space-ui-subtext">Hodnota:</div>
            <p className="text-sm">{baseItem.baseValue_Credits} kreditů{itemInstance.quantity > 1 ? ` (celkem: ${baseItem.baseValue_Credits * itemInstance.quantity})` : ''}</p>
          </div>
          
          {baseItem.weightPerUnit && (
            <div className="space-y-1">
              <div className="text-xs text-space-ui-subtext">Hmotnost:</div>
              <p className="text-sm">{baseItem.weightPerUnit} jednotek{itemInstance.quantity > 1 ? ` (celkem: ${baseItem.weightPerUnit * itemInstance.quantity})` : ''}</p>
            </div>
          )}
          
          {baseItem.defaultLoreText && (
            <div className="space-y-1 pt-2 border-t border-space-buttons-border">
              <div className="text-xs text-space-ui-subtext flex items-center">
                <Info size={12} className="mr-1" /> Podrobnosti:
              </div>
              <p className="text-sm italic text-space-ui-subtext">{baseItem.defaultLoreText}</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="mt-4 flex gap-2 justify-end">
        {baseItem.isStackable && itemInstance.quantity > 1 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {}} 
            className="border-space-buttons-border hover:bg-space-buttons-hover"
          >
            <Layers size={16} className="mr-1" />
            Rozdělit
          </Button>
        )}
        
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => dropItem(itemInstanceId)}
        >
          <Trash2 size={16} className="mr-1" />
          Zahodit
        </Button>
      </div>
    </div>
  );
};

export default ItemDetailsPanel;
