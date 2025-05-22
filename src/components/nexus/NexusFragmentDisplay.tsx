
import React from 'react';
import { NexusFragmentData } from '@/types/nexus';

interface NexusFragmentDisplayProps {
  fragment: NexusFragmentData;
  discovered?: boolean;
  onClick?: () => void;
  showDetails?: boolean;
}

const NexusFragmentDisplay: React.FC<NexusFragmentDisplayProps> = ({
  fragment,
  discovered = true,
  onClick,
  showDetails = false
}) => {
  // Generic placeholder for fragment icon since we don't have the actual assets
  const placeholderIcon = `/placeholder.svg`;
  
  return (
    <div 
      className={`relative rounded-lg overflow-hidden border cursor-pointer transition-all ${
        discovered 
          ? 'border-space-buttons-border bg-space-dark hover:bg-space-dark/80' 
          : 'border-gray-700/50 bg-space-dark/30 hover:bg-space-dark/40 grayscale'
      }`}
      onClick={onClick}
    >
      <div className="p-3 flex flex-col items-center">
        {/* Fragment Icon */}
        <div 
          className={`w-16 h-16 mb-2 bg-center bg-contain bg-no-repeat ${
            discovered ? 'animate-pulse' : 'opacity-50'
          }`}
          style={{ backgroundImage: `url(${discovered ? (fragment.iconAsset || placeholderIcon) : placeholderIcon})` }}
        />
        
        {/* Fragment Name */}
        <h3 className={`text-sm font-pixel text-center ${discovered ? 'text-space-ui-text' : 'text-space-ui-subtext'}`}>
          {discovered ? fragment.defaultFragmentName : '??? Fragment'}
        </h3>
        
        {/* Ability Name (if discovered) */}
        {discovered && fragment.associatedNexusAbility && (
          <span className="mt-1 text-xs text-space-buttons-glow">
            {fragment.associatedNexusAbility.defaultAbilityName}
          </span>
        )}
        
        {/* Additional Details */}
        {showDetails && discovered && (
          <div className="mt-3 text-xs text-space-ui-subtext">
            <p className="mb-2">{fragment.defaultVisualDescription_InWorld}</p>
            {fragment.associatedNexusAbility && (
              <>
                <div className="h-px bg-space-border w-full my-2"></div>
                <p className="text-space-ui-text">{fragment.associatedNexusAbility.defaultAbilityName}</p>
                <p className="mt-1">{fragment.associatedNexusAbility.defaultDescription}</p>
                <p className="mt-1 text-xs italic text-space-buttons-glow/70">{fragment.associatedNexusAbility.gameplayEffect_Description}</p>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* "New" indicator if recently discovered */}
      {discovered && (
        <div className="absolute top-1 right-1">
          <span className="px-1.5 py-0.5 bg-blue-900/80 text-[0.6rem] text-blue-200 rounded-sm">
            NALEZENO
          </span>
        </div>
      )}
    </div>
  );
};

export default NexusFragmentDisplay;
