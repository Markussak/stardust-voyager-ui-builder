
import React from 'react';
import { FactionId } from '@/types/diplomacy';
import { getFactionById } from '@/data/factions';

interface FactionLogoProps {
  factionId: FactionId | string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
  showBackground?: boolean;
}

const FactionLogo: React.FC<FactionLogoProps> = ({
  factionId,
  size = 'md',
  className = '',
  showBorder = true,
  showBackground = true
}) => {
  // Get extended faction data if available
  const extendedFaction = getFactionById(factionId as FactionId);
  
  // Determine logo URL based on size
  let logoUrl = '/assets/factions/logos/default_faction.png'; // Default fallback
  
  if (extendedFaction) {
    logoUrl = size === 'lg' || size === 'xl' 
      ? extendedFaction.visualIdentity.logo.assetUrl_Large 
      : extendedFaction.visualIdentity.logo.assetUrl_Small;
  }
  
  // Get primary color for border and background
  const primaryColor = extendedFaction?.visualIdentity.primaryColor || '#888888';
  
  // Determine size classes
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };
  
  return (
    <div 
      className={`
        relative flex items-center justify-center rounded-md overflow-hidden
        ${sizeClasses[size]} ${className}
        ${showBorder ? 'border' : ''}
      `}
      style={{ 
        borderColor: showBorder ? primaryColor : 'transparent',
        background: showBackground ? `${primaryColor}33` : 'transparent'
      }}
    >
      <img 
        src={logoUrl}
        alt={extendedFaction?.defaultFactionName || `Faction ${factionId}`}
        className="w-[80%] h-[80%] object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/assets/factions/logos/default_faction.png";
        }}
      />
    </div>
  );
};

export default FactionLogo;
