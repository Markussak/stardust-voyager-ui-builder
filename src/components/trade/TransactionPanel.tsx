
import React, { useEffect, useState } from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import { useTrade } from '@/contexts/TradeContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

const TransactionPanel: React.FC = () => {
  const { itemDatabase } = useInventory();
  const { 
    tradeState, 
    setTransactionQuantity, 
    clearTransaction, 
    executeBuyTransaction, 
    executeSellTransaction,
    getItemSellPrice,
    canPlayerAfford
  } = useTrade();
  
  const [inputQuantity, setInputQuantity] = useState<string>('1');
  
  // Reset input quantity when selected item changes
  useEffect(() => {
    setInputQuantity(tradeState.transactionQuantity.toString());
  }, [tradeState.selectedItem, tradeState.transactionQuantity]);
  
  const handleQuantityChange = (value: number[]) => {
    setTransactionQuantity(value[0]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Only allow digits
      setInputQuantity(value);
      const numValue = value === '' ? 1 : parseInt(value, 10);
      if (!isNaN(numValue)) {
        setTransactionQuantity(numValue);
      }
    }
  };
  
  const handleSetMaxQuantity = () => {
    if (!tradeState.selectedItem) return;
    
    if (tradeState.transactionMode === 'buy') {
      const itemSlot = tradeState.traderInventory.find(
        item => item.itemInstance.itemInstanceId === tradeState.selectedItem?.itemInstance.itemInstanceId
      );
      if (!itemSlot) return;
      
      const maxAffordable = Math.floor(tradeState.playerCredits / itemSlot.buyPrice_ForPlayer);
      const maxAvailable = itemSlot.stockQuantity || 1;
      setTransactionQuantity(Math.min(maxAffordable, maxAvailable));
    } else if (tradeState.transactionMode === 'sell') {
      setTransactionQuantity(tradeState.selectedItem.itemInstance.quantity);
    }
  };
  
  if (!tradeState.selectedItem || tradeState.transactionMode === 'none') {
    return (
      <div className="flex flex-col h-full bg-space-dark/80 border border-space-buttons-border rounded-lg p-6 items-center justify-center">
        <p className="text-space-ui-subtext text-center">
          Vyberte položku z vašeho nákladu nebo nabídky obchodníka pro zahájení transakce.
        </p>
      </div>
    );
  }
  
  const { itemInstance, isPlayerItem } = tradeState.selectedItem;
  const baseItem = itemDatabase[itemInstance.baseItemId];
  if (!baseItem) return null;
  
  // Calculate prices based on transaction type
  const unitPrice = isPlayerItem
    ? getItemSellPrice(itemInstance.baseItemId)
    : tradeState.traderInventory.find(i => i.itemInstance.itemInstanceId === itemInstance.itemInstanceId)?.buyPrice_ForPlayer || 0;
  
  const totalPrice = unitPrice * tradeState.transactionQuantity;
  
  // Calculate max quantity
  let maxQuantity = 1;
  if (isPlayerItem) {
    maxQuantity = itemInstance.quantity;
  } else {
    const traderItem = tradeState.traderInventory.find(
      i => i.itemInstance.itemInstanceId === itemInstance.itemInstanceId
    );
    if (traderItem) {
      const maxAffordable = Math.floor(tradeState.playerCredits / traderItem.buyPrice_ForPlayer);
      maxQuantity = Math.min(traderItem.stockQuantity || 1, maxAffordable);
    }
  }
  
  const canAfford = isPlayerItem || canPlayerAfford(totalPrice);
  const newBalance = isPlayerItem
    ? tradeState.playerCredits + totalPrice
    : tradeState.playerCredits - totalPrice;
  
  return (
    <div className="flex flex-col h-full bg-space-dark/80 border border-space-buttons-border rounded-lg p-4">
      <div className="flex items-center mb-4 border-b border-space-buttons-border pb-3">
        <div className="h-16 w-16 bg-space-dark/60 border border-space-buttons-border rounded-md flex items-center justify-center text-2xl font-bold mr-4">
          {baseItem.defaultItemName.charAt(0)}
        </div>
        
        <div className="flex-1">
          <h3 className="font-pixel text-lg text-space-ui-text">{baseItem.defaultItemName}</h3>
          <p className="text-sm text-space-ui-subtext">{baseItem.defaultItemType}</p>
        </div>
        
        <div className={`text-lg font-pixel px-3 py-1 rounded ${isPlayerItem ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
          {isPlayerItem ? 'PRODEJ' : 'NÁKUP'}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-space-ui-text">Množství:</label>
            <div className="text-sm text-space-ui-subtext">Max: {maxQuantity}</div>
          </div>
          
          <div className="flex space-x-2 mb-2">
            <div className="flex-1">
              <Slider 
                value={[tradeState.transactionQuantity]} 
                min={1}
                max={maxQuantity}
                step={1}
                onValueChange={handleQuantityChange}
              />
            </div>
            <div className="w-20">
              <Input
                type="text"
                value={inputQuantity}
                onChange={handleInputChange}
                className="h-9 bg-space-dark border-space-buttons-border text-center"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setTransactionQuantity(1)}
              className="border-space-buttons-border hover:bg-space-buttons-hover text-space-ui-text"
            >
              1
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setTransactionQuantity(5)}
              className="border-space-buttons-border hover:bg-space-buttons-hover text-space-ui-text"
            >
              5
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setTransactionQuantity(10)}
              className="border-space-buttons-border hover:bg-space-buttons-hover text-space-ui-text"
            >
              10
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSetMaxQuantity}
              className="border-space-buttons-border hover:bg-space-buttons-hover text-space-ui-text"
            >
              Max
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-space-ui-text">Cena za jednotku:</span>
            <span className="font-pixel text-space-ui-text">{unitPrice} Cr</span>
          </div>
          
          <div className="flex justify-between items-center text-lg">
            <span className="text-space-ui-text">Celková cena:</span>
            <span className={`font-pixel font-bold ${isPlayerItem ? 'text-green-400' : 'text-red-400'}`}>{totalPrice} Cr</span>
          </div>
          
          <div className="flex justify-between items-center text-sm pt-1 border-t border-space-buttons-border-hover">
            <span className="text-space-ui-subtext">Aktuální zůstatek:</span>
            <span className="text-space-ui-text">{tradeState.playerCredits} Cr</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-space-ui-subtext">Nový zůstatek:</span>
            <span className={`${newBalance < 0 ? 'text-red-500' : 'text-space-ui-text'}`}>{newBalance} Cr</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-space-buttons-border pt-3">
        {!canAfford && !isPlayerItem && (
          <p className="text-red-500 text-sm mb-2">Nedostatek kreditů pro tuto transakci.</p>
        )}
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            onClick={clearTransaction}
            className="flex-1 hover:bg-space-buttons-hover text-space-ui-text"
          >
            Zrušit
          </Button>
          
          {isPlayerItem ? (
            <Button 
              variant="default"
              onClick={executeSellTransaction}
              className="flex-1 bg-green-700 hover:bg-green-800"
            >
              Prodat
            </Button>
          ) : (
            <Button 
              variant="default"
              onClick={executeBuyTransaction}
              className="flex-1 bg-blue-700 hover:bg-blue-800"
              disabled={!canAfford}
            >
              Koupit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPanel;
