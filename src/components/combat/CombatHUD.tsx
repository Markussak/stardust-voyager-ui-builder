
import React from 'react';
import { useCombatSystem } from '@/contexts/CombatSystemContext';
import { Progress } from '@/components/ui/progress';
import { Shield, Heart, Target, Rocket, Zap } from 'lucide-react';

const CombatHUD = () => {
  const { 
    playerCombatState,
    selectedTarget,
    weaponDefinitions,
    isInCombat,
    getWeaponCooldownPercentage,
    getWeaponReadyState,
    isTargetInWeaponRange
  } = useCombatSystem();

  if (!isInCombat) {
    return null; // Don't show combat HUD when not in combat
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Player status */}
      <div className="absolute bottom-28 left-4 w-64 bg-black bg-opacity-50 rounded p-2 border border-space-buttons-border">
        <div className="flex items-center mb-2">
          <Heart size={16} className="text-red-500 mr-2" />
          <span className="text-sm mr-2">Trup:</span>
          <Progress 
            value={(playerCombatState.health_Hull_Current / playerCombatState.health_Hull_Max) * 100} 
            className="h-2 flex-1" 
          />
          <span className="ml-2 text-xs">
            {Math.round(playerCombatState.health_Hull_Current)}/{playerCombatState.health_Hull_Max}
          </span>
        </div>

        {playerCombatState.shield_Current !== undefined && (
          <div className="flex items-center">
            <Shield size={16} className="text-blue-400 mr-2" />
            <span className="text-sm mr-2">Štít:</span>
            <Progress 
              value={(playerCombatState.shield_Current / (playerCombatState.shield_Max || 1)) * 100} 
              className="h-2 flex-1 bg-gray-700"
            />
            <span className="ml-2 text-xs">
              {Math.round(playerCombatState.shield_Current)}/{playerCombatState.shield_Max}
            </span>
          </div>
        )}
      </div>

      {/* Weapons status */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        {playerCombatState.equippedWeaponSlots.map(weaponSlot => {
          const weaponDef = weaponDefinitions[weaponSlot.weaponModuleId];
          if (!weaponDef) return null;
          
          const cooldownPercent = getWeaponCooldownPercentage(weaponSlot.slotId);
          const readyState = getWeaponReadyState(weaponSlot.slotId);
          const isTargetInRange = selectedTarget 
            ? isTargetInWeaponRange(weaponSlot.slotId, selectedTarget.entityId)
            : false;
          
          return (
            <div 
              key={weaponSlot.slotId}
              className={`flex items-center justify-between bg-black bg-opacity-50 rounded p-2 border ${
                readyState === 'ready' && isTargetInRange 
                  ? 'border-green-500' 
                  : 'border-space-buttons-border'
              }`}
              style={{width: '200px'}}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <Rocket size={14} className="mr-1" />
                  <span className="text-xs font-semibold truncate w-24">{weaponDef.defaultItemName}</span>
                </div>
                <div className="flex items-center mt-1">
                  {weaponDef.energyCost_PerShotOrSec && (
                    <span className="flex items-center text-xs text-yellow-400 mr-2">
                      <Zap size={10} className="mr-1" />
                      {weaponDef.energyCost_PerShotOrSec}
                    </span>
                  )}
                  <span className="text-xs">
                    {readyState === 'ready' ? 'Připraven' : 
                     readyState === 'cooling' ? 'Nabíjení...' : 
                     readyState === 'overheated' ? 'Přehřátí!' : 
                     readyState === 'no_ammo' ? 'Bez munice' : 'Bez energie'}
                  </span>
                </div>
              </div>
              {cooldownPercent > 0 && (
                <div className="w-20">
                  <Progress value={100 - cooldownPercent} className="h-2" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Target information */}
      {selectedTarget && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded p-2 border border-space-buttons-border w-64">
          <div className="flex items-center mb-2">
            <Target size={16} className="text-red-500 mr-2" />
            <span className="text-sm font-semibold">Cíl: {selectedTarget.entityId}</span>
          </div>
          
          {selectedTarget.shield_Current !== undefined && (
            <div className="flex items-center mb-1">
              <Shield size={14} className="text-blue-400 mr-2" />
              <Progress 
                value={(selectedTarget.shield_Current / (selectedTarget.shield_Max || 1)) * 100} 
                className="h-2 flex-1 bg-gray-700" 
              />
              <span className="ml-2 text-xs">
                {Math.round(selectedTarget.shield_Current)}/{selectedTarget.shield_Max}
              </span>
            </div>
          )}
          
          <div className="flex items-center">
            <Heart size={14} className="text-red-500 mr-2" />
            <Progress 
              value={(selectedTarget.health_Hull_Current / selectedTarget.health_Hull_Max) * 100} 
              className="h-2 flex-1" 
            />
            <span className="ml-2 text-xs">
              {Math.round(selectedTarget.health_Hull_Current)}/{selectedTarget.health_Hull_Max}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombatHUD;
