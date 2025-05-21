
import React, { useState } from 'react';
import { FactionId } from '@/types/diplomacy';
import { useDiplomacy } from '@/contexts/DiplomacyContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import FactionLogo from './FactionLogo';
import FactionRelationshipStatus from './FactionRelationshipStatus';
import { Button } from '@/components/ui/button';
import { getFactionById } from '@/data/factions';

interface FactionsListProps {
  onSelectFaction?: (factionId: FactionId) => void;
  showFilter?: boolean;
  showDiscoveredOnly?: boolean;
  compact?: boolean;
  title?: string;
  maxHeight?: string;
  className?: string;
}

const FactionsList: React.FC<FactionsListProps> = ({
  onSelectFaction,
  showFilter = true,
  showDiscoveredOnly = true,
  compact = false,
  title = 'Frakce',
  maxHeight = '400px',
  className = ''
}) => {
  const { factions, diplomacyState } = useDiplomacy();
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!factions || !diplomacyState) {
    return (
      <Card className="bg-space-dark/70 border border-space-buttons-border rounded-md p-3">
        <div className="text-space-ui-subtext">Načítání frakcí...</div>
      </Card>
    );
  }
  
  // Filter factions by search term and discovered status
  const filteredFactions = factions.filter(faction => 
    (!showDiscoveredOnly || faction.discovered) && 
    faction.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card className={`bg-space-dark/70 border border-space-buttons-border rounded-md p-3 ${className}`}>
      {!compact && <h3 className="font-pixel text-space-ui-text text-lg mb-3">{title}</h3>}
      
      {/* Search input */}
      {showFilter && (
        <div className="relative mb-3">
          <Search className="h-4 w-4 absolute left-3 top-3 text-space-ui-subtext" />
          <Input
            placeholder="Hledat frakci..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-space-dark border-space-buttons-border text-space-ui-text text-sm h-10"
          />
        </div>
      )}
      
      {/* Factions list */}
      <ScrollArea className="w-full" style={{ maxHeight }}>
        <div className="space-y-2">
          {filteredFactions.length > 0 ? (
            filteredFactions.map((faction) => {
              const extendedFaction = getFactionById(faction.id as FactionId);
              
              return (
                <Button
                  key={faction.id}
                  variant="ghost"
                  onClick={() => onSelectFaction?.(faction.id as FactionId)}
                  className={`
                    w-full flex items-center justify-between p-2 rounded-md
                    hover:bg-space-buttons/30 border border-transparent
                    hover:border-space-buttons-border/50 h-auto
                  `}
                >
                  <div className="flex items-center flex-grow">
                    {/* Logo */}
                    <FactionLogo 
                      factionId={faction.id} 
                      size={compact ? 'sm' : 'md'}
                      showBackground={true}
                      showBorder={false}
                      className="mr-3"
                    />
                    
                    {/* Name and details */}
                    <div className="flex flex-col items-start">
                      <div className="text-space-ui-text font-medium text-sm text-left">
                        {faction.name}
                      </div>
                      
                      {!compact && (
                        <div className="text-xs text-space-ui-subtext text-left">
                          {extendedFaction 
                            ? extendedFaction.diplomacyAI.governmentType.replace('_', ' ') 
                            : faction.government}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Relation status */}
                  <FactionRelationshipStatus 
                    factionId={faction.id} 
                    showBadge={false}
                    showText={false}
                    showValue={!compact}
                  />
                </Button>
              );
            })
          ) : (
            <div className="text-center py-3 text-space-ui-subtext">
              Žádné frakce neodpovídají hledání
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="text-xs text-space-ui-subtext mt-2">
        Zobrazeno {filteredFactions.length} {showDiscoveredOnly ? 'známých ' : ''}frakcí
      </div>
    </Card>
  );
};

export default FactionsList;
