
import React from 'react';
import { useCrafting } from '@/contexts/CraftingContext';
import { useInventory } from '@/contexts/InventoryContext';

const UpgradeList: React.FC = () => {
  const { 
    availableUpgrades, 
    selectedUpgradeId, 
    setUpgradeId,
    craftingMode,
    hasMaterials 
  } = useCrafting();

  const { findItem } = useInventory();

  // Handle upgrade selection
  const handleSelectUpgrade = (upgradeId: string) => {
    setUpgradeId(upgradeId);
  };

  return (
    <div className="bg-space-dark bg-opacity-80 rounded-lg border border-space-buttons-border p-4 h-full overflow-auto">
      <h2 className="text-xl font-pixel text-space-ui-text mb-4">Dostupná Vylepšení</h2>

      {availableUpgrades.length === 0 ? (
        <div className="text-center text-space-ui-subtext py-4">
          <p>Žádná dostupná vylepšení</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {availableUpgrades.map((upgrade) => {
            const canUpgrade = hasMaterials(upgrade.requiredMaterials);
            const isSelected = selectedUpgradeId === upgrade.baseItemId;
            
            return (
              <li 
                key={upgrade.baseItemId}
                className={`
                  p-3 rounded cursor-pointer flex items-center transition-colors
                  ${isSelected 
                    ? 'bg-purple-900 bg-opacity-60 border border-purple-400' 
                    : canUpgrade 
                      ? 'bg-space-dark bg-opacity-70 border border-space-buttons-border hover:bg-purple-900 hover:bg-opacity-30' 
                      : 'bg-space-dark bg-opacity-50 border border-red-900 opacity-70'
                  }
                `}
                onClick={() => handleSelectUpgrade(upgrade.baseItemId)}
              >
                <div className="h-10 w-10 bg-space-dark rounded flex items-center justify-center mr-3">
                  <div className="h-8 w-8 bg-purple-900 rounded-sm flex items-center justify-center">
                    <span className="text-xl font-bold">↑</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-space-ui-text">{upgrade.defaultUpgradeName}</div>
                  <div className="text-xs text-space-ui-subtext">
                    {upgrade.cost_Credits ? `${upgrade.cost_Credits} kreditů` : 'Bez kreditových nákladů'}
                  </div>
                </div>
                {!canUpgrade && (
                  <div className="ml-2 text-xs py-1 px-2 bg-red-900 bg-opacity-40 rounded border border-red-700 border-opacity-30">
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

export default UpgradeList;
