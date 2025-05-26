
import React from 'react';
// Link is not directly used if MenuButton handles 'to' prop or if using onClick
// import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; // Added
import MenuButton from './MenuButton';
import GameLogo from './GameLogo';
import VersionInfo from './VersionInfo';
import { useGame } from '@/contexts/GameContext'; // Or useGameContext
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Assuming this path is correct

const MainMenu = () => {
  const { openModal, showTransition } = useGame(); // Added showTransition
  const navigate = useNavigate(); // Added

  // Placeholder for hasSavedGames logic
  const hasSavedGames = true; // For now, always enable "Načíst Hru"

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
      <div className="mb-12">
        <GameLogo />
      </div>
      
      {/* Updated grid to accommodate more buttons, perhaps 3 columns or adjust layout as needed */}
      <div className="grid grid-cols-3 gap-4 max-w-5xl w-full"> 
        <MenuButton onClick={() => showTransition("Příprava nové hry...", () => navigate('/new-game-setup'))}>
            Nová Hra
        </MenuButton>
        <MenuButton onClick={() => showTransition("Načítání seznamu her...", () => navigate('/load-game'))} disabled={!hasSavedGames}>
            Načíst Hru
        </MenuButton>
        <MenuButton onClick={() => openModal('Settings')}>Nastavení</MenuButton>
        
        <MenuButton to="/galaxy-map">Galaktická Mapa</MenuButton>
        <MenuButton to="/ship-details">Detaily Lodi</MenuButton>
        <MenuButton to="/inventory">Inventář</MenuButton>
        <MenuButton to="/research">Výzkum</MenuButton>
        <MenuButton to="/mission-log">Misijní Log</MenuButton>
        <MenuButton to="/knowledge-library">Knihovna Znalostí</MenuButton>
        <MenuButton to="/crew">Posádka</MenuButton>
        <MenuButton to="/planetary">Planetární Interakce</MenuButton>
        <MenuButton to="/diplomacy">Diplomacie</MenuButton>
        <MenuButton to="/trade">Obchod</MenuButton>
        <MenuButton to="/crafting">Výroba</MenuButton>
        <MenuButton to="/ship-editor">Editor Lodi</MenuButton>
        <MenuButton to="/credits">Tvůrci</MenuButton>
        
        {/* Ukončit Hru with AlertDialog */}
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {/* Assuming MenuButton can be used as a child for AlertDialogTrigger. 
                    If not, a regular <button> styled like MenuButton would be used. */}
                <MenuButton>Ukončit Hru</MenuButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Opravdu si přejete ukončit hru?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Váš neuložený postup může být ztracen.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Ne</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { 
                        console.log("Exit confirmed by user. Attempting to close window."); 
                        // window.close(); // This has limitations in modern browsers
                        alert("Simulace ukončení hry. V reálné aplikaci by se okno pokusilo zavřít.");
                    }}>Ano</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <div className="mt-12">
        <VersionInfo />
      </div>
    </div>
  );
};

export default MainMenu;
