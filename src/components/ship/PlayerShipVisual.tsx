
import React, { useState, useEffect } from 'react';
import { useShipMovement } from '../../contexts/ShipMovementContext';
import { shipClasses } from '@/data/shipClasses';

interface PlayerShipVisualProps {
  shipImageUrl?: string;
  shipClassId?: string;
}

const PlayerShipVisual: React.FC<PlayerShipVisualProps> = ({ 
  shipImageUrl = "/assets/ships/nomad_ship.png",
  shipClassId = "explorer_scout_nomad"
}) => {
  const { currentMovementState } = useShipMovement();
  const { position, rotation, thrusting, boosting, strafingLeft, strafingRight } = currentMovementState;
  
  const [shipData, setShipData] = useState<any>(null);
  
  useEffect(() => {
    // Find ship data from shipClasses
    const ship = shipClasses.find(s => s.classId === shipClassId);
    if (ship) {
      setShipData(ship);
    }
  }, [shipClassId]);

  // Generate engine glow color based on ship class
  const getEngineColor = () => {
    if (!shipData) return boosting ? 'bg-blue-500' : 'bg-orange-500';
    
    // Different ship types can have different engine colors
    switch (shipData.category) {
      case 'Combat_Fighter':
      case 'Combat_Corvette':
      case 'Combat_Frigate':
        return boosting ? 'bg-cyan-500' : 'bg-red-500';
      case 'Exploration':
        return boosting ? 'bg-blue-500' : 'bg-amber-500';
      case 'Transport_Freighter':
        return boosting ? 'bg-teal-500' : 'bg-yellow-600';
      default:
        return boosting ? 'bg-blue-500' : 'bg-orange-500';
    }
  };
  
  const engineColor = getEngineColor();
  const engineSize = shipData?.category?.includes('Combat') ? 'h-[30%]' : 'h-[40%]';
  
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
            className={`absolute top-[80%] left-[45%] w-[10%] ${engineSize} ${engineColor} rounded-full animate-pulse opacity-80`}
          >
            <div className={`w-full h-full ${boosting ? 'animate-ping' : ''} opacity-60 rounded-full ${engineColor}`}></div>
          </div>
        )}
        
        {/* Left strafe thruster */}
        {strafingRight && (
          <div 
            className="absolute top-[50%] left-0 w-[20%] h-[10%] bg-cyan-500 rounded-full animate-pulse opacity-60"
          >
            <div className="w-full h-full animate-ping opacity-40 rounded-full bg-cyan-500"></div>
          </div>
        )}
        
        {/* Right strafe thruster */}
        {strafingLeft && (
          <div 
            className="absolute top-[50%] right-0 w-[20%] h-[10%] bg-cyan-500 rounded-full animate-pulse opacity-60"
          >
            <div className="w-full h-full animate-ping opacity-40 rounded-full bg-cyan-500"></div>
          </div>
        )}
        
        {/* Additional engine effects for some ship classes */}
        {thrusting && shipData?.category?.includes('Combat') && (
          <div className="absolute top-[80%] left-[40%] w-[20%] h-[20%]">
            <div className={`absolute top-0 left-[5%] w-[40%] h-[100%] ${engineColor} rounded-full blur-sm opacity-40`}></div>
            <div className={`absolute top-0 right-[5%] w-[40%] h-[100%] ${engineColor} rounded-full blur-sm opacity-40`}></div>
          </div>
        )}
        
        {/* Shield effect for ships with shields */}
        {shipData && shipData.baseStats.shieldPoints_Base_Range[1] > 100 && (
          <div className="absolute inset-[-5%] rounded-full border border-blue-400 border-opacity-20 pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default PlayerShipVisual;
