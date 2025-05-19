
import React from 'react';
import { useDiplomacy, FactionId, DiplomaticStatus } from '@/contexts/DiplomacyContext';
import { cn } from '@/lib/utils';

const getRelationColor = (status: DiplomaticStatus): string => {
  switch (status) {
    case DiplomaticStatus.War:
      return '#cc0000';
    case DiplomaticStatus.Hostile:
      return '#ff6600';
    case DiplomaticStatus.Neutral:
      return '#8E9196';
    case DiplomaticStatus.Amity_NonAggressionPact:
      return '#66bb66';
    case DiplomaticStatus.Friendly_TradeAgreement:
      return '#33cc33';
    case DiplomaticStatus.Ally_DefensivePact:
      return '#00cc00';
    case DiplomaticStatus.Vassal:
    case DiplomaticStatus.Overlord:
      return '#9b87f5';
    default:
      return '#8E9196';
  }
};

const FactionListPanel: React.FC = () => {
  const { diplomacyState, selectFaction } = useDiplomacy();
  const { factions, playerRelations, selectedFactionId } = diplomacyState;

  const handleFactionSelect = (factionId: FactionId) => {
    selectFaction(factionId);
  };

  // Get discovered factions and filter out the player faction
  const discoveredFactions = Object.values(factions)
    .filter(faction => faction.discovered && faction.id !== FactionId.Player);

  const getStatusText = (status: DiplomaticStatus): string => {
    switch (status) {
      case DiplomaticStatus.War: return 'At War';
      case DiplomaticStatus.Hostile: return 'Hostile';
      case DiplomaticStatus.Neutral: return 'Neutral';
      case DiplomaticStatus.Amity_NonAggressionPact: return 'Non-Aggression';
      case DiplomaticStatus.Friendly_TradeAgreement: return 'Trade Partner';
      case DiplomaticStatus.Ally_DefensivePact: return 'Ally';
      case DiplomaticStatus.Vassal: return 'Vassal';
      case DiplomaticStatus.Overlord: return 'Overlord';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-space-dark/70 border border-space-buttons-border rounded-md p-3">
      <h2 className="font-pixel text-space-ui-text text-lg mb-4">Známé Frakce</h2>
      
      {discoveredFactions.length === 0 ? (
        <p className="text-space-ui-subtext text-center py-4">Nebyly objeveny žádné frakce.</p>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {discoveredFactions.map(faction => {
            const relation = playerRelations[faction.id];
            const relationColor = getRelationColor(relation.status);
            
            return (
              <div 
                key={faction.id}
                className={cn(
                  "flex items-center p-2 rounded cursor-pointer transition-colors",
                  selectedFactionId === faction.id 
                    ? "bg-space-buttons/80 border border-space-buttons-border" 
                    : "bg-space-dark/80 hover:bg-space-dark/60 border border-transparent"
                )}
                onClick={() => handleFactionSelect(faction.id)}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-space-dark"
                  style={{ backgroundColor: faction.color + '33' }}
                >
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: faction.color }}
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-pixel text-space-ui-text">{faction.name}</h3>
                  <p className="text-xs text-space-ui-subtext">{faction.governmentType}</p>
                </div>
                
                <div 
                  className="min-w-[5px] h-16 rounded-sm ml-2"
                  style={{ backgroundColor: relationColor }}
                />
                
                <div className="ml-2 text-right">
                  <p className="text-xs" style={{ color: relationColor }}>
                    {getStatusText(relation.status)}
                  </p>
                  <p className="text-xs text-space-ui-subtext">
                    {relation.relationValue > 0 ? '+' : ''}{relation.relationValue}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FactionListPanel;
