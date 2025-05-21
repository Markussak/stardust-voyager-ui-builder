
import React from 'react';
import { useCrafting } from '@/contexts/CraftingContext';
import { BlueprintData } from '@/types/crafting';
import { useInventory } from '@/contexts/InventoryContext';

const BlueprintList: React.FC = () => {
  const { 
    availableBlueprints, 
    selectedBlueprintId, 
    setBlueprintId,
    craftingMode,
    hasMaterials 
  } = useCrafting();

  // Handle blueprint selection
  const handleSelectBlueprint = (blueprintId: string) => {
    setBlueprintId(blueprintId);
  };

  return (
    <div className="bg-space-dark bg-opacity-80 rounded-lg border border-space-buttons-border p-4 h-full overflow-auto">
      <h2 className="text-xl font-pixel text-space-ui-text mb-4">Dostupné Plány</h2>

      {availableBlueprints.length === 0 ? (
        <div className="text-center text-space-ui-subtext py-4">
          <p>Žádné dostupné plány</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {availableBlueprints.map((blueprint) => {
            const canCraft = hasMaterials(blueprint.requiredMaterials);
            const isSelected = selectedBlueprintId === blueprint.blueprintId;
            
            return (
              <li 
                key={blueprint.blueprintId}
                className={`
                  p-3 rounded cursor-pointer flex items-center
                  ${isSelected 
                    ? 'bg-blue-900 bg-opacity-60 border border-blue-400' 
                    : canCraft 
                      ? 'bg-space-dark bg-opacity-70 border border-space-buttons-border hover:bg-blue-900 hover:bg-opacity-30' 
                      : 'bg-space-dark bg-opacity-50 border border-red-900 opacity-70'
                  }
                `}
                onClick={() => handleSelectBlueprint(blueprint.blueprintId)}
              >
                <div className="h-10 w-10 bg-space-dark rounded flex items-center justify-center mr-3">
                  <div className="h-8 w-8 bg-blue-900 rounded-sm flex items-center justify-center">
                    <span className="text-xl font-bold">{blueprint.defaultBlueprintName.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-space-ui-text">{blueprint.defaultBlueprintName}</div>
                  <div className="text-xs text-space-ui-subtext">{blueprint.category.replace('_', ': ')}</div>
                </div>
                {!canCraft && (
                  <div className="text-xs text-red-400 ml-2">
                    Nedostatek materiálů
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BlueprintList;
