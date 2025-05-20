
import React from 'react';
import { useDiplomacy } from '@/contexts/DiplomacyContext';
import { cn } from '@/lib/utils';
import { Shield, Swords, GlassWater, Binary } from 'lucide-react';

const FactionDetailPanel: React.FC = () => {
  const { diplomacyState, selectedFactionId, factions } = useDiplomacy();
  
  // Use either the direct selectedFactionId or the one from diplomacyState
  const effectiveSelectedFactionId = selectedFactionId || (diplomacyState?.selectedFactionId || null);
  
  const selectedFaction = effectiveSelectedFactionId ? 
    (diplomacyState?.factions?.[effectiveSelectedFactionId] || factions.find(f => f.id === effectiveSelectedFactionId)) : 
    null;
    
  const relation = effectiveSelectedFactionId && diplomacyState?.playerRelations?.[effectiveSelectedFactionId];

  if (!selectedFaction) {
    return (
      <div className="bg-space-dark/70 border border-space-buttons-border rounded-md p-5 flex items-center justify-center h-full">
        <p className="font-pixel text-space-ui-subtext">Vyberte frakci ze seznamu</p>
      </div>
    );
  }

  // Create a power level descriptor function
  const getPowerLevelText = (value: number): string => {
    if (value >= 90) return 'Vynikající';
    if (value >= 70) return 'Silná';
    if (value >= 50) return 'Průměrná';
    if (value >= 30) return 'Slabá';
    return 'Velmi slabá';
  };

  // Get power values safely, with fallbacks
  const militaryPower = selectedFaction.power?.military || 0;
  const economicPower = selectedFaction.power?.economic || selectedFaction.power?.economy || 0;
  const techPower = selectedFaction.power?.tech || selectedFaction.power?.technological || 0;

  // Use color property from either place it might be defined
  const factionColor = selectedFaction.color || selectedFaction.primaryColor;

  return (
    <div className="bg-space-dark/70 border border-space-buttons-border rounded-md p-5">
      <div className="flex items-center mb-6">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
          style={{ backgroundColor: factionColor + '33' }}
        >
          <div 
            className="w-12 h-12 rounded-full" 
            style={{ backgroundColor: factionColor }}
          />
        </div>
        
        <div>
          <h2 
            className="font-pixel text-2xl" 
            style={{ color: factionColor }}
          >
            {selectedFaction.name}
          </h2>
          <p className="text-space-ui-subtext">{selectedFaction.governmentType || selectedFaction.government}</p>
        </div>
      </div>
      
      <div className="bg-space-dark/50 rounded p-3 mb-6 max-h-40 overflow-y-auto custom-scrollbar">
        <p className="text-space-ui-text">{selectedFaction.description}</p>
      </div>
      
      <div className="mb-6">
        <h3 className="font-pixel text-space-ui-text mb-2">Síla Frakce</h3>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <Swords className="text-red-500 mr-2" size={16} />
            <span className="text-space-ui-subtext text-sm w-24">Vojenská:</span>
            <div className="flex-grow bg-space-dark rounded-full h-2 overflow-hidden">
              <div 
                className="bg-red-500 h-full rounded-full" 
                style={{ width: `${militaryPower}%` }}
              />
            </div>
            <span className="ml-2 text-sm text-space-ui-subtext">{getPowerLevelText(militaryPower)}</span>
          </div>
          
          <div className="flex items-center">
            <GlassWater className="text-yellow-500 mr-2" size={16} />
            <span className="text-space-ui-subtext text-sm w-24">Ekonomická:</span>
            <div className="flex-grow bg-space-dark rounded-full h-2 overflow-hidden">
              <div 
                className="bg-yellow-500 h-full rounded-full" 
                style={{ width: `${economicPower}%` }}
              />
            </div>
            <span className="ml-2 text-sm text-space-ui-subtext">{getPowerLevelText(economicPower)}</span>
          </div>
          
          <div className="flex items-center">
            <Binary className="text-blue-500 mr-2" size={16} />
            <span className="text-space-ui-subtext text-sm w-24">Technologická:</span>
            <div className="flex-grow bg-space-dark rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full" 
                style={{ width: `${techPower}%` }}
              />
            </div>
            <span className="ml-2 text-sm text-space-ui-subtext">{getPowerLevelText(techPower)}</span>
          </div>
        </div>
      </div>
      
      {relation && relation.treaties && relation.treaties.length > 0 && (
        <div className="mb-6">
          <h3 className="font-pixel text-space-ui-text mb-2">Aktivní smlouvy</h3>
          <div className="flex flex-wrap gap-2">
            {relation.treaties.map((treaty, index) => (
              <div 
                key={index} 
                className="bg-space-dark/80 border border-space-buttons-border rounded px-2 py-1 flex items-center"
              >
                <Shield className="text-space-buttons mr-1" size={16} />
                <span className="text-sm text-space-ui-text">
                  {treaty.type === 'trade_agreement' ? 'Obchodní dohoda' : 
                   treaty.type === 'non_aggression_pact' ? 'Pakt o neútočení' : 
                   treaty.type === 'defensive_alliance' ? 'Obranné spojenectví' : 
                   treaty.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {relation && (
        <div>
          <h3 className="font-pixel text-space-ui-text mb-2">Vztah k vaší frakci</h3>
          <div className="flex items-center">
            <div 
              className="w-full bg-space-dark rounded-full h-3 overflow-hidden"
            >
              <div 
                className={cn(
                  "h-full", 
                  relation.relationValue >= 0 ? "bg-green-500" : "bg-red-500",
                  "rounded-full transition-all duration-500"
                )}
                style={{ 
                  width: `${Math.abs(relation.relationValue)}%`, 
                  marginLeft: relation.relationValue >= 0 ? '50%' : `${50 - Math.abs(relation.relationValue)/2}%`
                }}
              />
              <div className="h-full w-[2px] bg-white absolute left-1/2 top-0 transform -translate-x-1/2" />
            </div>
          </div>
          
          <div className="flex justify-between mt-1 text-xs text-space-ui-subtext">
            <span>Nepřítel</span>
            <span>Neutrální</span>
            <span>Spojenec</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactionDetailPanel;
