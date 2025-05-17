
import { useGalaxy } from '../../contexts/GalaxyContext';
import { StarSystem } from '../../types/galaxy';
import { useEffect, useState } from 'react';

interface PlayerShipProps {
  shipIconUrl?: string;
  sizePx?: { width: number; height: number };
  zoomLevel: number;
  panOffset: { x: number; y: number };
}

const PlayerShip = ({ 
  shipIconUrl = "/assets/ships/nomad_map_icon.png", 
  sizePx = { width: 8, height: 16 },
  zoomLevel,
  panOffset
}: PlayerShipProps) => {
  const { galaxy } = useGalaxy();
  const [playerSystem, setPlayerSystem] = useState<StarSystem | null>(null);

  // Find the player system
  useEffect(() => {
    if (!galaxy || !galaxy.playerPosition) return;
    
    const system = galaxy.systems.find(s => s.id === galaxy.playerPosition);
    if (system) {
      setPlayerSystem(system);
    }
  }, [galaxy]);

  if (!playerSystem) {
    return null;
  }

  // Apply zoom and pan to the position
  const x = playerSystem.position.x * zoomLevel + panOffset.x;
  const y = playerSystem.position.y * zoomLevel + panOffset.y;

  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: `${x - (sizePx.width * zoomLevel) / 2}px`,
        top: `${y - (sizePx.height * zoomLevel) / 2}px`,
        width: `${sizePx.width * zoomLevel}px`,
        height: `${sizePx.height * zoomLevel}px`,
        zIndex: 20,
      }}
    >
      {/* Ship icon */}
      <div 
        className="w-full h-full bg-contain bg-center bg-no-repeat animate-pulse"
        style={{ 
          backgroundImage: `url(${shipIconUrl})`,
        }}
      />
      
      {/* Pulsating highlight around the player ship */}
      <div 
        className="absolute top-0 left-0 w-full h-full rounded-full animate-ping"
        style={{
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          transform: 'scale(1.5)',
        }}
      />
    </div>
  );
};

export default PlayerShip;
