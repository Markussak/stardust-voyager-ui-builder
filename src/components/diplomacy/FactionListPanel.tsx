
import React, { useState } from 'react';
import { useDiplomacy, DiplomaticStatus } from '@/contexts/DiplomacyContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getFactionById } from '@/data/factions';
import { Separator } from '@/components/ui/separator';

// Function to determine relation color
const getRelationColor = (status: DiplomaticStatus): string => {
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

const FactionListPanel: React.FC = () => {
  const { diplomacyState, selectFaction } = useDiplomacy();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle case when state is not available
  if (!diplomacyState || !diplomacyState.factions) {
    return (
      <Card className="bg-space-dark/70 border border-space-buttons-border rounded-md p-5 h-full">
        <div className="text-space-ui-subtext">Načítání frakcí...</div>
      </Card>
    );
  }

  // Filter factions by search term and discovered status
  const filteredFactions = Object.values(diplomacyState.factions)
    .filter(faction => 
      faction.discovered && 
      faction.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Card className="bg-space-dark/70 border border-space-buttons-border rounded-md p-5 h-full flex flex-col">
      <h2 className="font-pixel text-space-ui-text text-lg mb-4">Známé Frakce</h2>
      
      {/* Search input */}
      <div className="relative mb-4">
        <Search className="h-4 w-4 absolute left-3 top-3 text-space-ui-subtext" />
        <Input
          placeholder="Hledat frakci..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 bg-space-dark border-space-buttons-border text-space-ui-text"
        />
      </div>
      
      {/* Factions list */}
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {filteredFactions.length > 0 ? (
            filteredFactions.map((faction) => {
              const isSelected = faction.id === diplomacyState.selectedFactionId;
              const relation = diplomacyState.playerRelations[faction.id];
              const relationStatus = relation?.status || DiplomaticStatus.Neutral;
              
              // Get extended faction data if available
              const extendedFaction = getFactionById(faction.id as any);
              const primaryColor = extendedFaction?.visualIdentity.primaryColor || faction.primaryColor || faction.color;
              
              return (
                <div
                  key={faction.id}
                  onClick={() => selectFaction(faction.id)}
                  className={`
                    flex items-center p-2 rounded cursor-pointer transition-colors
                    ${isSelected 
                      ? 'bg-space-buttons border border-space-buttons-border' 
                      : 'hover:bg-space-dark border border-transparent hover:border-space-buttons-border/50'}
                  `}
                >
                  {/* Logo/Avatar */}
                  <div 
                    className="w-10 h-10 rounded flex-shrink-0 mr-3 flex items-center justify-center overflow-hidden"
                    style={{ background: primaryColor ? `${primaryColor}33` : 'transparent', borderColor: primaryColor }}
                  >
                    {faction.logoUrl ? (
                      <img 
                        src={faction.logoUrl} 
                        alt={faction.name} 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/assets/factions/logos/default_faction.png";
                        }}
                      />
                    ) : (
                      <span className="text-space-ui-text">{faction.name.charAt(0)}</span>
                    )}
                  </div>
                  
                  {/* Name and government type */}
                  <div className="flex-1">
                    <div className="text-space-ui-text font-medium">{faction.name}</div>
                    <div className="text-xs text-space-ui-subtext">
                      {extendedFaction ? 
                        extendedFaction.diplomacyAI.governmentType.replace('_', ' ') : 
                        faction.government}
                    </div>
                  </div>
                  
                  {/* Relation status indicator */}
                  <div className={`w-2 h-2 rounded-full ${getRelationColor(relationStatus)}`}></div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 text-space-ui-subtext">
              Žádné frakce neodpovídají hledání
            </div>
          )}
        </div>
      </ScrollArea>
      
      <Separator className="my-4 bg-space-buttons-border/30" />
      
      <div className="text-xs text-space-ui-subtext">
        Zobrazeno {filteredFactions.length} známých frakcí
      </div>
    </Card>
  );
};

export default FactionListPanel;
