
import React from 'react';
import { ResearchProvider } from '@/contexts/ResearchContext';
import ResearchTreeDisplay from '@/components/research/ResearchTreeDisplay';
import ResearchPointsDisplay from '@/components/research/ResearchPointsDisplay';
import ResearchCategoryFilter from '@/components/research/ResearchCategoryFilter';
import TechnologyDetailsPanel from '@/components/research/TechnologyDetailsPanel';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ResearchTreeScreen: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <ResearchProvider>
      <div className="h-screen w-screen overflow-hidden bg-space-dark">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
              className="mr-2 text-space-ui-text hover:bg-space-buttons/50"
            >
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-space-ui-text">Výzkumný Strom</h1>
          </div>
          
          {/* Research Points Display */}
          <ResearchPointsDisplay />
        </div>
        
        {/* Main content */}
        <div className="flex h-[calc(100vh-80px)] p-4 gap-4">
          {/* Main research tree area */}
          <div className="flex flex-col flex-grow h-full">
            {/* Category filter */}
            <div className="mb-4">
              <ResearchCategoryFilter />
            </div>
            
            {/* Research tree display */}
            <div className="flex-grow">
              <ResearchTreeDisplay />
            </div>
          </div>
          
          {/* Technology details panel */}
          <div className="w-80 h-full">
            <TechnologyDetailsPanel />
          </div>
        </div>
      </div>
    </ResearchProvider>
  );
};

export default ResearchTreeScreen;
