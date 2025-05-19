
import React from 'react';
import { useResearch } from '@/contexts/ResearchContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ResearchPointsDisplay: React.FC = () => {
  const { researchState, researchPoints } = useResearch();
  
  return (
    <div className="flex space-x-4 p-2 bg-space-dark/70 rounded-lg">
      {researchPoints.map(point => (
        <TooltipProvider key={point.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2 px-3 py-1 bg-space-buttons/40 rounded-md">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  style={{ 
                    backgroundColor: point.id === 'ResearchPoints_General' ? '#9b87f5' : '#33C3F0'
                  }}
                >
                  {point.id === 'ResearchPoints_General' ? 'RP' : 'PP'}
                </div>
                <div className="text-space-ui-text font-mono">
                  {researchState.researchPoints[point.id] || 0}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-space-dark border-space-buttons-border p-2">
              <div className="text-space-ui-text">
                <div className="font-semibold">{point.defaultDisplayName}</div>
                <div className="text-xs text-space-ui-subtext">{point.defaultGenerationInfo}</div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default ResearchPointsDisplay;
