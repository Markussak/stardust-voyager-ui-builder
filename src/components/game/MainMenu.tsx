
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useGame } from '@/contexts/GameContext';
import GameLogo from './GameLogo';
import MenuButton from './MenuButton';
import VersionInfo from './VersionInfo';
import SpaceBackground from './SpaceBackground';
import CockpitOverlay from './CockpitOverlay';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldIcon, Users, FlaskConical, ShoppingCart, Briefcase } from 'lucide-react';

const MainMenu = () => {
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { hasSavedGames } = useGame();
  const navigate = useNavigate();

  const handleNewGame = () => {
    console.log('Starting new game...');
    setIsGameStarted(true);
    navigate('/galaxy-map');
  };

  const handleLoadGame = () => {
    console.log('Loading game...');
    setIsGameStarted(true);
    // TODO: Navigate to LoadGameScreen
  };

  const handleInventory = () => {
    console.log('Opening inventory...');
    navigate('/inventory');
  };

  const handleSettings = () => {
    console.log('Opening settings...');
    navigate('/settings');
  };

  const handleResearch = () => {
    console.log('Opening research tree...');
    navigate('/research');
  };

  const handleTrade = () => {
    console.log('Opening trade screen...');
    navigate('/trade');
  };

  const handleDiplomacy = () => {
    console.log('Opening diplomacy screen...');
    navigate('/diplomacy');
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
          {!isGameStarted ? (
            <>
              <MenuButton text="NOVÁ HRA" onClick={handleNewGame} />
              <MenuButton text="NAČÍST HRU" onClick={handleLoadGame} disabled={!hasSavedGames} />
              <MenuButton text="NASTAVENÍ" onClick={handleSettings} />
              <MenuButton text="TVŮRCI" onClick={handleCredits} />
              <MenuButton text="UKONČIT HRU" onClick={handleExitGame} className="mt-4" />
            </>
          ) : (
            <>
              <MenuButton text="NÁVRAT DO HRY" onClick={() => navigate('/galaxy-map')} />
              <MenuButton 
                text="INVENTÁŘ" 
                onClick={handleInventory}
                icon={<Briefcase size={18} />}
              />
              <MenuButton 
                text="VÝZKUM" 
                onClick={handleResearch}
                icon={<FlaskConical size={18} />}
              />
              <MenuButton 
                text="OBCHOD" 
                onClick={handleTrade}
                icon={<ShoppingCart size={18} />}
              />
              <MenuButton 
                text="DIPLOMACIE" 
                onClick={handleDiplomacy}
                icon={<Users size={18} />}
              />
              <MenuButton text="KNIHOVNA ZNALOSTÍ" onClick={handleLibrary} />
              <MenuButton text="NASTAVENÍ" onClick={handleSettings} />
              <MenuButton text="UKONČIT HRU" onClick={handleExitGame} className="mt-4" />
            </>
          )}
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
