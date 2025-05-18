
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGalaxy, GalaxyProvider } from '../contexts/GalaxyContext';
import StarTypeG from '../components/stars/StarTypeG';
import { StarDataTypeG, StarType } from '../types/stars';
import { generateStarTypeG } from '../services/StarGenerator';
import MenuButton from '../components/game/MenuButton';
import VersionInfo from '../components/game/VersionInfo';
import SpaceBackground from '../components/game/SpaceBackground';
import CockpitOverlay from '../components/game/CockpitOverlay';
import GameHUD from '../components/hud/GameHUD';

// Inner component that uses the GalaxyContext
const StarSystemContent = () => {
  const navigate = useNavigate();
  const { systemId } = useParams<{ systemId: string }>();
  const { galaxy, selectedSystem } = useGalaxy();
  const [currentStar, setCurrentStar] = useState<StarDataTypeG | null>(null);
  
  useEffect(() => {
    // Pokud máme vybraný systém, použijeme ho pro vytvoření hvězdy
    if (selectedSystem) {
      // V reálném projektu bychom zde načítali data ze serveru nebo ukládali do kontextu
      // Pro ukázku zde vytvoříme hvězdu typu G
      const newStar = generateStarTypeG();
      newStar.name = selectedSystem.name;
      newStar.id = selectedSystem.id;
      setCurrentStar(newStar);
    } else if (systemId) {
      // Pokud přicházíme přímo na URL s ID, najdeme systém v galaxii
      const system = galaxy?.systems.find(s => s.id === systemId);
      if (system) {
        const newStar = generateStarTypeG();
        newStar.name = system.name;
        newStar.id = system.id;
        setCurrentStar(newStar);
      }
    } else {
      // Pokud nemáme vybraný systém ani ID, přejdeme zpět na mapu galaxie
      navigate('/galaxy-map');
    }
  }, [selectedSystem, systemId, galaxy]);

  const handleBackToGalaxy = () => {
    navigate('/galaxy-map');
  };

  if (!currentStar) {
    return (
      <div className="h-screen w-screen bg-space-dark flex items-center justify-center text-white">
        <div className="text-2xl">Načítání hvězdného systému...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-space-dark relative">
      {/* Dynamic space background */}
      <SpaceBackground />
      
      {/* Navigation button */}
      <div className="absolute top-4 left-4 z-30">
        <MenuButton 
          text="ZPĚT NA MAPU" 
          onClick={handleBackToGalaxy}
          className="w-48"
        />
      </div>
      
      {/* Main star system content */}
      <div className="h-full w-full flex flex-col items-center justify-center relative z-10">
        {/* Hvězda */}
        <div className="mb-8">
          <StarTypeG 
            star={currentStar} 
            size={400} 
            showDetails={true} 
          />
        </div>
        
        {/* Informační panel */}
        <div className="bg-black bg-opacity-60 rounded-lg p-6 max-w-xl text-white">
          <h2 className="text-2xl font-bold mb-4">Systém {currentStar.name}</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">O hvězdě</h3>
            <p className="mb-2">{currentStar.loreEntry?.generalDescription}</p>
            <p>{currentStar.loreEntry?.lifeSupportingPotential}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Cykly aktivity</h3>
            <p>{currentStar.loreEntry?.activityCycleInfo}</p>
          </div>
          
          {currentStar.loreEntry?.explorerNotes && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Poznámky průzkumníků</h3>
              {currentStar.loreEntry.explorerNotes.map((note, index) => (
                <blockquote key={index} className="italic border-l-4 border-blue-400 pl-4 my-2">{note}</blockquote>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Cockpit overlay */}
      <CockpitOverlay />
      
      {/* Game HUD */}
      <GameHUD />
      
      <VersionInfo />
    </div>
  );
};

// Main component that provides the GalaxyProvider
const StarSystemScreen = () => {
  return (
    <GalaxyProvider>
      <StarSystemContent />
    </GalaxyProvider>
  );
};

export default StarSystemScreen;
