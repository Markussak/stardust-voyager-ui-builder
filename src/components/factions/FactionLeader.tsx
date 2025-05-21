
import React from 'react';
import { FactionId } from '@/types/diplomacy';
import { getFactionById } from '@/data/factions';
import { Card } from '@/components/ui/card';
import { FactionLeaderDefinition } from '@/types/factions';

interface FactionLeaderProps {
  factionId: FactionId | string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  showDetails?: boolean;
  className?: string;
}

const FactionLeader: React.FC<FactionLeaderProps> = ({
  factionId,
  size = 'md',
  showName = true,
  showDetails = false,
  className = ''
}) => {
  // Get extended faction data if available
  const extendedFaction = getFactionById(factionId as FactionId);
  
  // Get first leader if available
  const leader: FactionLeaderDefinition | undefined = extendedFaction?.leaders?.[0];
  
  if (!leader) {
    return (
      <div className="text-space-ui-subtext text-xs">
        Informace o vůdci nejsou k dispozici
      </div>
    );
  }
  
  // Generate portrait URL with variant
  const variant = 1; // Use first variant as default
  const portraitUrl = leader.portraitAsset_Template.replace('{variant}', variant.toString());
  
  // Determine size classes
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };
  
  return (
    <Card className={`bg-space-dark border-space-buttons-border overflow-hidden ${className}`}>
      <div className="flex flex-col items-center p-3">
        {/* Leader portrait */}
        <div 
          className={`${sizeClasses[size]} mb-2 rounded-md overflow-hidden border border-space-buttons-border/50 flex items-center justify-center`}
        >
          <img 
            src={portraitUrl}
            alt={leader.defaultName}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/assets/aliens/portraits/unknown_alien.png";
            }}
          />
        </div>
        
        {/* Leader name */}
        {showName && (
          <div className="text-center">
            <div className="text-space-ui-text font-medium">{leader.defaultName}</div>
            {showDetails && (
              <div className="text-xs text-space-ui-subtext mt-1">
                {leader.personalityTraits.slice(0, 2).join(', ')}
              </div>
            )}
          </div>
        )}
        
        {/* Leader details */}
        {showDetails && (
          <div className="w-full mt-2">
            <h4 className="text-xs font-semibold text-space-ui-text">Osobnostní rysy:</h4>
            <div className="text-xs text-space-ui-subtext mt-1">
              {leader.personalityTraits.map((trait, index) => (
                <span key={index}>
                  {trait}
                  {index < leader.personalityTraits.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
            
            <h4 className="text-xs font-semibold text-space-ui-text mt-2">Styl komunikace:</h4>
            <div className="text-xs text-space-ui-subtext mt-1">
              {leader.dialogueStyle_Key.replace(/_/g, ' ')}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FactionLeader;
