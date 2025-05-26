
import { useEffect } from 'react';
import GalaxyMap from '../components/galaxy/GalaxyMap';
import SystemInfoPanel from '../components/galaxy/SystemInfoPanel';
import { GalaxyProvider } from '../contexts/GalaxyContext';
import { useGalaxy } from '../contexts/GalaxyContext';
import VersionInfo from '../components/game/VersionInfo';
import MenuButton from '../components/game/MenuButton';
import { useNavigate } from 'react-router-dom';

// Komponenta pro obsah stránky
const GalaxyMapContent = () => {
  const { selectedSystem } = useGalaxy();
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate('/');
  };

  const handleReturnToSystem = () => {
    navigate('/in-system');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-space-dark relative">
      <div className="absolute top-4 left-4 z-10">
        <MenuButton 
          text="ZPĚT DO MENU" 
          onClick={handleBackToMenu}
          className="w-48"
        />
        <MenuButton
          text="ZPĚT DO SYSTÉMU" // "Return to System"
          onClick={handleReturnToSystem}
          className="w-48 mt-2" // Added margin-top for spacing if below
        />
      </div>
      
      <GalaxyMap />
      {selectedSystem && <SystemInfoPanel />}
      <VersionInfo />
    </div>
  );
};

// Hlavní komponenta stránky
const GalaxyMapScreen = () => {
  return (
    <GalaxyProvider>
      <GalaxyMapContent />
    </GalaxyProvider>
  );
};

export default GalaxyMapScreen;
