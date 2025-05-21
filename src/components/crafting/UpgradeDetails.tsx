
import React from 'react';
import { useCrafting } from '@/contexts/CraftingContext';
import { useInventory } from '@/contexts/InventoryContext';
import { Button } from '@/components/ui/button';

const UpgradeDetails: React.FC = () => {
  const { 
    selectedUpgradeId, 
    getUpgradeById, 
    craftingInProgress,
    hasMaterials,
    startCrafting 
  } = useCrafting();
  
  const { findItem } = useInventory();

  const upgrade = selectedUpgradeId ? getUpgradeById(selectedUpgradeId) : undefined;
  
  if (!upgrade) {
    return (
      <div className="bg-space-dark bg-opacity-80 rounded-lg border border-space-buttons-border p-4 h-full flex items-center justify-center">
        <p className="text-space-ui-subtext">Vyberte vylepšení k zobrazení detailů</p>
      </div>
    );
  }

  const canUpgrade = hasMaterials(upgrade.requiredMaterials);

  const handleUpgrade = () => {
    startCrafting();
  };

  return (
    <div className="bg-space-dark bg-opacity-80 rounded-lg border border-space-buttons-border p-4 h-full flex flex-col">
      <div className="flex items-start mb-4">
        <div className="h-16 w-16 bg-purple-900 rounded-md flex items-center justify-center mr-4">
          <span className="text-2xl font-bold">↑</span>
        </div>
        <div>
          <h2 className="text-xl font-pixel text-space-ui-text">{upgrade.defaultUpgradeName}</h2>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-pixel text-space-ui-text mb-2">Potřebné materiály:</h3>
        <ul className="space-y-2">
          {upgrade.requiredMaterials.map((material) => {
            const item = findItem(material.itemId);
            const hasEnough = item && item.quantity >= material.quantityRequired;
            
            return (
              <li 
                key={material.itemId}
                className={`flex items-center justify-between p-2 bg-space-dark bg-opacity-50 rounded border ${hasEnough ? 'border-green-700' : 'border-red-900'}`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-900 rounded-sm flex items-center justify-center mr-2">
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

      {upgrade.cost_Credits && upgrade.cost_Credits > 0 && (
        <div className="mb-4">
          <p className="text-sm text-space-ui-subtext">
            Cena: {upgrade.cost_Credits} kreditů
          </p>
        </div>
      )}

      {upgrade.requiredUpgradeStation_Type && (
        <div className="mb-4">
          <p className="text-sm text-space-ui-subtext">
            Vyžaduje: {upgrade.requiredUpgradeStation_Type.replace('_', ' ')}
          </p>
        </div>
      )}

      {upgrade.upgradeTime_Seconds !== undefined && upgrade.upgradeTime_Seconds > 0 && (
        <div className="mb-4">
          <p className="text-sm text-space-ui-subtext">
            Čas vylepšení: {upgrade.upgradeTime_Seconds} s
          </p>
        </div>
      )}

      <div className="mt-auto">
        <Button
          className="w-full bg-purple-700 hover:bg-purple-600 text-white font-pixel"
          disabled={!canUpgrade || craftingInProgress}
          onClick={handleUpgrade}
        >
          {craftingInProgress ? 'Probíhá vylepšení...' : 'Vylepšit'}
        </Button>
      </div>
    </div>
  );
};

export default UpgradeDetails;
