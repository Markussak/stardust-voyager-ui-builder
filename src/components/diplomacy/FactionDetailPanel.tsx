
import React from 'react';
import { useDiplomacy } from '@/contexts/DiplomacyContext';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import FactionInfo from './FactionInfo';
import { getFactionById } from '@/data/factions';
import { Separator } from '@/components/ui/separator';
import { DiplomaticStatus, Faction } from '@/types/diplomacy';
import { Badge } from '@/components/ui/badge';

const getStatusColor = (status: DiplomaticStatus): string => {
  switch (status) {
    case DiplomaticStatus.War: return "bg-red-700";
    case DiplomaticStatus.Hostile: return "bg-red-500";
    case DiplomaticStatus.Neutral: return "bg-gray-500";
    case DiplomaticStatus.Amity_NonAggressionPact: return "bg-blue-400";
    case DiplomaticStatus.Friendly_TradeAgreement: return "bg-green-400";
    case DiplomaticStatus.Ally_DefensivePact: return "bg-green-600";
    case DiplomaticStatus.Vassal: return "bg-purple-500";
    case DiplomaticStatus.Overlord: return "bg-purple-700";
    default: return "bg-gray-500";
  }
};

const getStatusText = (status: DiplomaticStatus): string => {
  switch (status) {
    case DiplomaticStatus.War: return "Válka";
    case DiplomaticStatus.Hostile: return "Nepřátelský";
    case DiplomaticStatus.Neutral: return "Neutrální";
    case DiplomaticStatus.Amity_NonAggressionPact: return "Pakt o neútočení";
    case DiplomaticStatus.Friendly_TradeAgreement: return "Obchodní dohoda";
    case DiplomaticStatus.Ally_DefensivePact: return "Spojenec";
    case DiplomaticStatus.Vassal: return "Vazal";
    case DiplomaticStatus.Overlord: return "Suzerén";
    default: return "Neznámý";
  }
};

const getAttitudeDescription = (value: number): string => {
  if (value < -75) return "Nenávidí vás";
  if (value < -50) return "Silně nepřátelský";
  if (value < -25) return "Nepřátelský";
  if (value < 0) return "Obezřetný";
  if (value === 0) return "Neutrální";
  if (value < 25) return "Přátelský";
  if (value < 50) return "Velmi přátelský";
  if (value < 75) return "Spojenecký";
  return "Loajální";
};

const FactionDetailPanel: React.FC = () => {
  const { diplomacyState } = useDiplomacy();
  const { toast } = useToast();

  if (!diplomacyState || !diplomacyState.selectedFactionId || !diplomacyState.factions[diplomacyState.selectedFactionId]) {
    return (
      <Card className="bg-space-dark/70 border border-space-buttons-border rounded-md p-5 h-full flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <p className="font-pixel text-space-ui-subtext">Vyberte frakci pro zobrazení detailů</p>
        </div>
      </Card>
    );
  }

  const selectedFaction = diplomacyState.factions[diplomacyState.selectedFactionId];
  const extendedFactionData = getFactionById(selectedFaction.id as any);
  const relation = diplomacyState.playerRelations[selectedFaction.id];
  const treaties = relation?.treaties || [];

  const handleLearnMoreClick = () => {
    toast({
      title: "Knihovna znalostí",
      description: `Informace o frakci ${selectedFaction.name} budou dostupné v Knihovně znalostí.`,
    });
  };

  return (
    <Card className="bg-space-dark/70 border border-space-buttons-border rounded-md p-5 h-full flex flex-col overflow-auto">
      {/* Use the extended faction data if available, otherwise use basic data */}
      {extendedFactionData ? (
        <FactionInfo faction={extendedFactionData} />
      ) : (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="w-12 h-12 mr-4 flex-shrink-0 bg-space-ui-subtext/20 rounded-md flex items-center justify-center overflow-hidden">
              {selectedFaction.logoUrl ? (
                <img 
                  src={selectedFaction.logoUrl} 
                  alt={selectedFaction.name} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/assets/factions/logos/default_faction.png";
                  }}
                />
              ) : (
                <span className="text-space-ui-subtext text-xl font-bold">
                  {selectedFaction.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-pixel text-space-ui-text">{selectedFaction.name}</h3>
              <p className="text-sm text-space-ui-subtext">{selectedFaction.government}</p>
            </div>
          </div>
          <p className="text-space-ui-subtext text-sm mt-2">{selectedFaction.description}</p>
        </div>
      )}

      <Separator className="my-4 bg-space-buttons-border/30" />

      {/* Relation with player section */}
      <div className="mb-4">
        <h3 className="text-lg font-pixel text-space-ui-text mb-2">Vztah s vámi</h3>
        
        <div className="flex items-center mb-3">
          <Badge className={`mr-2 ${getStatusColor(relation.status)}`}>
            {getStatusText(relation.status)}
          </Badge>
          <span className="text-space-ui-subtext text-sm">
            {getAttitudeDescription(relation.relationValue)}
          </span>
        </div>
        
        {/* Relation value bar */}
        <div className="h-2 bg-space-dark rounded-full overflow-hidden mb-1">
          <div 
            className={`h-full ${relation.relationValue >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ 
              width: `${Math.min(Math.abs(relation.relationValue), 100)}%`,
              marginLeft: relation.relationValue >= 0 ? '50%' : `${50 - Math.min(Math.abs(relation.relationValue), 50)}%`
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-space-ui-subtext">
          <span>-100</span>
          <span>0</span>
          <span>+100</span>
        </div>
      </div>

      {/* Active treaties section */}
      <div className="mb-4">
        <h3 className="text-lg font-pixel text-space-ui-text mb-2">Aktivní smlouvy</h3>
        {treaties.length > 0 ? (
          <ul className="space-y-2">
            {treaties.map((treaty) => (
              <li key={treaty.id} className="text-sm bg-space-dark/50 border border-space-buttons-border/30 rounded p-2">
                <div className="font-semibold text-space-ui-text">{treaty.name}</div>
                <div className="text-space-ui-subtext text-xs mt-1">{treaty.description}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-space-ui-subtext text-sm">Nemáte žádné aktivní smlouvy s touto frakcí.</p>
        )}
      </div>

      {/* Show power info from original faction data */}
      <div className="mb-4">
        <h3 className="text-lg font-pixel text-space-ui-text mb-2">Síla frakce</h3>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <div className="text-xs text-space-ui-subtext">Vojenská</div>
            <div className="w-full bg-space-dark/50 h-2 rounded-full mt-1">
              <div 
                className="bg-red-500 h-full rounded-full" 
                style={{ width: `${selectedFaction.power.military}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="text-xs text-space-ui-subtext">Ekonomická</div>
            <div className="w-full bg-space-dark/50 h-2 rounded-full mt-1">
              <div 
                className="bg-yellow-500 h-full rounded-full" 
                style={{ width: `${selectedFaction.power.economic}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="text-xs text-space-ui-subtext">Technologická</div>
            <div className="w-full bg-space-dark/50 h-2 rounded-full mt-1">
              <div 
                className="bg-blue-500 h-full rounded-full" 
                style={{ width: `${selectedFaction.power.tech}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Codex link */}
      <div className="mt-auto pt-4">
        <button 
          onClick={handleLearnMoreClick}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Zobrazit v Knihovně znalostí...
        </button>
      </div>
    </Card>
  );
};

export default FactionDetailPanel;
