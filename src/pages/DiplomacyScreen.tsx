
import React from 'react';
import { DiplomacyProvider } from '@/contexts/DiplomacyContext';
import FactionListPanel from '@/components/diplomacy/FactionListPanel';
import FactionDetailPanel from '@/components/diplomacy/FactionDetailPanel';
import DiplomaticActionsPanel from '@/components/diplomacy/DiplomaticActionsPanel';
import SpaceBackground from '@/components/game/SpaceBackground';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const DiplomacyScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DiplomacyProvider>
      <div className="h-screen w-screen overflow-hidden bg-space-dark relative">
        {/* Background */}
        <SpaceBackground />
        
        {/* Close button */}
        <Button 
          variant="outline" 
          className="absolute top-4 right-4 z-30 border-space-buttons-border bg-space-dark/80"
          onClick={() => navigate(-1)}
        >
          <X size={20} />
        </Button>
        
        {/* Overlay with title */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-dark/80 to-transparent z-10 pointer-events-none">
          <h1 className="font-pixel text-3xl text-space-ui-text text-center mt-8">DIPLOMACIE</h1>
        </div>
        
        {/* Diplomacy interface */}
        <div className="relative z-20 w-11/12 h-[85%] mx-auto mt-20 grid grid-cols-12 gap-4">
          {/* Faction list */}
          <div className="col-span-3">
            <FactionListPanel />
          </div>
          
          {/* Faction details */}
          <div className="col-span-6">
            <FactionDetailPanel />
          </div>
          
          {/* Diplomatic actions */}
          <div className="col-span-3">
            <DiplomaticActionsPanel />
          </div>
        </div>
      </div>
    </DiplomacyProvider>
  );
};

export default DiplomacyScreen;
