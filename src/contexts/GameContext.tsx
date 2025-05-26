import React, { createContext, useContext, useState, useCallback } from 'react'; // Added useCallback
import { GameContextType, GameSettings } from '../types/game';

const defaultSettings: GameSettings = {
  graphics: {
    resolution: 'native',
    displayMode: 'fullscreen',
    vsync: true,
    textureQuality: 'high',
    shadowQuality: 'medium',
    particleQuality: 'high',
    bloom: true,
    gravitationalLensing: true,
    colorblindMode: 'none'
  },
  sound: {
    masterVolume: 80,
    musicVolume: 70,
    sfxVolume: 100,
    uiSounds: true,
    ambientSounds: true
  },
  controls: {
    keyBindings: {}
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [activeModal, setActiveModal] = useState<string | null>(null); // Added for modal management
  
  // Let's add a simple gameState object for crew management
  const [gameState, setGameState] = useState({
    player: {
      credits: 1000,
      currentShip: {
        crewCapacity: 8
      },
      location: {
        type: 'station', // for testing purposes, player starts at a station
      }
    },
    crew: []
  });

  const updateGameState = (newState: any) => {
    setGameState(newState);
  };

  const startNewGame = () => {
    setIsGameStarted(true);
    // Additional game initialization logic would go here
    console.log("Starting new game");
  };

  const exitGame = () => {
    setIsGameStarted(false);
    // Additional game cleanup logic would go here
    console.log("Exiting game");
  };

  const updateSettings = (category: string, key: string, value: any) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category as keyof GameSettings],
        [key]: value
      }
    }));
  };

  // Helper functions for modal management, wrapped with useCallback for performance
  const openModal = useCallback((modalName: string) => {
    setActiveModal(modalName);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  return (
    <GameContext.Provider value={{
      isGameStarted,
      startNewGame,
      exitGame,
      settings,
      updateSettings,
      gameState,
      updateGameState,
      activeModal,
      openModal,
      closeModal
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Keep the original useGame function
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// Add useGameContext as an alias for useGame to maintain compatibility
export const useGameContext = useGame;

// Define modal control functions
export const useModalControls = () => {
  const context = useGame();
  return {
    openModal: context.openModal,
    closeModal: context.closeModal,
    activeModal: context.activeModal,
  };
};

// Updated GameContextType to include modal fields
export type { GameContextType, GameSettings };
