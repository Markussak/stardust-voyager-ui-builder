
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShipEditorProvider } from "@/contexts/ShipEditorContext";
import SpaceBackground from '@/components/game/SpaceBackground';
import CockpitOverlay from '@/components/game/CockpitOverlay';
import ShipDisplay from "@/components/ship-editor/ShipDisplay";
import AvailableModulesPanel from "@/components/ship-editor/AvailableModulesPanel";
import ShipStatsPanel from "@/components/ship-editor/ShipStatsPanel";
import ModuleInfoPanel from "@/components/ship-editor/ModuleInfoPanel";
import ConfirmationCostPanel from "@/components/ship-editor/ConfirmationCostPanel";
import ShipEditorFilters from "@/components/ship-editor/ShipEditorFilters";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ShipEditorScreen = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/galaxy-map');
  };

  return (
    <ShipEditorProvider>
      <div className="h-screen w-screen overflow-hidden bg-space-dark relative text-space-ui-text">
        {/* Background */}
        <SpaceBackground />
        
        {/* Cockpit overlay for consistency with other screens */}
        <CockpitOverlay />
        
        {/* Ship Editor UI */}
        <div className="relative z-20 flex flex-col h-full w-full p-4">
          {/* Top navigation and header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleBack}
                className="mr-4 border-space-buttons-border hover:bg-space-buttons-hover"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-2xl font-pixel text-space-ui-text">Editor Lodi</h1>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex flex-1 gap-4 mt-2 h-[calc(100%-10rem)]">
            {/* Left side - Available modules panel */}
            <div className="w-1/4 flex flex-col gap-4">
              <div className="flex-1 bg-space-dark bg-opacity-80 border border-space-buttons-border rounded-lg p-4 overflow-hidden">
                <h2 className="text-xl font-pixel mb-2">Dostupné Moduly</h2>
                <ShipEditorFilters />
                <div className="mt-4 h-[calc(100%-5rem)] overflow-auto">
                  <AvailableModulesPanel />
                </div>
              </div>
            </div>
            
            {/* Center - Ship display */}
            <div className="w-2/4 bg-space-dark bg-opacity-80 border border-space-buttons-border rounded-lg p-4">
              <h2 className="text-xl font-pixel mb-2 text-center">Hardpointy Lodi</h2>
              <div className="h-[calc(100%-3rem)] flex items-center justify-center">
                <ShipDisplay />
              </div>
            </div>
            
            {/* Right side - Ship stats and module info */}
            <div className="w-1/4 flex flex-col gap-4">
              {/* Ship stats panel */}
              <div className="h-1/2 bg-space-dark bg-opacity-80 border border-space-buttons-border rounded-lg p-4 overflow-auto">
                <h2 className="text-xl font-pixel mb-2">Statistiky Lodi</h2>
                <ShipStatsPanel />
              </div>
              
              {/* Module info panel */}
              <div className="h-1/2 bg-space-dark bg-opacity-80 border border-space-buttons-border rounded-lg p-4 overflow-auto">
                <h2 className="text-xl font-pixel mb-2">Detail Modulu</h2>
                <ModuleInfoPanel />
              </div>
            </div>
          </div>
          
          {/* Bottom - Confirmation and cost panel */}
          <div className="mt-4">
            <ConfirmationCostPanel />
          </div>
        </div>
      </div>
    </ShipEditorProvider>
  );
};

export default ShipEditorScreen;
