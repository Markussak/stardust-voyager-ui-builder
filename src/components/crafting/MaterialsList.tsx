
import React from 'react';
import { useCrafting } from '@/contexts/CraftingContext';
import { useInventory } from '@/contexts/InventoryContext';
import { CraftingMaterial } from '@/types/crafting';

const MaterialsList: React.FC = () => {
  const { craftingMode, selectedBlueprintId, selectedUpgradeId, getBlueprintById, getUpgradeById } = useCrafting();
  const { findItem } = useInventory();

  let materials: CraftingMaterial[] = [];
  
  if (craftingMode === 'blueprint' && selectedBlueprintId) {
    const blueprint = getBlueprintById(selectedBlueprintId);
    if (blueprint) {
      materials = blueprint.requiredMaterials;
    }
  } else if (craftingMode === 'upgrade' && selectedUpgradeId) {
    const upgrade = getUpgradeById(selectedUpgradeId);
    if (upgrade) {
      materials = upgrade.requiredMaterials;
    }
  }

  if (materials.length === 0) {
    return (
      <div className="bg-space-dark bg-opacity-80 rounded-lg border border-space-buttons-border p-4">
        <h3 className="text-lg font-pixel text-space-ui-text mb-2">Materiály</h3>
        <p className="text-space-ui-subtext">Žádné materiály potřebné</p>
      </div>
    );
  }

  return (
    <div className="bg-space-dark bg-opacity-80 rounded-lg border border-space-buttons-border p-4">
      <h3 className="text-lg font-pixel text-space-ui-text mb-2">Potřebné materiály</h3>
      <ul className="space-y-2">
        {materials.map((material) => {
          const item = findItem(material.itemId);
          const hasEnough = item && item.quantity >= material.quantityRequired;
          
          return (
            <li 
              key={material.itemId}
              className={`flex items-center justify-between p-2 rounded ${hasEnough ? 'bg-green-900 bg-opacity-20' : 'bg-red-900 bg-opacity-20'}`}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 bg-space-dark rounded-sm flex items-center justify-center mr-2 text-xs">
                  {material.itemId.substring(0, 2)}
                </div>
                <span className="text-space-ui-text text-sm">{item?.name || material.itemId}</span>
              </div>
              <span className={`text-sm ${hasEnough ? 'text-green-400' : 'text-red-400'}`}>
                {item?.quantity || 0}/{material.quantityRequired}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MaterialsList;
