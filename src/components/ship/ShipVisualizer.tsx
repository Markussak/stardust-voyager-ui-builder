
import React, { useState, useEffect } from 'react';
import { ShipClassDefinition } from '@/types/ships-extended';
import { shipClasses } from '@/data/shipClasses';

interface ShipVisualizerProps {
  shipClassId: string;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  showStats?: boolean;
}

const ShipVisualizer: React.FC<ShipVisualizerProps> = ({ 
  shipClassId,
  size = 'md',
  showDetails = false,
  showStats = false
}) => {
  const shipClass = shipClasses.find(s => s.classId === shipClassId);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  
  useEffect(() => {
    if (!shipClass) return;
    
    // Generate ship image URL and ensure it uses the correct format
    const baseSprite = shipClass.baseSprite_AssetPath_Template.replace('{variant}', '1');
    
    // Create a temp image to check if the ship asset exists
    const tempImg = new Image();
    tempImg.onload = () => {
      setImageUrl(baseSprite);
      setImageLoaded(true);
    };
    tempImg.onerror = () => {
      // If the specific ship asset doesn't exist, use a fallback
      console.log(`Failed to load ship image: ${baseSprite}, using fallback`);
      setImageUrl('/assets/ships/nomad_ship.png');
      setImageLoaded(true);
    };
    tempImg.src = baseSprite;
    
    return () => {
      tempImg.onload = null;
      tempImg.onerror = null;
    };
  }, [shipClass]);
  
  if (!shipClass) {
    return <div className="text-space-ui-subtext">Loď nenalezena</div>;
  }
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-28 h-28';
      case 'lg': return 'w-80 h-80';
      case 'md':
      default: return 'w-48 h-48';
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Ship image with loading state and fallback */}
      <div className={`relative ${getSizeClass()} flex items-center justify-center`}>
        {!imageLoaded && (
          <div className="animate-pulse text-space-ui-subtext">Načítání...</div>
        )}
        {imageLoaded && (
          <div 
            className="w-full h-full bg-contain bg-center bg-no-repeat" 
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}
      </div>
      
      {/* Ship name */}
      <div className="text-space-ui-text text-lg font-pixel mt-2 mb-1">{shipClass.defaultClassName}</div>
      
      {/* Ship category */}
      <div className="text-space-ui-subtext text-sm mb-3">
        {shipClass.category.split('_').join(' ')}
      </div>
      
      {/* Details section */}
      {showDetails && (
        <div className="w-full text-sm text-space-ui-text">
          <p className="mb-2">{shipClass.defaultRoleDescription}</p>
          
          <div className="mt-3 font-pixel text-space-ui-text">Designové prvky:</div>
          <ul className="list-disc pl-5 text-xs text-space-ui-subtext mt-1">
            {shipClass.visualDesignCues.slice(0, 2).map((cue, idx) => (
              <li key={idx}>{cue}</li>
            ))}
            {shipClass.visualDesignCues.length > 2 && <li>...</li>}
          </ul>
        </div>
      )}
      
      {/* Stats section */}
      {showStats && (
        <div className="w-full grid grid-cols-2 gap-2 text-xs mt-3">
          <div className="flex flex-col">
            <span className="text-space-ui-subtext">Trup:</span>
            <span className="font-mono">{Math.floor((shipClass.baseStats.hullPoints_Range[0] + shipClass.baseStats.hullPoints_Range[1]) / 2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-space-ui-subtext">Štíty:</span>
            <span className="font-mono">{Math.floor((shipClass.baseStats.shieldPoints_Base_Range[0] + shipClass.baseStats.shieldPoints_Base_Range[1]) / 2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-space-ui-subtext">Rychlost:</span>
            <span className="font-mono">{Math.floor((shipClass.baseStats.maxSpeed_UnitsPerSec_Range[0] + shipClass.baseStats.maxSpeed_UnitsPerSec_Range[1]) / 2)} j/s</span>
          </div>
          <div className="flex flex-col">
            <span className="text-space-ui-subtext">Zrychlení:</span>
            <span className="font-mono">{Math.floor((shipClass.baseStats.acceleration_UnitsPerSec2_Range[0] + shipClass.baseStats.acceleration_UnitsPerSec2_Range[1]) / 2)} j/s²</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipVisualizer;
