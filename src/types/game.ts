
export interface GameSettings {
  graphics: {
    resolution: string;
    displayMode: string;
    vsync: boolean;
    textureQuality: string;
    shadowQuality: string;
    particleQuality: string;
    bloom: boolean;
    gravitationalLensing: boolean;
    colorblindMode: string;
  };
  sound: {
    masterVolume: number;
    musicVolume: number;
    sfxVolume: number;
    uiSounds: boolean;
    ambientSounds: boolean;
  };
  controls: {
    keyBindings: Record<string, string>;
  };
}

export interface GameContextType {
  isGameStarted: boolean;
  startNewGame: () => void;
  exitGame: () => void;
  settings: GameSettings;
  updateSettings: (category: string, key: string, value: any) => void;
  gameState: any;
  updateGameState: (newState: any) => void;
}
