
import React from 'react';
import { useShipMovement } from '../../contexts/ShipMovementContext';

interface PlayerShipVisualProps {
  shipImageUrl?: string;
}

const PlayerShipVisual: React.FC<PlayerShipVisualProps> = ({ 
  shipImageUrl = "/assets/ships/nomad_ship.png" 
}) => {
  const { currentMovementState } = useShipMovement();
  const { position, rotation, thrusting, boosting, strafingLeft, strafingRight } = currentMovementState;
  
  return (
    <div 
      className="absolute transition-transform"
      style={{
        left: `${window.innerWidth / 2}px`,
        top: `${window.innerHeight / 2}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}rad)`
      }}
    >
      {/* Main ship sprite */}
      <div 
        className="relative w-32 h-32 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${shipImageUrl})`
        }}
      >
        {/* Main engine exhaust effect */}
        {thrusting && (
          <div 
            className={`absolute top-[80%] left-[45%] w-[10%] h-[40%] ${
              boosting ? 'bg-blue-500' : 'bg-orange-500'
            } rounded-full animate-pulse opacity-80`}
          />
        )}
        
        {/* Left strafe thruster */}
        {strafingRight && (
          <div 
            className="absolute top-[50%] left-0 w-[20%] h-[10%] bg-cyan-500 rounded-full animate-pulse opacity-60"
          />
        )}
        
        {/* Right strafe thruster */}
        {strafingLeft && (
          <div 
            className="absolute top-[50%] right-0 w-[20%] h-[10%] bg-cyan-500 rounded-full animate-pulse opacity-60"
          />
        )}
      </div>
    </div>
  );
};

export default PlayerShipVisual;
