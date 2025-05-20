
import React from 'react';
import ProgressBar from './ProgressBar';
import NotificationArea from './NotificationArea';
import MiniMap from './MiniMap';
import StatusBars from './StatusBars';
import CombatHUD from '../combat/CombatHUD';

// Base HUD layout for the star system view
const GameHUD = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {/* Top notification area */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <NotificationArea />
      </div>
      
      {/* Top right - Mini map */}
      <div className="absolute top-4 right-4">
        <MiniMap />
      </div>
      
      {/* Bottom left - Status bars */}
      <div className="absolute bottom-4 left-4">
        <StatusBars />
      </div>
      
      {/* Combat HUD (will only render when in combat) */}
      <CombatHUD />
    </div>
  );
};

export default GameHUD;
