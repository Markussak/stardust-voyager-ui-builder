
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameLogo from './GameLogo';
import VersionInfo from './VersionInfo';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

const StartMenu = () => {
  const navigate = useNavigate();
  const { startNewGame } = useGame();

  const handleNewGame = () => {
    startNewGame();
    navigate('/game-menu');
  };

  const handleLoadGame = () => {
    // In a real implementation, this would open a load game dialog
    console.log("Load game clicked - would open load dialog");
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleCredits = () => {
    // In a real implementation, this would show credits
    console.log("Credits clicked - would show credits");
  };

  const handleQuitGame = () => {
    // In a browser environment, we can't really quit
    console.log("Quit game clicked - would exit game");
    window.close(); // This may not work in most browsers due to security restrictions
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
      <div className="mb-12">
        <GameLogo />
      </div>
      
      <div className="flex flex-col gap-4 max-w-xs w-full">
        <Button 
          onClick={handleNewGame}
          className="w-full py-3 font-pixel text-white bg-space-buttons border border-space-buttons-border 
          hover:bg-space-buttons-hover hover:border-space-buttons-glow transition-all duration-300"
        >
          Nová Hra
        </Button>
        
        <Button 
          onClick={handleLoadGame}
          className="w-full py-3 font-pixel text-white bg-space-buttons border border-space-buttons-border 
          hover:bg-space-buttons-hover hover:border-space-buttons-glow transition-all duration-300"
        >
          Načíst Hru
        </Button>
        
        <Button 
          onClick={handleSettings}
          className="w-full py-3 font-pixel text-white bg-space-buttons border border-space-buttons-border 
          hover:bg-space-buttons-hover hover:border-space-buttons-glow transition-all duration-300"
        >
          Nastavení
        </Button>
        
        <Button 
          onClick={handleCredits}
          className="w-full py-3 font-pixel text-white bg-space-buttons border border-space-buttons-border 
          hover:bg-space-buttons-hover hover:border-space-buttons-glow transition-all duration-300"
        >
          Tvůrci
        </Button>
        
        <Button 
          onClick={handleQuitGame}
          className="w-full py-3 font-pixel text-white bg-space-buttons border border-space-buttons-border 
          hover:bg-space-buttons-hover hover:border-space-buttons-glow transition-all duration-300"
        >
          Ukončit Hru
        </Button>
      </div>
      
      <div className="mt-12">
        <VersionInfo />
      </div>
    </div>
  );
};

export default StartMenu;
