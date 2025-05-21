
import React from 'react';
import { useCrafting } from '@/contexts/CraftingContext';
import { useInventory } from '@/contexts/InventoryContext';
import { Button } from '@/components/ui/button';
import { CraftingStationType } from '@/types/crafting';

const BlueprintDetails: React.FC = () => {
  const { 
    selectedBlueprintId, 
    getBlueprintById, 
    craftingMode, 
    craftingInProgress,
    hasMaterials,
    startCrafting 
  } = useCrafting();
  
  const { findItem } = useInventory();

  const blueprint = selectedBlueprintId ? getBlueprintById(selectedBlueprintId) : undefined;
  
  if (!blueprint) {
    return (
      <div className="bg-space-dark bg-opacity-80 rounded-lg border border-space-buttons-border p-4 h-full flex items-center justify-center">
        <p className="text-space-ui-subtext">Vyberte plán k zobrazení detailů</p>
      </div>
    );
  }

  const canCraft = hasMaterials(blueprint.requiredMaterials);
  const stationTypeMap: Record<CraftingStationType, string> = {
    'Onboard_BasicFabricator': 'Základní Palubní Fabrikátor',
    'Station_Workshop_Tier1': 'Dílenská Stanice (Úroveň 1)',
    'Station_AdvancedLab_Tier2': 'Pokročilá Laboratoř (Úroveň 2)',
    'Faction_Specific_Forge': 'Frakční Kovárna'
  };

  const handleCraft = () => {
    startCrafting();
  };

  return (
    <div className="bg-space-dark bg-opacity-80 rounded-lg border border-space-buttons-border p-4 h-full flex flex-col">
      <div className="flex items-start mb-4">
        <div className="h-16 w-16 bg-blue-900 rounded-md flex items-center justify-center mr-4">
          <span className="text-2xl font-bold">{blueprint.defaultBlueprintName.charAt(0)}</span>
        </div>
        <div>
          <h2 className="text-xl font-pixel text-space-ui-text">{blueprint.defaultBlueprintName}</h2>
          <p className="text-sm text-space-ui-subtext">{blueprint.category.replace('_', ': ')}</p>
        </div>
      </div>

      {blueprint.defaultBlueprintDescription && (
        <div className="mb-4">
          <p className="text-space-ui-text">{blueprint.defaultBlueprintDescription}</p>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-pixel text-space-ui-text mb-2">Potřebné materiály:</h3>
        <ul className="space-y-2">
          {blueprint.requiredMaterials.map((material) => {
            const item = findItem(material.itemId);
            const hasEnough = item && item.quantity >= material.quantityRequired;
            
            return (
              <li 
                key={material.itemId}
                className={`flex items-center justify-between p-2 bg-space-dark bg-opacity-50 rounded border ${hasEnough ? 'border-green-700' : 'border-red-900'}`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-900 rounded-sm flex items-center justify-center mr-2">
                    <span className="text-xs font-bold">{material.itemId.charAt(0)}</span>
                  </div>
                  <span className="text-space-ui-text">{item?.name || material.itemId}</span>
                </div>
                <span className={`${hasEnough ? 'text-green-400' : 'text-red-400'}`}>
                  {item?.quantity || 0}/{material.quantityRequired}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {blueprint.requiredCraftingStation_Type && (
        <div className="mb-4">
          <p className="text-sm text-space-ui-subtext">
            Vyžaduje: {stationTypeMap[blueprint.requiredCraftingStation_Type] || blueprint.requiredCraftingStation_Type}
          </p>
        </div>
      )}

      {blueprint.craftingTime_Seconds !== undefined && blueprint.craftingTime_Seconds > 0 && (
        <div className="mb-4">
          <p className="text-sm text-space-ui-subtext">
            Čas výroby: {blueprint.craftingTime_Seconds} s
          </p>
        </div>
      )}

      <div className="mt-auto">
        <Button
          className="w-full bg-blue-700 hover:bg-blue-600 text-white font-pixel"
          disabled={!canCraft || craftingInProgress}
          onClick={handleCraft}
        >
          {craftingInProgress ? 'Probíhá výroba...' : 'Vyrobit'}
        </Button>
      </div>
    </div>
  );
};

export default BlueprintDetails;
