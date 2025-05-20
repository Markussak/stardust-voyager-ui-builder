
import React from 'react';
import { useInventory } from "@/contexts/InventoryContext";
import { SpecializedStorageType } from "@/types/inventory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SpecializedStorageProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SpecializedStorage: React.FC<SpecializedStorageProps> = ({ activeTab, setActiveTab }) => {
  const { inventory, selectItem, itemDatabase } = useInventory();
  
  // Ensure specialized storage exists
  const specializedStorage = inventory.specializedStorage || {};
  
  const getStorageTypeDisplayName = (type: string): string => {
    switch (type) {
      case SpecializedStorageType.Resources:
      case SpecializedStorageType.RawMaterials: return "Suroviny";
      case SpecializedStorageType.Components:
      case SpecializedStorageType.CraftingComponents: return "Komponenty";
      case SpecializedStorageType.ShipModules_Unequipped: return "Lodní Moduly";
      case SpecializedStorageType.TradeGoods_Commodities: return "Obchodní Zboží";
      case SpecializedStorageType.QuestItems_KeyItems: return "Misijní Předměty";
      case SpecializedStorageType.Artifacts:
      case SpecializedStorageType.Artifacts_UniqueDiscoveries: return "Artefakty";
      default: return type;
    }
  };
  
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full h-full"
    >
      <TabsList className="w-full grid grid-cols-3 bg-space-dark">
        {Object.keys(specializedStorage).map((key) => (
          <TabsTrigger 
            key={key}
            value={key}
            className="text-xs font-pixel data-[state=active]:bg-space-buttons hover:bg-space-buttons-hover"
          >
            {getStorageTypeDisplayName(key)}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {Object.entries(specializedStorage).map(([key, storage]) => (
        <TabsContent key={key} value={key} className="h-[calc(100%-2.5rem)] mt-2">
          <ScrollArea className="h-full">
            <div className="space-y-1">
              {storage.items && storage.items.map((item: any) => {
                const baseItem = item.baseItemId && itemDatabase[item.baseItemId];
                if (!baseItem) return null;
                
                return (
                  <div 
                    key={item.itemInstanceId || `item-${Math.random()}`}
                    className="flex items-center p-2 border border-transparent hover:border-space-buttons-border hover:bg-space-buttons/30 rounded-sm cursor-pointer"
                    onClick={() => selectItem(item.itemInstanceId)}
                  >
                    <div className="w-6 h-6 mr-2 bg-space-buttons flex items-center justify-center text-xs">
                      {(baseItem.defaultItemName || baseItem.name || "?").charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-pixel">{baseItem.defaultItemName || baseItem.name}</p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-400">Množství: {item.quantity}</p>
                      )}
                    </div>
                    <div className="text-xs text-space-ui-subtext">
                      {baseItem.baseValue_Credits || baseItem.value} kr.
                    </div>
                  </div>
                );
              })}
              
              {!storage.items || storage.items.length === 0 && (
                <div className="text-center p-4 text-space-ui-subtext">
                  <p>Žádné předměty</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default SpecializedStorage;
