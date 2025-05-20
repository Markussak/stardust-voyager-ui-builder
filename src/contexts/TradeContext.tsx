
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useInventory } from './InventoryContext';
import { ItemInstance, TradeableItemData, TraderInventoryItemSlot } from '@/types/inventory';
import { toast } from 'sonner';

interface TradeState {
  playerCredits: number;
  selectedItem?: {
    itemInstance: ItemInstance;
    isPlayerItem: boolean;
  };
  transactionMode: 'buy' | 'sell' | 'none';
  transactionQuantity: number;
  traderInventory: TraderInventoryItemSlot[];
  marketInfo: {
    stationName: string;
    specializations: string[];
    demandModifiers: Record<string, number>;
  };
}

interface TradeContextType {
  tradeState: TradeState;
  selectPlayerItem: (itemInstance: ItemInstance) => void;
  selectTraderItem: (itemSlot: TraderInventoryItemSlot) => void;
  setTransactionQuantity: (quantity: number) => void;
  clearTransaction: () => void;
  executeBuyTransaction: () => void;
  executeSellTransaction: () => void;
  getItemSellPrice: (itemId: string) => number;
  getMaxPurchaseableQuantity: (itemPrice: number) => number;
  canPlayerAfford: (totalPrice: number) => boolean;
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

// Mock trader data - in a real app this would come from the station/trader data
const mockTraderInventory: TraderInventoryItemSlot[] = [
  {
    itemId: 'trader_item_1',
    itemInstance: {
      itemInstanceId: 'trader-iron-1',
      baseItemId: 'iron_ore',
      quantity: 200
    },
    buyPrice_ForPlayer: 12,
    stockQuantity: 200,
    marketDemandIndicator: 'Medium'
  },
  {
    itemId: 'trader_item_2',
    itemInstance: {
      itemInstanceId: 'trader-titanium-1',
      baseItemId: 'titanium_alloy',
      quantity: 50
    },
    buyPrice_ForPlayer: 52,
    stockQuantity: 50,
    marketDemandIndicator: 'High'
  },
  {
    itemId: 'trader_item_3',
    itemInstance: {
      itemInstanceId: 'trader-quantum-1',
      baseItemId: 'quantum_processor',
      quantity: 5
    },
    buyPrice_ForPlayer: 420,
    stockQuantity: 5,
    marketDemandIndicator: 'Low'
  }
];

interface TradeProviderProps {
  children: ReactNode;
}

export const TradeProvider: React.FC<TradeProviderProps> = ({ children }) => {
  const { itemDatabase } = useInventory();

  const [tradeState, setTradeState] = useState<TradeState>({
    playerCredits: 5000, // Mock starting credits
    transactionMode: 'none',
    transactionQuantity: 1,
    traderInventory: mockTraderInventory,
    marketInfo: {
      stationName: 'Hvězdná Stanice Minerva',
      specializations: ['Mining', 'Manufacturing'],
      demandModifiers: {
        'iron_ore': 1.2,
        'titanium_alloy': 0.9
      }
    }
  });

  // Load player credits from storage if available
  useEffect(() => {
    const savedCredits = localStorage.getItem('playerCredits');
    if (savedCredits) {
      try {
        setTradeState(prev => ({
          ...prev,
          playerCredits: Number(savedCredits)
        }));
      } catch (error) {
        console.error('Failed to load player credits from storage:', error);
      }
    }
  }, []);

  // Save credits whenever they change
  useEffect(() => {
    localStorage.setItem('playerCredits', tradeState.playerCredits.toString());
  }, [tradeState.playerCredits]);

  const selectPlayerItem = (itemInstance: ItemInstance) => {
    setTradeState({
      ...tradeState,
      selectedItem: {
        itemInstance,
        isPlayerItem: true
      },
      transactionMode: 'sell',
      transactionQuantity: 1
    });
  };

  const selectTraderItem = (itemSlot: TraderInventoryItemSlot) => {
    setTradeState({
      ...tradeState,
      selectedItem: {
        itemInstance: itemSlot.itemInstance,
        isPlayerItem: false
      },
      transactionMode: 'buy',
      transactionQuantity: 1
    });
  };

  const setTransactionQuantity = (quantity: number) => {
    setTradeState({
      ...tradeState,
      transactionQuantity: Math.max(1, Math.min(quantity, getMaxQuantity()))
    });
  };

  const clearTransaction = () => {
    setTradeState({
      ...tradeState,
      selectedItem: undefined,
      transactionMode: 'none',
      transactionQuantity: 1
    });
  };

  const getMaxQuantity = (): number => {
    if (!tradeState.selectedItem) return 1;

    if (tradeState.transactionMode === 'buy') {
      // When buying, max is either trader stock or what player can afford
      const itemSlot = tradeState.traderInventory.find(
        item => item.itemInstance.itemInstanceId === tradeState.selectedItem?.itemInstance.itemInstanceId
      );
      if (!itemSlot) return 1;

      const maxAffordable = getMaxPurchaseableQuantity(itemSlot.buyPrice_ForPlayer);
      return Math.min(itemSlot.stockQuantity || 1, maxAffordable);
    } else {
      // When selling, max is player's quantity
      return tradeState.selectedItem.itemInstance.quantity;
    }
  };

  const getItemSellPrice = (itemId: string): number => {
    const baseItem = itemDatabase[itemId];
    if (!baseItem) return 0;

    // Sell price is usually less than buy price (trader profit margin)
    const baseValue = baseItem.baseValue_Credits;
    const demandModifier = tradeState.marketInfo.demandModifiers[itemId] || 1.0;
    return Math.floor(baseValue * 0.7 * demandModifier); // 70% of base value, modified by demand
  };

  const getMaxPurchaseableQuantity = (itemPrice: number): number => {
    if (itemPrice <= 0) return 0;
    return Math.floor(tradeState.playerCredits / itemPrice);
  };

  const canPlayerAfford = (totalPrice: number): boolean => {
    return tradeState.playerCredits >= totalPrice;
  };

  const executeBuyTransaction = () => {
    // Placeholder for buy transaction logic
    if (!tradeState.selectedItem || tradeState.transactionMode !== 'buy') {
      toast.error("Žádná transakce není připravena.");
      return;
    }

    const itemSlot = tradeState.traderInventory.find(
      item => item.itemInstance.itemInstanceId === tradeState.selectedItem?.itemInstance.itemInstanceId
    );
    if (!itemSlot) {
      toast.error("Položka nebyla nalezena v nabídce obchodníka.");
      return;
    }

    const totalPrice = itemSlot.buyPrice_ForPlayer * tradeState.transactionQuantity;
    
    if (!canPlayerAfford(totalPrice)) {
      toast.error("Nedostatek kreditů.");
      return;
    }

    // Deduct credits
    setTradeState({
      ...tradeState,
      playerCredits: tradeState.playerCredits - totalPrice,
      selectedItem: undefined,
      transactionMode: 'none'
    });

    toast.success(`Zakoupeno ${tradeState.transactionQuantity}x ${itemDatabase[tradeState.selectedItem.itemInstance.baseItemId].defaultItemName}.`);
  };

  const executeSellTransaction = () => {
    // Placeholder for sell transaction logic
    if (!tradeState.selectedItem || tradeState.transactionMode !== 'sell') {
      toast.error("Žádná transakce není připravena.");
      return;
    }

    const itemId = tradeState.selectedItem.itemInstance.baseItemId;
    const sellPrice = getItemSellPrice(itemId);
    const totalProfit = sellPrice * tradeState.transactionQuantity;

    // Add credits
    setTradeState({
      ...tradeState,
      playerCredits: tradeState.playerCredits + totalProfit,
      selectedItem: undefined,
      transactionMode: 'none'
    });

    toast.success(`Prodáno ${tradeState.transactionQuantity}x ${itemDatabase[itemId].defaultItemName} za ${totalProfit} kreditů.`);
  };

  const value = {
    tradeState,
    selectPlayerItem,
    selectTraderItem,
    setTransactionQuantity,
    clearTransaction,
    executeBuyTransaction,
    executeSellTransaction,
    getItemSellPrice,
    getMaxPurchaseableQuantity,
    canPlayerAfford
  };

  return (
    <TradeContext.Provider value={value}>
      {children}
    </TradeContext.Provider>
  );
};

export const useTrade = (): TradeContextType => {
  const context = useContext(TradeContext);
  if (context === undefined) {
    throw new Error('useTrade must be used within a TradeProvider');
  }
  return context;
};
