
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from "@/contexts/InventoryContext";
import SpaceBackground from '@/components/game/SpaceBackground';
import CockpitOverlay from '@/components/game/CockpitOverlay';
import InventoryFilters from "@/components/inventory/InventoryFilters";
import CargoHold from "@/components/inventory/CargoHold";
import SpecializedStorage from "@/components/inventory/SpecializedStorage";
import ItemDetailsPanel from "@/components/inventory/ItemDetailsPanel";
import CargoCapacityIndicator from "@/components/inventory/CargoCapacityIndicator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const InventoryScreen = () => {
  const navigate = useNavigate();
  const { inventory, selectItem } = useInventory();
  const [activeStorageTab, setActiveStorageTab] = useState('RawMaterials');

  const handleBack = () => {
    selectItem(undefined); // Clear selection
    navigate('/galaxy-map'); // Navigate back to galaxy map
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-space-dark relative text-space-ui-text">
      {/* Background */}
      <SpaceBackground />
      
      {/* Cockpit overlay for consistency with other screens */}
      <CockpitOverlay />
      
      {/* Inventory UI */}
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
            <h1 className="text-2xl font-pixel text-space-ui-text">Inventář a Náklad</h1>
          </div>
        </div>
        
        {/* Inventory filters */}
        <InventoryFilters />
        
        {/* Main inventory grid area */}
        <div className="flex flex-1 gap-4 mt-4 h-[calc(100%-8rem)]">
          {/* Left side - Cargo hold */}
          <div className="flex flex-col w-2/3 bg-space-dark bg-opacity-80 border border-space-buttons-border rounded-lg p-4">
            <h2 className="text-xl font-pixel mb-2">Nákladový Prostor</h2>
            <CargoHold />
          </div>
          
          {/* Right side - Specialized storage and item details */}
          <div className="w-1/3 flex flex-col gap-4">
            {/* Specialized storage */}
            <div className="bg-space-dark bg-opacity-80 border border-space-buttons-border rounded-lg p-4 h-1/2">
              <h2 className="text-xl font-pixel mb-2">Specializované Úložiště</h2>
              <SpecializedStorage 
                activeTab={activeStorageTab} 
                setActiveTab={setActiveStorageTab} 
              />
            </div>
            
            {/* Item details panel */}
            <div className="bg-space-dark bg-opacity-80 border border-space-buttons-border rounded-lg p-4 h-1/2 overflow-auto">
              {inventory.selectedItemId ? (
                <ItemDetailsPanel itemInstanceId={inventory.selectedItemId} />
              ) : (
                <div className="h-full flex items-center justify-center text-space-ui-subtext">
                  <p>Vyberte předmět pro zobrazení detailů</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Cargo capacity indicator */}
        <div className="mt-4">
          <CargoCapacityIndicator />
        </div>
      </div>
    </div>
  );
};

export default InventoryScreen;
