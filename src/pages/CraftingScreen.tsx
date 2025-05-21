
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceBackground from '@/components/game/SpaceBackground';
import CockpitOverlay from '@/components/game/CockpitOverlay';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import BlueprintList from '@/components/crafting/BlueprintList';
import BlueprintDetails from '@/components/crafting/BlueprintDetails';
import UpgradeList from '@/components/crafting/UpgradeList';
import UpgradeDetails from '@/components/crafting/UpgradeDetails';
import MaterialsList from '@/components/crafting/MaterialsList';
import CraftingProgress from '@/components/crafting/CraftingProgress';
import { useCrafting } from '@/contexts/CraftingContext';

const CraftingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { craftingMode, setCraftingMode } = useCrafting();
  const [activeTab, setActiveTab] = useState<string>('crafting');
  
  const handleBack = () => {
    navigate('/galaxy-map');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCraftingMode(value === 'crafting' ? 'blueprint' : 'upgrade');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-space-dark relative text-space-ui-text">
      {/* Background */}
      <SpaceBackground />
      
      {/* Cockpit overlay */}
      <CockpitOverlay />
      
      {/* Crafting UI */}
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
            <h1 className="text-2xl font-pixel text-space-ui-text">Výrobní Stanice</h1>
          </div>
        </div>
        
        {/* Tabs for switching between crafting and upgrading */}
        <div className="mb-4">
          <Tabs defaultValue="crafting" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="bg-space-dark bg-opacity-50 border border-space-buttons-border">
              <TabsTrigger 
                value="crafting"
                className="data-[state=active]:bg-blue-900 data-[state=active]:text-white"
              >
                Výroba
              </TabsTrigger>
              <TabsTrigger 
                value="upgrading"
                className="data-[state=active]:bg-purple-900 data-[state=active]:text-white"
              >
                Vylepšení
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="crafting" className="h-[calc(100vh-12rem)]">
              <div className="grid grid-cols-3 gap-4 h-full">
                <div className="col-span-1 h-full overflow-hidden">
                  <BlueprintList />
                </div>
                <div className="col-span-2 flex flex-col h-full space-y-4">
                  <div className="flex-grow">
                    <BlueprintDetails />
                  </div>
                  <div className="h-40">
                    <MaterialsList />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="upgrading" className="h-[calc(100vh-12rem)]">
              <div className="grid grid-cols-3 gap-4 h-full">
                <div className="col-span-1 h-full overflow-hidden">
                  <UpgradeList />
                </div>
                <div className="col-span-2 flex flex-col h-full space-y-4">
                  <div className="flex-grow">
                    <UpgradeDetails />
                  </div>
                  <div className="h-40">
                    <MaterialsList />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Crafting progress overlay */}
      <CraftingProgress />
    </div>
  );
};

export default CraftingScreen;
