
import React from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import { useTrade } from '@/contexts/TradeContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const TraderInventory: React.FC = () => {
  const { itemDatabase } = useInventory();
  const { tradeState, selectTraderItem } = useTrade();
  
  return (
    <div className="flex flex-col h-full bg-space-dark/80 border border-space-buttons-border rounded-lg">
      <div className="px-4 py-2 border-b border-space-buttons-border">
        <h2 className="text-lg font-pixel text-space-ui-text">
          Nabídka: {tradeState.marketInfo.stationName}
        </h2>
        <p className="text-xs text-space-ui-subtext">
          Specializace: {tradeState.marketInfo.specializations.join(', ')}
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {tradeState.traderInventory.length > 0 ? (
            <div className="space-y-1">
              {tradeState.traderInventory.map((traderItem) => {
                const baseItem = itemDatabase[traderItem.itemInstance.baseItemId];
                if (!baseItem) return null;
                
                const isSelected = tradeState.selectedItem?.itemInstance.itemInstanceId === traderItem.itemInstance.itemInstanceId;
                
                return (
                  <div 
                    key={traderItem.itemInstance.itemInstanceId}
                    onClick={() => selectTraderItem(traderItem)}
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
                        {baseItem.defaultItemType} • {traderItem.stockQuantity} ks
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-pixel text-red-400">
                        {traderItem.buyPrice_ForPlayer} Cr
                      </div>
                      <div className="text-xs text-space-ui-subtext">
                        Poptávka: 
                        <span className={`ml-1 ${
                          traderItem.marketDemandIndicator === 'High' ? 'text-green-400' :
                          traderItem.marketDemandIndicator === 'Medium' ? 'text-yellow-400' :
                          'text-gray-400'
                        }`}>
                          {traderItem.marketDemandIndicator}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-6 text-space-ui-subtext">
              <p>Obchodník nemá žádné zboží</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TraderInventory;
