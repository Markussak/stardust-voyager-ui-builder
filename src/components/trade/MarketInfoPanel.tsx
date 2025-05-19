
import React from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import { useTrade } from '@/contexts/TradeContext';
import { ArrowDown, ArrowUp } from 'lucide-react';

const MarketInfoPanel: React.FC = () => {
  const { itemDatabase } = useInventory();
  const { tradeState } = useTrade();
  
  if (!tradeState.selectedItem) {
    return (
      <div className="bg-space-dark/80 border border-space-buttons-border rounded-lg p-4">
        <h3 className="text-lg font-pixel text-space-ui-text mb-2">Informace o trhu</h3>
        <p className="text-space-ui-subtext text-sm">
          Vyberte položku pro zobrazení tržních informací.
        </p>
      </div>
    );
  }
  
  const { itemInstance, isPlayerItem } = tradeState.selectedItem;
  const baseItem = itemDatabase[itemInstance.baseItemId];
  if (!baseItem) return null;
  
  // Mock market data for demonstration
  const demandLevel = tradeState.marketInfo.demandModifiers[itemInstance.baseItemId] || 1.0;
  const demandDescription = demandLevel > 1.1 ? 'Vysoká' : demandLevel > 0.9 ? 'Střední' : 'Nízká';
  const priceHistory = [95, 100, 98, 110, 105, 115];
  
  return (
    <div className="bg-space-dark/80 border border-space-buttons-border rounded-lg p-4">
      <h3 className="text-lg font-pixel text-space-ui-text mb-3">{baseItem.defaultItemName}</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-space-ui-text text-sm">Poptávka na stanici:</span>
          <div className="flex items-center">
            <span className={`text-sm mr-2 ${
              demandLevel > 1.1 ? 'text-green-400' : 
              demandLevel > 0.9 ? 'text-yellow-400' : 
              'text-red-400'
            }`}>
              {demandDescription}
            </span>
            {demandLevel > 1.1 ? (
              <ArrowUp size={16} className="text-green-400" />
            ) : demandLevel < 0.9 ? (
              <ArrowDown size={16} className="text-red-400" />
            ) : (
              <span className="w-4 h-0.5 bg-yellow-400 block"></span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-space-ui-text text-sm">Galaktická průměrná cena:</span>
          <span className="text-space-ui-text font-pixel">
            {Math.round(baseItem.baseValue_Credits * 0.9)} - {Math.round(baseItem.baseValue_Credits * 1.1)} Cr
          </span>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-space-ui-text text-sm">Cenová historie:</span>
          </div>
          <div className="relative h-12 w-full">
            <div className="absolute inset-0 flex items-end">
              {priceHistory.map((price, index) => (
                <div 
                  key={index} 
                  className="flex-1 transition-all bg-space-buttons-border/30"
                  style={{ 
                    height: `${(price / 120) * 100}%`,
                    marginLeft: index > 0 ? '2px' : '0'
                  }}
                >
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 border-t border-dashed border-space-ui-text/30 opacity-50"></div>
          </div>
          <div className="flex justify-between text-xs text-space-ui-subtext mt-1">
            <span>-6h</span>
            <span>-5h</span>
            <span>-4h</span>
            <span>-3h</span>
            <span>-2h</span>
            <span>-1h</span>
          </div>
        </div>
        
        <div className="pt-2 mt-2 border-t border-space-buttons-border">
          <p className="text-xs text-space-ui-subtext italic">
            {tradeState.marketInfo.specializations.includes('Mining') && baseItem.defaultItemType === 'Surovina' ? (
              "Tato stanice platí prémiové ceny za suroviny díky specializaci Mining."
            ) : (
              "Pro lepší ceny hledejte stanice specializované na tento typ zboží."
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketInfoPanel;
