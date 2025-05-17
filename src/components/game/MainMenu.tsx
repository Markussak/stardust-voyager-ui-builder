
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import GameLogo from './GameLogo';
import MenuButton from './MenuButton';
import VersionInfo from './VersionInfo';
import SpaceBackground from './SpaceBackground';
import CockpitOverlay from './CockpitOverlay';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MainMenu = () => {
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [hasGameSaves, setHasGameSaves] = useState(false);
  const navigate = useNavigate();

  const handleNewGame = () => {
    console.log('Starting new game...');
    navigate('/galaxy-map');
  };

  const handleLoadGame = () => {
    console.log('Loading game...');
    // TODO: Navigate to LoadGameScreen
  };

  const handleSettings = () => {
    console.log('Opening settings...');
    // TODO: Navigate to SettingsScreen
  };

  const handleLibrary = () => {
    console.log('Opening knowledge library...');
    // TODO: Navigate to KnowledgeLibraryScreen
  };

  const handleCredits = () => {
    console.log('Opening credits...');
    // TODO: Navigate to CreditsScreen
  };

  const handleExitGame = () => {
    setIsExitDialogOpen(true);
  };

  const confirmExit = () => {
    console.log('Exiting game...');
    setIsExitDialogOpen(false);
    // TODO: Exit application logic
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-space-dark relative">
      {/* Background */}
      <SpaceBackground />
      
      {/* Cockpit overlay */}
      <CockpitOverlay />
      
      {/* Menu content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        {/* Game Logo */}
        <GameLogo />
        
        {/* Menu buttons */}
        <div className="flex flex-col gap-4 mt-4">
          <MenuButton text="NOVÁ HRA" onClick={handleNewGame} />
          <MenuButton text="NAČÍST HRU" onClick={handleLoadGame} disabled={!hasGameSaves} />
          <MenuButton text="NASTAVENÍ" onClick={handleSettings} />
          <MenuButton text="KNIHOVNA ZNALOSTÍ" onClick={handleLibrary} />
          <MenuButton text="TVŮRCI" onClick={handleCredits} />
          <MenuButton text="UKONČIT HRU" onClick={handleExitGame} className="mt-4" />
        </div>
      </div>
      
      {/* Version info */}
      <VersionInfo />
      
      {/* Exit confirmation dialog */}
      <Dialog open={isExitDialogOpen} onOpenChange={setIsExitDialogOpen}>
        <DialogContent className="bg-space-dark border-space-buttons-border">
          <DialogHeader>
            <DialogTitle className="text-space-ui-text font-pixel">Ukončit hru?</DialogTitle>
            <DialogDescription className="text-space-ui-subtext">
              Opravdu chcete ukončit hru? Veškerý neuložený postup bude ztracen.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setIsExitDialogOpen(false)}
              className="border-space-buttons-border text-space-ui-text"
            >
              Zrušit
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmExit}
            >
              Ukončit hru
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainMenu;
