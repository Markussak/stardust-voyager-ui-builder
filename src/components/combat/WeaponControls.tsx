
import React, { useState, useEffect } from 'react';
import { useCombatSystem } from '@/contexts/CombatSystemContext';
import { Button } from '@/components/ui/button';
import { CrosshairIcon, ShieldIcon, Zap } from 'lucide-react';

interface WeaponControlsProps {
  className?: string;
}

const WeaponControls: React.FC<WeaponControlsProps> = ({ className }) => {
  const { 
    playerCombatState, 
    fireWeapon, 
    isInCombat,
    selectedTarget,
    weaponDefinitions,
    getWeaponReadyState,
    isTargetInWeaponRange
  } = useCombatSystem();
  
  const [autoFireEnabled, setAutoFireEnabled] = useState<Record<string, boolean>>({});
  
  // Auto-fire system
  useEffect(() => {
    if (!isInCombat) return;
    
    const autoFireIntervals: Record<string, NodeJS.Timeout> = {};
    
    // Set up auto-fire for each weapon
    playerCombatState.equippedWeaponSlots.forEach(slot => {
      if (autoFireEnabled[slot.slotId]) {
        // Get weapon definition to determine fire rate
        const weaponDef = weaponDefinitions[slot.weaponModuleId];
        if (!weaponDef || !weaponDef.rateOfFire_PerSec) return;
        
        // Set interval slightly faster than fire rate to ensure we don't miss shots due to timing issues
        const fireInterval = Math.max(50, (1000 / weaponDef.rateOfFire_PerSec) - 50);
        
        autoFireIntervals[slot.slotId] = setInterval(() => {
          // Only fire if we have a target
          if (selectedTarget) {
            fireWeapon(slot.slotId);
          }
        }, fireInterval);
      }
    });
    
    // Clean up intervals on unmount or when auto-fire changes
    return () => {
      Object.values(autoFireIntervals).forEach(interval => clearInterval(interval));
    };
  }, [isInCombat, autoFireEnabled, playerCombatState.equippedWeaponSlots, fireWeapon, selectedTarget, weaponDefinitions]);
  
  // Toggle auto-fire for a weapon
  const toggleAutoFire = (slotId: string) => {
    setAutoFireEnabled(prev => ({
      ...prev,
      [slotId]: !prev[slotId]
    }));
  };
  
  if (!isInCombat) {
    return null; // Don't show controls when not in combat
  }
  
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <h3 className="text-sm font-semibold mb-1">Zbraňové systémy</h3>
      
      {playerCombatState.equippedWeaponSlots.map(slot => {
        const weaponDef = weaponDefinitions[slot.weaponModuleId];
        if (!weaponDef) return null;
        
        const readyState = getWeaponReadyState(slot.slotId);
        const isReady = readyState === 'ready';
        const hasTarget = !!selectedTarget;
        const isInRange = hasTarget && isTargetInWeaponRange(slot.slotId, selectedTarget.entityId);
        const canFire = isReady && hasTarget && isInRange;
        
        return (
          <div key={slot.slotId} className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs">{weaponDef.defaultItemName}</span>
              <div className="flex items-center">
                {weaponDef.energyCost_PerShotOrSec && (
                  <span className="text-xs text-yellow-400 flex items-center mr-2">
                    <Zap size={10} className="mr-1" />
                    {weaponDef.energyCost_PerShotOrSec}
                  </span>
                )}
                <span className={`text-xs px-1 rounded ${
                  isReady ? 'bg-green-700' : 
                  readyState === 'cooling' ? 'bg-yellow-700' : 'bg-red-700'
                }`}>
                  {isReady ? 'Připraven' : 
                   readyState === 'cooling' ? 'Nabíjení' : 
                   readyState === 'overheated' ? 'Přehřátí' : 
                   readyState === 'no_ammo' ? 'Bez munice' : 'Bez energie'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                disabled={!canFire}
                onClick={() => fireWeapon(slot.slotId)}
                className="flex-1 h-8 bg-opacity-60 border-space-buttons-border"
              >
                <CrosshairIcon size={14} className="mr-1" />
                Vystřelit
              </Button>
              
              <Button
                size="sm"
                variant={autoFireEnabled[slot.slotId] ? "default" : "outline"}
                disabled={!hasTarget}
                onClick={() => toggleAutoFire(slot.slotId)}
                className="h-8 bg-opacity-60 border-space-buttons-border"
              >
                Auto
              </Button>
            </div>
          </div>
        );
      })}
      
      {/* If player has shields, add shield controls */}
      {playerCombatState.shield_Max && playerCombatState.shield_Max > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-1">Obranné systémy</h3>
          <Button 
            size="sm" 
            variant="outline"
            className="w-full h-8 bg-opacity-60 border-blue-400"
          >
            <ShieldIcon size={14} className="mr-1 text-blue-400" />
            Přesměrovat energii do štítů
          </Button>
        </div>
      )}
    </div>
  );
};

export default WeaponControls;
