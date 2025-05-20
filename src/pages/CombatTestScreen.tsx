
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CombatSystemProvider } from '@/contexts/CombatSystemContext';
import SpaceBackground from '@/components/game/SpaceBackground';
import CockpitOverlay from '@/components/game/CockpitOverlay';
import PlayerShipVisual from '@/components/ship/PlayerShipVisual';
import GameHUD from '@/components/hud/GameHUD';
import CombatHUD from '@/components/combat/CombatHUD';
import WeaponControls from '@/components/combat/WeaponControls';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Shield, Zap } from 'lucide-react';
import { useCombatSystem } from '@/contexts/CombatSystemContext';

const CombatControls = () => {
  const { 
    enterCombat, 
    exitCombat, 
    isInCombat,
    selectedTarget,
    activeEnemies,
    selectTarget,
    clearTarget
  } = useCombatSystem();
  
  return (
    <div className="absolute left-4 top-20 bg-black bg-opacity-50 p-4 rounded border border-space-buttons-border w-64">
      <h2 className="text-xl font-pixel mb-4">Bojový režim</h2>
      
      {!isInCombat ? (
        <Button 
          onClick={enterCombat}
          className="w-full mb-2"
        >
          Vstoupit do bojového režimu
        </Button>
      ) : (
        <Button 
          onClick={exitCombat}
          variant="destructive"
          className="w-full mb-2"
        >
          Ukončit bojový režim
        </Button>
      )}
      
      {isInCombat && (
        <>
          <div className="mt-4 mb-2">
            <h3 className="text-sm font-semibold mb-2">Dostupné cíle:</h3>
            {activeEnemies.length > 0 ? (
              <div className="space-y-2">
                {activeEnemies.map(enemy => (
                  <Button
                    key={enemy.entityId}
                    size="sm"
                    variant={selectedTarget && selectedTarget.entityId === enemy.entityId ? "default" : "outline"}
                    onClick={() => selectTarget(enemy.entityId)}
                    className="w-full flex items-center justify-between"
                  >
                    <span className="flex items-center">
                      <Target size={14} className="mr-1" /> 
                      {enemy.entityId}
                    </span>
                    <span className="flex items-center space-x-1 text-xs">
                      {enemy.shield_Current !== undefined && (
                        <span className="text-blue-400 flex items-center">
                          <Shield size={10} className="mr-1" />
                          {Math.round(enemy.shield_Current)}
                        </span>
                      )}
                      <span className="text-red-400">
                        {Math.round(enemy.health_Hull_Current)}
                      </span>
                    </span>
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Žádné nepřátelské cíle</p>
            )}
          </div>
          
          {selectedTarget && (
            <Button
              size="sm"
              variant="outline"
              onClick={clearTarget}
              className="w-full mt-1"
            >
              Zrušit vybraný cíl
            </Button>
          )}
          
          <div className="mt-6">
            <WeaponControls />
          </div>
        </>
      )}
    </div>
  );
};

const CombatTestScreen = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/galaxy-map');
  };

  return (
    <CombatSystemProvider>
      <div className="h-screen w-screen overflow-hidden bg-space-dark relative text-space-ui-text">
        {/* Background */}
        <SpaceBackground />
        
        {/* Player ship */}
        <PlayerShipVisual />
        
        {/* Cockpit overlay */}
        <CockpitOverlay />
        
        {/* Regular HUD */}
        <GameHUD />
        
        {/* Combat-specific HUD */}
        <CombatHUD />
        
        {/* Back button */}
        <div className="absolute top-4 left-4 z-30">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleBack}
            className="border-space-buttons-border hover:bg-space-buttons-hover"
          >
            <ArrowLeft size={20} />
          </Button>
        </div>
        
        {/* Combat controls panel */}
        <CombatControls />
        
        {/* Enemy Ships would be here */}
        {/* We'll add them in a future update */}
      </div>
    </CombatSystemProvider>
  );
};

export default CombatTestScreen;
