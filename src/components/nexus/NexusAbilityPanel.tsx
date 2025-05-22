
import React, { useState } from 'react';
import { NexusFragmentAbility } from '@/types/nexus';
import { useNexus } from '@/contexts/NexusContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const NexusAbilityPanel: React.FC = () => {
  const { nexusAbilities, activateAbility } = useNexus();
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  
  // No abilities yet
  if (nexusAbilities.length === 0) {
    return (
      <div className="bg-space-dark/60 border border-space-border p-3 rounded-md">
        <p className="text-space-ui-subtext text-sm text-center">
          Žádné schopnosti Nexusu nejsou dostupné.
        </p>
        <p className="text-xs text-center mt-2 text-space-ui-subtext/70">
          Získejte fragmenty Nexusu pro odemčení speciálních schopností.
        </p>
      </div>
    );
  }
  
  // Handle ability activation
  const handleActivateAbility = (ability: NexusFragmentAbility) => {
    if (cooldowns[ability.abilityId]) return;
    
    const success = activateAbility(ability.abilityId);
    
    if (success && ability.cooldown_Seconds) {
      // Set cooldown
      setCooldowns(prev => ({ ...prev, [ability.abilityId]: ability.cooldown_Seconds }));
      
      // Start cooldown countdown
      const interval = setInterval(() => {
        setCooldowns(prev => {
          const newCooldown = prev[ability.abilityId] - 1;
          if (newCooldown <= 0) {
            clearInterval(interval);
            const newCooldowns = {...prev};
            delete newCooldowns[ability.abilityId];
            return newCooldowns;
          }
          return { ...prev, [ability.abilityId]: newCooldown };
        });
      }, 1000);
    }
  };
  
  return (
    <div className="bg-space-dark/60 border border-space-border p-3 rounded-md">
      <h3 className="text-space-ui-text font-pixel mb-2">Schopnosti Nexusu</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {nexusAbilities.map((ability) => (
          <TooltipProvider key={ability.abilityId}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`relative justify-start w-full h-16 overflow-hidden ${
                    cooldowns[ability.abilityId] ? 'opacity-60 bg-gray-800' : 'bg-space-buttons/30'
                  }`}
                  onClick={() => handleActivateAbility(ability)}
                  disabled={!!cooldowns[ability.abilityId]}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-space-dark/70 rounded-sm mr-2 flex items-center justify-center">
                      <div className="w-8 h-8 bg-contain bg-center bg-no-repeat" 
                        style={{ backgroundImage: `url(/placeholder.svg)` }} />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-pixel">{ability.defaultAbilityName}</div>
                      <div className="text-xs text-space-ui-subtext truncate">
                        {cooldowns[ability.abilityId] 
                          ? `Cooldown: ${cooldowns[ability.abilityId]}s` 
                          : `Energie: ${ability.energy_Cost || 0}`
                        }
                      </div>
                    </div>
                  </div>
                  
                  {/* Cooldown overlay */}
                  {cooldowns[ability.abilityId] && (
                    <div 
                      className="absolute bottom-0 left-0 h-1 bg-space-buttons-glow" 
                      style={{ 
                        width: `${(1 - cooldowns[ability.abilityId] / (ability.cooldown_Seconds || 1)) * 100}%` 
                      }} 
                    />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="w-64 p-3">
                <div>
                  <div className="font-pixel text-sm mb-1">{ability.defaultAbilityName}</div>
                  <p className="text-xs mb-2">{ability.defaultDescription}</p>
                  <p className="text-xs text-blue-300">{ability.gameplayEffect_Description}</p>
                  <div className="flex justify-between mt-2 text-xs text-space-ui-subtext">
                    <span>Cooldown: {ability.cooldown_Seconds}s</span>
                    <span>Energie: {ability.energy_Cost}</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default NexusAbilityPanel;
