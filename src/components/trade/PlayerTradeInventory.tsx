
import React from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import { useTrade } from '@/contexts/TradeContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ItemInstance } from '@/types/inventory';

const PlayerTradeInventory: React.FC = () => {
  const { inventory, itemDatabase } = useInventory();
  const { selectPlayerItem, tradeState, getItemSellPrice } = useTrade();
  
  // Get all items from cargo hold and specialized storages
  const getAllPlayerItems = (): ItemInstance[] => {
    const cargoItems = inventory.cargoHold.slots
      .filter(slot => slot.containedItem)
      .map(slot => slot.containedItem as ItemInstance);
      
    const storageItems: ItemInstance[] = [];
    Object.values(inventory.specializedStorage).forEach(storage => {
      storageItems.push(...storage.items);
    });
    
    return [...cargoItems, ...storageItems];
  };
  
  const playerItems = getAllPlayerItems();
  
  return (
    <div className="flex flex-col h-full bg-space-dark/80 border border-space-buttons-border rounded-lg">
      <div className="px-4 py-2 border-b border-space-buttons-border">
        <h2 className="text-lg font-pixel text-space-ui-text">Tvůj náklad na prodej</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {playerItems.length > 0 ? (
            <div className="space-y-1">
              {playerItems.map((item) => {
                const baseItem = itemDatabase[item.baseItemId];
                if (!baseItem) return null;
                
                const sellPrice = getItemSellPrice(item.baseItemId);
                const isSelected = tradeState.selectedItem?.itemInstance.itemInstanceId === item.itemInstanceId;
                
                return (
                  <div 
                    key={item.itemInstanceId}
                    onClick={() => selectPlayerItem(item)}
                    className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                      isSelected ? 'bg-space-buttons border-space-buttons-border' : 'hover:bg-space-buttons/20 border border-transparent'
                    }`}
                  >
                    <div className="h-10 w-10 bg-space-dark/60 border border-space-buttons-border rounded-md flex items-center justify-center text-lg font-bold mr-3">
                      {baseItem.defaultItemName.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-pixel text-space-ui-text">
                        {baseItem.defaultItemName}
                      </div>
                      <div className="text-xs text-space-ui-subtext">
                        {baseItem.defaultItemType} • {item.quantity} ks
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-pixel text-green-400">
                        {sellPrice} Cr
                      </div>
                      <div className="text-xs text-space-ui-subtext">
                        za kus
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-6 text-space-ui-subtext">
              <p>Nemáte žádné předměty k prodeji</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PlayerTradeInventory;
