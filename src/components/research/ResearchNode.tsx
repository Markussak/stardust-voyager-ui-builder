
import React from 'react';
import { useResearch } from '@/contexts/ResearchContext';
import { ResearchNodeState } from '@/types/research';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ResearchNodeProps {
  techId: string;
}

const ResearchNode: React.FC<ResearchNodeProps> = ({ techId }) => {
  const { 
    selectTechnology, 
    getNodeState, 
    getTechById,
    researchState,
    getCategoryById
  } = useResearch();
  
  const tech = getTechById(techId);
  if (!tech) return null;
  
  const nodeState = getNodeState(techId);
  const category = getCategoryById(tech.categoryKey);
  const colorTheme = category?.colorTheme || '#9b87f5';
  
  const isSelected = researchState.selectedTechId === techId;
  
  const handleClick = () => {
    selectTechnology(techId);
  };
  
  // Different styles based on node state
  const getNodeStyle = () => {
    switch (nodeState) {
      case ResearchNodeState.Locked_PrerequisitesNotMet:
        return 'bg-gray-800 border-gray-600 opacity-50';
      case ResearchNodeState.Locked_ResourcesNotAvailable:
        return 'bg-gray-800 border-amber-700 opacity-80';
      case ResearchNodeState.AvailableToResearch:
        return `bg-space-dark border-2 border-${colorTheme} animate-pulse`;
      case ResearchNodeState.CurrentlyResearching:
        return `bg-space-dark border-2 border-${colorTheme} animate-pulse`;
      case ResearchNodeState.Researched:
        return `bg-space-dark border-2 border-${colorTheme}`;
      default:
        return 'bg-gray-800 border-gray-600';
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all',
              getNodeStyle(),
              isSelected && 'ring-2 ring-white'
            )}
            style={{ 
              position: 'absolute',
              left: `${tech.nodePosition_InTree.x}px`,
              top: `${tech.nodePosition_InTree.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={handleClick}
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center">
                {/* Placeholder for tech icon */}
                <div 
                  className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: colorTheme }}
                >
                  {tech.defaultTechName.substring(0, 2)}
                </div>
              </div>
              
              {/* Progress indicator for researching state */}
              {nodeState === ResearchNodeState.CurrentlyResearching && (
                <div className="w-full h-1 bg-gray-700 mt-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white"
                    style={{ 
                      width: `${researchState.currentlyResearching?.progressPercent || 0}%` 
                    }}
                  />
                </div>
              )}
              
              {/* Check mark for researched state */}
              {nodeState === ResearchNodeState.Researched && (
                <div className="text-green-400 text-xs">✓</div>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-space-dark border-space-buttons-border p-2 max-w-xs">
          <div className="text-space-ui-text">
            <div className="font-bold">{tech.defaultTechName}</div>
            <div className="text-xs text-space-ui-subtext">{tech.defaultTechDescription}</div>
            
            {/* Display research costs */}
            {tech.researchCosts.length > 0 && (
              <div className="mt-1">
                <div className="text-xs font-semibold">Cena výzkumu:</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {tech.researchCosts.map((cost, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <span className="font-mono">{cost.quantity}</span>
                      <span className="ml-1">{cost.resourceId}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Display status */}
            <div className="mt-1 text-xs">
              {nodeState === ResearchNodeState.Locked_PrerequisitesNotMet && (
                <span className="text-red-400">Nesplněné předpoklady</span>
              )}
              {nodeState === ResearchNodeState.Locked_ResourcesNotAvailable && (
                <span className="text-amber-400">Nedostatek zdrojů</span>
              )}
              {nodeState === ResearchNodeState.AvailableToResearch && (
                <span className="text-green-400">Dostupné k výzkumu</span>
              )}
              {nodeState === ResearchNodeState.CurrentlyResearching && (
                <span className="text-blue-400">Probíhá výzkum</span>
              )}
              {nodeState === ResearchNodeState.Researched && (
                <span className="text-green-400">Vyzkoumáno</span>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ResearchNode;
