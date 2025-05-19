import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  ResearchState, 
  ResearchTechnologyDefinition, 
  ResearchCategoryDefinition,
  ResearchNodeState,
  ResearchPointDefinition
} from '@/types/research';
import { TECHNOLOGIES, RESEARCH_CATEGORIES, RESEARCH_POINTS } from '@/data/researchTechnologies';
import { toast } from "sonner";

interface ResearchContextType {
  // State
  researchState: ResearchState;
  technologies: ResearchTechnologyDefinition[];
  categories: ResearchCategoryDefinition[];
  researchPoints: ResearchPointDefinition[];
  
  // Actions
  selectTechnology: (techId: string | undefined) => void;
  startResearch: (techId: string) => void;
  cancelResearch: (techId: string) => void;
  addToQueue: (techId: string) => void;
  removeFromQueue: (techId: string) => void;
  setActiveCategoryFilter: (categoryKey: string | undefined) => void;
  updateViewPosition: (position: { x: number; y: number }) => void;
  updateZoomLevel: (zoomLevel: number) => void;
  
  // Helpers
  getNodeState: (techId: string) => ResearchNodeState;
  getTechById: (techId: string) => ResearchTechnologyDefinition | undefined;
  getCategoryById: (categoryKey: string) => ResearchCategoryDefinition | undefined;
  canResearch: (techId: string) => boolean;
  hasRequiredResources: (techId: string) => boolean;
  arePrerequisitesMet: (techId: string) => boolean;
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export const ResearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with mock data
  const [researchState, setResearchState] = useState<ResearchState>({
    availableTechnologies: [],
    researchedTechnologies: [],
    researchQueue: [],
    researchPoints: {
      "ResearchPoints_General": 300,
      "ResearchPoints_Propulsion": 150
    },
    selectedTechId: undefined,
    visibleCategories: RESEARCH_CATEGORIES.map(c => c.categoryKey),
    activeCategoryFilter: undefined,
    viewPosition: { x: 0, y: 0 },
    zoomLevel: 1
  });

  // Initialize available technologies based on prerequisites
  useEffect(() => {
    const availableTechs = TECHNOLOGIES.filter(tech => 
      !researchState.researchedTechnologies.includes(tech.techId) &&
      tech.prerequisites_TechIds.every(prereq => 
        researchState.researchedTechnologies.includes(prereq)
      )
    ).map(tech => tech.techId);
    
    setResearchState(prev => ({
      ...prev,
      availableTechnologies: availableTechs
    }));
  }, [researchState.researchedTechnologies]);

  // Select a technology
  const selectTechnology = (techId: string | undefined) => {
    setResearchState(prev => ({
      ...prev,
      selectedTechId: techId
    }));
  };

  // Start researching a technology
  const startResearch = (techId: string) => {
    const tech = TECHNOLOGIES.find(t => t.techId === techId);
    if (!tech) return;

    // Check if can research
    if (!canResearch(techId)) {
      toast.error("Nelze zkoumat tuto technologii");
      return;
    }

    // Deduct research points
    const updatedResearchPoints = { ...researchState.researchPoints };
    tech.researchCosts.forEach(cost => {
      if (updatedResearchPoints[cost.resourceId]) {
        updatedResearchPoints[cost.resourceId] -= cost.quantity;
      }
    });

    // Add to researched technologies if it's an instant research
    if (!tech.researchTime_Units) {
      setResearchState(prev => ({
        ...prev,
        researchedTechnologies: [...prev.researchedTechnologies, techId],
        researchPoints: updatedResearchPoints
      }));
      
      toast.success(`Technologie "${tech.defaultTechName}" byla úspěšně vyzkoumána!`);
    } else {
      // Otherwise, set as currently researching
      setResearchState(prev => ({
        ...prev,
        currentlyResearching: {
          techId,
          progressPercent: 0,
          timeRemaining_Units: tech.researchTime_Units
        },
        researchPoints: updatedResearchPoints
      }));
      
      toast.info(`Započal výzkum technologie "${tech.defaultTechName}"`);
    }
  };

  // Cancel research
  const cancelResearch = (techId: string) => {
    if (researchState.currentlyResearching?.techId !== techId) return;
    
    setResearchState(prev => ({
      ...prev,
      currentlyResearching: undefined
    }));
    
    toast.info("Výzkum byl zrušen");
  };

