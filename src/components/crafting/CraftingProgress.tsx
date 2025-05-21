
import React, { useEffect } from 'react';
import { useCrafting } from '@/contexts/CraftingContext';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const CraftingProgress: React.FC = () => {
  const {
    craftingInProgress,
    craftingProgress,
    craftingTimeRemaining,
    craftingMode,
    selectedBlueprintId,
    selectedUpgradeId,
    getBlueprintById,
    getUpgradeById,
    cancelCrafting
  } = useCrafting();

  const blueprint = selectedBlueprintId ? getBlueprintById(selectedBlueprintId) : undefined;
  const upgrade = selectedUpgradeId ? getUpgradeById(selectedUpgradeId) : undefined;

  const getItemName = () => {
    if (craftingMode === 'blueprint' && blueprint) {
      return blueprint.defaultBlueprintName.replace('Plán: ', '');
    } else if (craftingMode === 'upgrade' && upgrade) {
      return upgrade.defaultUpgradeName.split('->')[1].trim();
    }
    return 'Předmět';
  };

  if (!craftingInProgress) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-space-dark border border-space-buttons-border rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-pixel text-space-ui-text">
            {craftingMode === 'blueprint' ? 'Výroba' : 'Vylepšení'}: {getItemName()}
          </h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={cancelCrafting}
            className="text-space-ui-subtext hover:text-white hover:bg-red-900"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-blue-900 rounded-full flex items-center justify-center animate-pulse">
              <div className="h-16 w-16 bg-blue-800 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold">{getItemName().charAt(0)}</span>
              </div>
            </div>
          </div>

          <Progress value={craftingProgress * 100} className="h-2 bg-gray-700" />
          
          <div className="flex justify-between text-sm text-space-ui-text">
            <span>Probíhá {craftingMode === 'blueprint' ? 'výroba' : 'vylepšení'}...</span>
            <span>{Math.ceil(craftingTimeRemaining)} s</span>
          </div>

          <div className="mt-4">
            <Button 
              variant="outline"
              onClick={cancelCrafting}
              className="w-full border-red-700 text-red-400 hover:bg-red-900 hover:text-white"
            >
              Zrušit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftingProgress;
