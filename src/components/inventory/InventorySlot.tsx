
import React from 'react';
import { useInventory } from "@/contexts/InventoryContext";
import { InventorySlot, ItemRarity } from "@/types/inventory";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InventorySlotProps {
  slot: InventorySlot;
  className?: string;
}

const getRarityColor = (rarity: ItemRarity): string => {
  switch (rarity) {
    case ItemRarity.Common: return "border-neutral-400";
    case ItemRarity.Uncommon: return "border-green-500";
    case ItemRarity.Rare: return "border-blue-500";
    case ItemRarity.Epic: return "border-purple-500";
    case ItemRarity.Legendary: return "border-amber-500";
    case ItemRarity.Artifact: return "border-yellow-400";
    default: return "border-neutral-400";
  }
};

const getRarityGlow = (rarity: ItemRarity): string => {
  switch (rarity) {
    case ItemRarity.Common: return "";
    case ItemRarity.Uncommon: return "shadow-sm shadow-green-500/50";
    case ItemRarity.Rare: return "shadow-md shadow-blue-500/50";
    case ItemRarity.Epic: return "shadow-md shadow-purple-500/50";
    case ItemRarity.Legendary: return "shadow-lg shadow-amber-500/50";
    case ItemRarity.Artifact: return "shadow-lg shadow-yellow-400/50 animate-pulse";
    default: return "";
  }
};

const InventorySlotComponent: React.FC<InventorySlotProps> = ({ slot, className }) => {
  const { itemDatabase, selectItem } = useInventory();
  const { containedItem, isLocked } = slot;
  
  const baseItem = containedItem ? itemDatabase[containedItem.baseItemId] : undefined;
  const rarityClass = baseItem ? getRarityColor(baseItem.rarity) : "";
  const glowClass = baseItem ? getRarityGlow(baseItem.rarity) : "";
  
  const handleClick = () => {
    if (containedItem && !isLocked) {
      selectItem(containedItem.itemInstanceId);
    }
  };

  // Placeholder for item icons - in a real implementation, these would be images
  const getIconPlaceholder = (itemId: string) => {
    const colors: Record<string, string> = {
      'iron_ore': 'bg-gray-400',
      'titanium_alloy': 'bg-sky-300',
      'quantum_processor': 'bg-purple-500',
      'laser_cannon_mk2': 'bg-red-500',
      'ancient_datapad': 'bg-yellow-400',
    };
    
    return colors[itemId] || 'bg-gray-500';
  };

  if (isLocked) {
    return (
      <div 
        className={cn(
          "border border-gray-700 bg-gray-900/30 flex items-center justify-center",
          className
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-1/3 h-1/3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              "border bg-black/40 cursor-pointer transition-all",
              "hover:border-space-buttons-glow hover:bg-space-dark/60",
              rarityClass,
              glowClass,
              containedItem ? "border-opacity-100" : "border-space-buttons-border border-opacity-50",
              className
            )}
            onClick={handleClick}
          >
            {containedItem ? (
              <div className="h-full w-full p-1 flex flex-col">
                <div className={`flex-1 ${getIconPlaceholder(containedItem.baseItemId)} flex items-center justify-center`}>
                  <span className="text-xs font-pixel text-black">{baseItem?.defaultItemName.substring(0, 3)}</span>
                </div>
                {baseItem?.isStackable && containedItem.quantity > 1 && (
                  <div className="text-right text-xs font-pixel pt-1">
                    {containedItem.quantity}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </TooltipTrigger>
        {baseItem && (
          <TooltipContent side="top" className="bg-space-dark border-space-buttons-border">
            <div>
              <p className="text-sm font-pixel">{baseItem.defaultItemName}</p>
              <p className="text-xs text-gray-400">{baseItem.defaultItemType}</p>
              {baseItem.isStackable && containedItem && (
                <p className="text-xs">Množství: {containedItem.quantity}</p>
              )}
              <p className="text-xs text-space-ui-text">{baseItem.baseValue_Credits} kreditů</p>
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default InventorySlotComponent;
