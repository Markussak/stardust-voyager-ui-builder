
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
      <ul className="space-y-3">
        {materials.map((material) => {
          const item = findItem(material.itemId);
          const hasEnough = item && item.quantity >= material.quantityRequired;
          
          return (
            <li 
              key={material.itemId}
              className={`flex items-center justify-between p-2.5 rounded transition-colors ${
                hasEnough 
                  ? 'bg-green-900 bg-opacity-20 border border-green-700 border-opacity-30' 
                  : 'bg-red-900 bg-opacity-20 border border-red-700 border-opacity-30'
              }`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-space-dark rounded flex items-center justify-center mr-3 overflow-hidden">
                  {item?.iconAsset ? (
                    <div 
                      className="w-full h-full bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${item.iconAsset})` }} 
                    />
                  ) : (
                    <div className="text-xs text-center">
                      {material.itemId.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="text-space-ui-text text-sm font-medium">
                  {item?.name || material.itemId}
                </span>
              </div>
              <div className="flex items-center">
                <span className={`text-sm ${hasEnough ? 'text-green-400' : 'text-red-400'} font-mono`}>
                  {item?.quantity || 0}/{material.quantityRequired}
                </span>
                
                {!hasEnough && (
                  <div className="ml-2 text-xs py-0.5 px-1.5 bg-red-900 bg-opacity-40 rounded">
                    Chybí {material.quantityRequired - (item?.quantity || 0)}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {materials.some(material => {
        const item = findItem(material.itemId);
        return !item || item.quantity < material.quantityRequired;
      }) && (
        <div className="mt-4 p-2 bg-red-900 bg-opacity-20 border border-red-800 border-opacity-30 rounded text-sm">
          <span className="text-red-300">⚠️ Nemáte dostatek materiálů k dokončení</span>
        </div>
      )}
    </div>
  );
};

export default MaterialsList;
