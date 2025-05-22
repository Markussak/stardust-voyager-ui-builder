
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanetaryProvider } from '../contexts/PlanetaryContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BaseManagementScreen from '../components/planetary/BaseManagementScreen';
import ExplorationPanel from '../components/planetary/ExplorationPanel';
import MenuButton from '../components/game/MenuButton';
import VersionInfo from '../components/game/VersionInfo';
import SpaceBackground from '../components/game/SpaceBackground';
import CockpitOverlay from '../components/game/CockpitOverlay';
import GameHUD from '../components/hud/GameHUD';

const PlanetaryScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('exploration');

  const handleBackToMenu = () => {
    navigate('/');
  };

  return (
    <PlanetaryProvider>
      <div className="h-screen w-screen overflow-hidden bg-space-dark relative">
        {/* Dynamic space background */}
        <SpaceBackground />
        
        {/* Navigation button */}
        <div className="absolute top-4 left-4 z-30">
          <MenuButton 
            text="ZPĚT DO MENU" 
            onClick={handleBackToMenu}
            className="w-48"
          />
        </div>
        
        {/* Main content */}
        <div className="h-full w-full flex items-center justify-center relative z-10 p-6">
          <div className="max-w-7xl w-full bg-space-dark bg-opacity-80 rounded-lg p-6">
            <Tabs defaultValue="exploration" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="exploration" className="font-pixel">Průzkum Planety</TabsTrigger>
                <TabsTrigger value="bases" className="font-pixel">Správa Základen</TabsTrigger>
              </TabsList>
              
              <TabsContent value="exploration" className="h-[calc(100vh-220px)] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ExplorationPanel planetId="planet1" systemId="system1" />
                  
                  <div className="bg-space-card rounded-lg p-5 border border-space-border">
                    <h2 className="text-xl font-pixel text-space-ui-text mb-4">Terra Nova</h2>
                    <div className="mb-4">
                      <img 
                        src="/assets/game/planet.png" 
                        alt="Planet" 
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                    <div className="space-y-3 text-space-ui-subtext text-sm">
                      <p>
                        <span className="font-medium text-space-ui-text">Typ:</span> Terestriální
                      </p>
                      <p>
                        <span className="font-medium text-space-ui-text">Atmosféra:</span> Dýchatelná (20% O₂, 79% N₂)
                      </p>
                      <p>
                        <span className="font-medium text-space-ui-text">Teplota:</span> Průměrná 15°C (Mírné podnebí)
                      </p>
                      <p>
                        <span className="font-medium text-space-ui-text">Prostředí:</span> Rozmanitá flora i fauna
                      </p>
                      <p>
                        <span className="font-medium text-space-ui-text">Skenování:</span> Úroveň 2 - Základní topografie a velké geologické struktury
                      </p>
                    </div>
                    <div className="mt-6">
                      <h3 className="font-medium text-space-ui-text mb-2">Environmentální Rizika</h3>
                      <ul className="list-disc list-inside text-space-ui-subtext text-sm">
                        <li>Neznámá místní fauna - doporučeno ozbrojené doprovody</li>
                        <li>Nestabilní tektonika - středně silná zemětřesení v oblasti</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="bases" className="h-[calc(100vh-220px)] overflow-y-auto">
                <BaseManagementScreen />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Cockpit overlay */}
        <CockpitOverlay />
        
        {/* Game HUD */}
        <GameHUD />
        
        <VersionInfo />
      </div>
    </PlanetaryProvider>
  );
};

export default PlanetaryScreen;
