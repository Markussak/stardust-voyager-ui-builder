
import React, { useState } from 'react';
import { usePlanetary } from '@/contexts/PlanetaryContext';
import { PlanetaryBaseType } from '@/types/planetary';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BaseList from './BaseList';
import BaseDetailPanel from './BaseDetailPanel';
import NewBasePanel from './NewBasePanel';
import ModuleBuildPanel from './ModuleBuildPanel';

const BaseManagementScreen = () => {
  const { playerBases, selectedBase, setSelectedBase } = usePlanetary();
  const [activeTab, setActiveTab] = useState<string>('bases');
  const navigate = useNavigate();
  
  const handleBackToMenu = () => {
    navigate('/');
  };

  return (
    <div className="h-screen w-screen bg-space-dark p-6">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-pixel text-space-ui-text">Správa Planetárních Základen</h1>
          <Button
            onClick={handleBackToMenu}
            className="bg-space-buttons border border-space-buttons-border hover:bg-space-buttons-hover"
          >
            Zpět do Menu
          </Button>
        </div>
        
        <Tabs
          defaultValue="bases"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-3 w-full bg-space-card">
            <TabsTrigger value="bases" className="font-pixel">Moje Základny</TabsTrigger>
            <TabsTrigger value="new" className="font-pixel">Založit Základnu</TabsTrigger>
            <TabsTrigger 
              value="detail" 
              className="font-pixel"
              disabled={!selectedBase}
            >
              Detail Základny
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bases" className="flex-1 overflow-y-auto">
            <Card className="bg-space-card border-space-border h-full">
              <CardHeader>
                <CardTitle className="font-pixel text-space-ui-text">Seznam Základen</CardTitle>
              </CardHeader>
              <CardContent>
                {playerBases.length > 0 ? (
                  <BaseList 
                    bases={playerBases} 
                    onSelect={(base) => {
                      setSelectedBase(base);
                      setActiveTab('detail');
                    }}
                  />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-space-ui-subtext">Nemáte žádné základny.</p>
                    <Button 
                      onClick={() => setActiveTab('new')} 
                      className="mt-4 bg-space-accent text-black hover:bg-space-accent/80"
                    >
                      Založit Novou Základnu
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new" className="flex-1 overflow-y-auto">
            <NewBasePanel onCreated={() => setActiveTab('detail')} />
          </TabsContent>

          <TabsContent value="detail" className="flex-1 overflow-y-auto">
            {selectedBase ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                <div className="lg:col-span-2">
                  <BaseDetailPanel base={selectedBase} />
                </div>
                <div>
                  <ModuleBuildPanel baseId={selectedBase.baseId} />
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-space-ui-subtext">Není vybrána žádná základna.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BaseManagementScreen;
