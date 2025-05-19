
import React from 'react';
import { useResearch } from '@/contexts/ResearchContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ResearchNodeState } from '@/types/research';

const TechnologyDetailsPanel: React.FC = () => {
  const { 
    researchState,
    getTechById,
    getCategoryById,
    getNodeState,
    startResearch,
    addToQueue,
    cancelResearch,
    selectTechnology
  } = useResearch();
  
  const selectedTechId = researchState.selectedTechId;
  
  if (!selectedTechId) {
    return (
      <div className="p-4 bg-space-dark border border-space-buttons-border rounded-lg h-full">
        <div className="text-space-ui-text text-center p-8">
          Vyberte technologii pro zobrazení detailů
        </div>
      </div>
    );
  }
  
  const tech = getTechById(selectedTechId);
  if (!tech) return null;
  
  const category = getCategoryById(tech.categoryKey);
  const nodeState = getNodeState(selectedTechId);
  
  const handleStartResearch = () => {
    startResearch(selectedTechId);
  };
  
  const handleAddToQueue = () => {
    addToQueue(selectedTechId);
  };
  
  const handleCancelResearch = () => {
    cancelResearch(selectedTechId);
    selectTechnology(undefined);
  };
  
  return (
    <div className="p-4 bg-space-dark border border-space-buttons-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-space-ui-text">{tech.defaultTechName}</h2>
          <div className="flex items-center mt-1">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: category?.colorTheme || '#9b87f5' }}
            ></div>
            <span className="text-sm text-space-ui-subtext">{category?.defaultDisplayName || "Neznámá kategorie"}</span>
          </div>
        </div>
        
        <div 
          className="w-12 h-12 rounded-md flex items-center justify-center"
          style={{ backgroundColor: category?.colorTheme || '#9b87f5' }}
        >
          {tech.defaultTechName.substring(0, 2)}
        </div>
      </div>
      
      <Separator className="my-4 bg-space-buttons-border/50" />
      
      {/* Description */}
      <div className="text-space-ui-text mb-4">
        {tech.defaultTechDescription}
      </div>
      
      {/* Research costs */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-space-ui-text mb-2">Cena výzkumu:</h3>
        <div className="flex flex-wrap gap-3">
          {tech.researchCosts.map((cost, index) => (
            <div 
              key={index}
              className="px-3 py-1 bg-space-buttons/20 rounded-md flex items-center space-x-2"
            >
              <span className="font-mono text-space-ui-text">{cost.quantity}</span>
              <span className="text-sm text-space-ui-subtext">{cost.resourceId}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Prerequisites */}
      {tech.prerequisites_TechIds.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-space-ui-text mb-2">Předpoklady:</h3>
          <div className="flex flex-wrap gap-2">
            {tech.prerequisites_TechIds.map(prereqId => {
              const prereq = getTechById(prereqId);
              const prereqState = getNodeState(prereqId);
              const isResearched = prereqState === ResearchNodeState.Researched;
              
              return (
                <div 
                  key={prereqId}
                  className={`px-2 py-1 rounded-md text-xs ${isResearched ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}
                >
                  {prereq?.defaultTechName || prereqId}
                  {isResearched ? ' ✓' : ' ✗'}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Unlocks */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-space-ui-text mb-2">Odemkne:</h3>
        <div className="space-y-2">
          {tech.unlocks.map((unlock, index) => (
            <div 
              key={index}
              className="px-3 py-2 bg-space-buttons/20 rounded-md"
            >
              <div className="text-sm text-space-ui-text">{unlock.defaultDescription}</div>
              {unlock.type === 'StatUpgrade_Global' && unlock.statModification && (
                <div className="text-xs text-space-ui-subtext mt-1">
                  {unlock.statModification.defaultDescription}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Spacer */}
      <div className="flex-grow"></div>
      
      {/* Action buttons */}
      <div className="flex flex-col space-y-2 mt-4">
        {nodeState === ResearchNodeState.AvailableToResearch && (
          <Button 
            className="w-full bg-space-buttons hover:bg-space-buttons-hover"
            onClick={handleStartResearch}
          >
            Začít výzkum
          </Button>
        )}
        
        {nodeState === ResearchNodeState.CurrentlyResearching && (
          <Button 
            className="w-full bg-red-700 hover:bg-red-800"
            onClick={handleCancelResearch}
          >
            Zrušit výzkum
          </Button>
        )}
        
        {nodeState === ResearchNodeState.Locked_ResourcesNotAvailable && (
          <Button 
            className="w-full"
            variant="outline"
            disabled
          >
            Nedostatek zdrojů
          </Button>
        )}
        
        {nodeState === ResearchNodeState.Locked_PrerequisitesNotMet && (
          <Button 
            className="w-full"
            variant="outline"
            disabled
          >
            Nesplněné předpoklady
          </Button>
        )}
        
        {nodeState === ResearchNodeState.Researched && (
          <Button 
            className="w-full bg-green-700 hover:bg-green-800"
            disabled
          >
            Vyzkoumáno
          </Button>
        )}
        
        {(nodeState === ResearchNodeState.AvailableToResearch || 
          nodeState === ResearchNodeState.Locked_ResourcesNotAvailable) && (
          <Button 
            className="w-full"
            variant="outline"
            onClick={handleAddToQueue}
            disabled={researchState.researchQueue.includes(selectedTechId)}
          >
            {researchState.researchQueue.includes(selectedTechId) 
              ? 'Už je ve frontě' 
              : 'Přidat do fronty'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TechnologyDetailsPanel;
