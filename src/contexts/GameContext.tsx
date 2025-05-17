
import { createContext, useContext, ReactNode, useState } from 'react';

interface GameProviderProps {
  children: ReactNode;
}

interface GameContextType {
  hasSavedGames: boolean;
  setHasSavedGames: (value: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [hasSavedGames, setHasSavedGames] = useState(false);

  const value = {
    hasSavedGames,
    setHasSavedGames,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
