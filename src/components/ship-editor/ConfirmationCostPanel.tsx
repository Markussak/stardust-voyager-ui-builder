
import React from 'react';
import { useShipEditor } from "@/contexts/ShipEditorContext";
import { Button } from "@/components/ui/button";
import { useInventory } from "@/contexts/InventoryContext";
import { Check, RotateCcw, Coins } from "lucide-react";

const ConfirmationCostPanel = () => {
  const { editorState, applyChanges, revertChanges } = useShipEditor();
  const { inventory, itemDatabase } = useInventory();
  
  // Check if player has enough credits
  const playerCredits = 10000; // Mock credits, in a real game this would come from player state
  const hasEnoughCredits = playerCredits >= editorState.installationCost_Credits;
  
  // Check if player has enough materials
  const hasEnoughMaterials = editorState.installationCost_Materials.every(material => {
    // Find the material in player inventory
    const itemInInventory = Object.values(inventory.specializedStorage)
      .flatMap(storage => storage.items)
      .find(item => item.baseItemId === material.resourceId);
      
    return itemInInventory && itemInInventory.quantity >= material.quantity;
  });
  
  // Can apply changes if there are unsaved changes and player has enough resources
  const canApplyChanges = editorState.hasUnsavedChanges && hasEnoughCredits && hasEnoughMaterials;
  
  if (!editorState.hasUnsavedChanges) {
    return (
      <div className="bg-space-dark bg-opacity-80 border border-space-buttons-border rounded-lg p-3">
        <div className="flex items-center justify-center">
          <span className="text-space-ui-subtext">Žádné neuložené změny</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-space-dark bg-opacity-80 border border-space-buttons-border rounded-lg p-3">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <h3 className="font-pixel mr-4">Náklady na Instalaci:</h3>
          
          <div className="flex items-center mr-6">
            <Coins size={18} className={`mr-2 ${hasEnoughCredits ? 'text-space-ui-text' : 'text-red-500'}`} />
            <span className={`${hasEnoughCredits ? 'text-space-ui-text' : 'text-red-500'}`}>
              {editorState.installationCost_Credits} kr
            </span>
            <span className="text-xs text-space-ui-subtext ml-1">({playerCredits} k dispozici)</span>
          </div>
          
          {editorState.installationCost_Materials.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {editorState.installationCost_Materials.map((material) => {
                const itemData = itemDatabase[material.resourceId];
                // Find the material in player inventory
                const itemInInventory = Object.values(inventory.specializedStorage)
                  .flatMap(storage => storage.items)
                  .find(item => item.baseItemId === material.resourceId);
                
                const playerQuantity = itemInInventory?.quantity || 0;
                const hasEnough = playerQuantity >= material.quantity;
                
                return (
                  <div key={material.resourceId} className="flex items-center">
                    <div className={`w-4 h-4 ${hasEnough ? 'bg-green-600' : 'bg-red-600'} rounded-sm mr-2`}></div>
                    <span className={hasEnough ? 'text-space-ui-text' : 'text-red-500'}>
                      {material.quantity}× {itemData?.defaultItemName}
                    </span>
                    <span className="text-xs text-space-ui-subtext ml-1">({playerQuantity} k dispozici)</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button 
            variant="outline" 
            onClick={revertChanges}
            className="border-space-buttons-border"
          >
            <RotateCcw size={16} className="mr-2" />
            Vrátit Změny
          </Button>
          
          <Button 
            variant="default"
            onClick={applyChanges}
            disabled={!canApplyChanges}
            className={!canApplyChanges ? 'opacity-50 cursor-not-allowed' : ''}
          >
            <Check size={16} className="mr-2" />
            Potvrdit Instalaci
          </Button>
        </div>
      </div>
      
      {(!hasEnoughCredits || !hasEnoughMaterials) && (
        <div className="mt-2 text-center text-red-500 text-sm">
          Nemáte dostatek zdrojů pro instalaci!
        </div>
      )}
    </div>
  );
};

export default ConfirmationCostPanel;
