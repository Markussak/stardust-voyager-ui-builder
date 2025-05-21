
import React from 'react';
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
  
  if (!shipClass) {
    return <div className="text-space-ui-subtext">Loď nenalezena</div>;
  }
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-24 h-24';
      case 'lg': return 'w-64 h-64';
      case 'md':
      default: return 'w-40 h-40';
    }
  };
  
  const baseSprite = shipClass.baseSprite_AssetPath_Template.replace('{variant}', '1');
  
  return (
    <div className="flex flex-col items-center">
      {/* Ship image */}
      <div className={`relative ${getSizeClass()} bg-contain bg-center bg-no-repeat mb-3`}
           style={{ backgroundImage: `url(${baseSprite})` }}>
        {/* Optional overlays could be added here */}
      </div>
      
      {/* Ship name */}
      <div className="text-space-ui-text text-lg font-pixel mb-1">{shipClass.defaultClassName}</div>
      
      {/* Ship category */}
      <div className="text-space-ui-subtext text-sm mb-3">
        {shipClass.category.replace('_', ' ')}
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