  // Add to research queue
  const addToQueue = (techId: string) => {
    if (researchState.researchQueue.includes(techId)) return;
    
    setResearchState(prev => ({
      ...prev,
      researchQueue: [...prev.researchQueue, techId]
    }));
    
    const tech = TECHNOLOGIES.find(t => t.techId === techId);
    toast.info(`Technologie "${tech?.defaultTechName}" byla přidána do fronty`);
  };

  // Remove from research queue
  const removeFromQueue = (techId: string) => {
    setResearchState(prev => ({
      ...prev,
      researchQueue: prev.researchQueue.filter(id => id !== techId)
    }));
    
    const tech = TECHNOLOGIES.find(t => t.techId === techId);
    toast.info(`Technologie "${tech?.defaultTechName}" byla odebrána z fronty`);
  };

  // Set active category filter
  const setActiveCategoryFilter = (categoryKey: string | undefined) => {
    setResearchState(prev => ({
      ...prev,
      activeCategoryFilter: categoryKey
    }));
  };

  // Update view position (pan)
  const updateViewPosition = (position: { x: number; y: number }) => {
    setResearchState(prev => ({
      ...prev,
      viewPosition: position
    }));
  };

  // Update zoom level
  const updateZoomLevel = (zoomLevel: number) => {
    setResearchState(prev => ({
      ...prev,
      zoomLevel: zoomLevel
    }));
  };

  // Get node state
  const getNodeState = (techId: string): ResearchNodeState => {
    if (researchState.researchedTechnologies.includes(techId)) {
      return ResearchNodeState.Researched;
    }
    
    if (researchState.currentlyResearching?.techId === techId) {
      return ResearchNodeState.CurrentlyResearching;
    }
    
    const tech = TECHNOLOGIES.find(t => t.techId === techId);
    if (!tech) return ResearchNodeState.Locked_PrerequisitesNotMet;
    
    const prereqsMet = arePrerequisitesMet(techId);
    if (!prereqsMet) {
      return ResearchNodeState.Locked_PrerequisitesNotMet;
    }
    
    const hasResources = hasRequiredResources(techId);
    if (!hasResources) {
      return ResearchNodeState.Locked_ResourcesNotAvailable;
    }
    
    return ResearchNodeState.AvailableToResearch;
  };

  // Get technology by ID
  const getTechById = (techId: string): ResearchTechnologyDefinition | undefined => {
    return TECHNOLOGIES.find(tech => tech.techId === techId);
  };

  // Get category by ID
  const getCategoryById = (categoryKey: string): ResearchCategoryDefinition | undefined => {
    return RESEARCH_CATEGORIES.find(cat => cat.categoryKey === categoryKey);
  };

  // Check if can research a technology
  const canResearch = (techId: string): boolean => {
    return arePrerequisitesMet(techId) && hasRequiredResources(techId);
  };

  // Check if has required resources
  const hasRequiredResources = (techId: string): boolean => {
    const tech = TECHNOLOGIES.find(t => t.techId === techId);
    if (!tech) return false;
    
    return tech.researchCosts.every(cost => {
      const available = researchState.researchPoints[cost.resourceId] || 0;
      return available >= cost.quantity;
    });
  };

  // Check if prerequisites are met
  const arePrerequisitesMet = (techId: string): boolean => {
    const tech = TECHNOLOGIES.find(t => t.techId === techId);
    if (!tech) return false;
    
    return tech.prerequisites_TechIds.every(prereqId => 
      researchState.researchedTechnologies.includes(prereqId)
    );
  };

  const value = {
    researchState,
    technologies: TECHNOLOGIES,
    categories: RESEARCH_CATEGORIES,
    researchPoints: RESEARCH_POINTS,
    
    selectTechnology,
    startResearch,
    cancelResearch,
    addToQueue,
    removeFromQueue,
    setActiveCategoryFilter,
    updateViewPosition,
    updateZoomLevel,
    
    getNodeState,
    getTechById,
    getCategoryById,
    canResearch,
    hasRequiredResources,
    arePrerequisitesMet
  };

  return (
    <ResearchContext.Provider value={value}>
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearch = (): ResearchContextType => {
  const context = useContext(ResearchContext);
  if (context === undefined) {
    throw new Error('useResearch must be used within a ResearchProvider');
  }
  return context;
};
