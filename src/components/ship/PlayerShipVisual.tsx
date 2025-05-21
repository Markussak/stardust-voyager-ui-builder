
import React, { useState, useEffect } from 'react';
import { useShipMovement } from '../../contexts/ShipMovementContext';
import { shipClasses } from '@/data/shipClasses';
import { getAlienShipById } from '@/data/alienShips';

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
  const [isAlienShip, setIsAlienShip] = useState<boolean>(false);
  
  useEffect(() => {
    // Find ship data from shipClasses first
    let ship = shipClasses.find(s => s.classId === shipClassId);
    
    // If not found, check if it's an alien ship
    if (!ship) {
      ship = getAlienShipById(shipClassId);
      if (ship) {
        setIsAlienShip(true);
      } else {
        setIsAlienShip(false);
      }
    } else {
      setIsAlienShip(false);
    }
    
    if (ship) {
      setShipData(ship);
    }
  }, [shipClassId]);

  // Generate engine glow color based on ship class
  const getEngineColor = () => {
    if (!shipData) return boosting ? 'bg-blue-500' : 'bg-orange-500';
    
    // For alien ships
    if (isAlienShip) {
      if (shipClassId.includes('sylvan')) {
        return boosting ? 'bg-green-400' : 'bg-lime-500';
      } else if (shipClassId.includes('shard')) {
        return boosting ? 'bg-cyan-300' : 'bg-blue-500';
      } else if (shipClassId.includes('krall')) {
        return boosting ? 'bg-red-400' : 'bg-orange-600';
      }
      
      // Default alien engine color
      return boosting ? 'bg-purple-400' : 'bg-fuchsia-600';
    }
    
    // For human ships - different ship types can have different engine colors
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
  const engineSize = isAlienShip ? 'h-[45%]' : (shipData?.category?.includes('Combat') ? 'h-[30%]' : 'h-[40%]');
  
  // Add a glow effect for alien ships
  const getGlowEffect = () => {
    if (!isAlienShip) return '';
    
    if (shipClassId.includes('sylvan')) {
      return 'shadow-sm shadow-green-500/40';
    } else if (shipClassId.includes('shard')) {
      return 'shadow-sm shadow-blue-500/40';
    } else if (shipClassId.includes('krall')) {
      return 'shadow-sm shadow-red-500/40';
    }
    
    return 'shadow-sm shadow-purple-500/40';
  };
  
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
        className={`relative w-32 h-32 bg-contain bg-center bg-no-repeat ${getGlowEffect()}`}
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
            className={`absolute top-[50%] left-0 w-[20%] h-[10%] ${engineColor.replace('bg-', 'bg-opacity-80 bg-')} rounded-full animate-pulse opacity-60`}
          >
            <div className="w-full h-full animate-ping opacity-40 rounded-full bg-cyan-500"></div>
          </div>
        )}
        
        {/* Right strafe thruster */}
        {strafingLeft && (
          <div 
            className={`absolute top-[50%] right-0 w-[20%] h-[10%] ${engineColor.replace('bg-', 'bg-opacity-80 bg-')} rounded-full animate-pulse opacity-60`}
          >
            <div className="w-full h-full animate-ping opacity-40 rounded-full bg-cyan-500"></div>
          </div>
        )}
        
        {/* Special effects for different ship types */}
        {thrusting && isAlienShip && (
          <div className="absolute top-[80%] left-[40%] w-[20%] h-[20%]">
            {shipClassId.includes('sylvan') && (
              <div className={`absolute top-0 left-[5%] w-[90%] h-[100%] ${engineColor} rounded-full blur-md opacity-30`}></div>
            )}
            {shipClassId.includes('shard') && (
              <>
                <div className={`absolute top-0 left-[10%] w-[20%] h-[80%] ${engineColor} rounded-full blur-sm opacity-40`}></div>
                <div className={`absolute top-0 right-[10%] w-[20%] h-[80%] ${engineColor} rounded-full blur-sm opacity-40`}></div>
                <div className={`absolute top-0 left-[35%] w-[30%] h-[90%] ${engineColor} rounded-full blur-sm opacity-30`}></div>
              </>
            )}
            {shipClassId.includes('krall') && (
              <div className={`absolute top-0 left-[15%] w-[70%] h-[80%] ${engineColor} rounded-full blur-lg opacity-50`}></div>
            )}
          </div>
        )}
        
        {/* Additional engine effects for some ship classes */}
        {thrusting && !isAlienShip && shipData?.category?.includes('Combat') && (
          <div className="absolute top-[80%] left-[40%] w-[20%] h-[20%]">
            <div className={`absolute top-0 left-[5%] w-[40%] h-[100%] ${engineColor} rounded-full blur-sm opacity-40`}></div>
            <div className={`absolute top-0 right-[5%] w-[40%] h-[100%] ${engineColor} rounded-full blur-sm opacity-40`}></div>
          </div>
        )}
        
        {/* Shield effect for ships with shields */}
        {shipData && shipData.baseStats.shieldPoints_Base_Range[1] > 100 && (
          <div className={`absolute inset-[-5%] rounded-full border ${isAlienShip ? 'border-purple-400' : 'border-blue-400'} border-opacity-20 pointer-events-none`}></div>
        )}
      </div>
    </div>
  );
};

export default PlayerShipVisual;
