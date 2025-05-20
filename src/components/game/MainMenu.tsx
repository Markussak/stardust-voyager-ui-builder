
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import GameLogo from './GameLogo';
import VersionInfo from './VersionInfo';
import MenuButton from './MenuButton';
import SpaceBackground from './SpaceBackground';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const { isGameStarted, startNewGame, exitGame } = useGame();

  return (
    <div className="relative flex flex-col items-center justify-center h-full">
      {/* Add space background as the first child */}
      <SpaceBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="mb-12">
          <GameLogo />
        </div>

        <div className="space-y-4 w-64">
          {isGameStarted ? (
            <>
              <MenuButton onClick={() => navigate('/galaxy-map')}>
                Pokračovat
              </MenuButton>
              
              <MenuButton onClick={() => navigate('/mission-log')}>
                Misijní Log
              </MenuButton>
              
              <MenuButton onClick={() => navigate('/inventory')}>
                Inventář
              </MenuButton>
              
              <MenuButton onClick={() => navigate('/research')}>
                Výzkum
              </MenuButton>
              
              <MenuButton onClick={() => navigate('/knowledge-library')}>
                Knihovna Znalostí
              </MenuButton>
              
              <MenuButton onClick={() => navigate('/trade')}>
                Obchod
              </MenuButton>
              
              <MenuButton onClick={() => navigate('/diplomacy')}>
                Diplomacie
              </MenuButton>
              
              <MenuButton onClick={() => navigate('/ship-test')}>
                Test Ovládání Lodi
              </MenuButton>
              
              <MenuButton onClick={exitGame}>
                Ukončit Hru
              </MenuButton>
            </>
          ) : (
            <>
              <MenuButton onClick={startNewGame}>
                Nová Hra
              </MenuButton>
              
              <MenuButton disabled>
                Načíst Hru
              </MenuButton>
              
              <MenuButton onClick={() => navigate('/settings')}>
                Nastavení
              </MenuButton>
              
              <MenuButton disabled>
                Tvůrci
              </MenuButton>
              
              <MenuButton onClick={() => window.close()}>
                Ukončit
              </MenuButton>
            </>
          )}
        </div>

        <div className="mt-auto mb-4">
          <VersionInfo />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
