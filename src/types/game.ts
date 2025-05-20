
export interface GameContextType {
  isGameStarted: boolean;
  startNewGame: () => void;
  exitGame: () => void;
  gameSettings: GameSettings;
  updateSetting: (key: string, value: any) => void;
}

export interface GameSettings {
  soundVolume: number;
  musicVolume: number;
  graphicsQuality: 'low' | 'medium' | 'high';
  language: string;
  keyBindings: Record<string, string>;
}
