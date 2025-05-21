
import React, { useState, useEffect } from 'react';
import { shipClasses } from '@/data/shipClasses';
import { Button } from '@/components/ui/button';
import { alienShipClasses } from '@/data/alienShips';
import { ShipClassDefinition } from '@/types/ships-extended';

interface ShipTypeSelectorProps {
  onSelectShip: (shipClassId: string) => void;
  currentShipClassId?: string;
  includeAlienShips?: boolean;
}

const ShipTypeSelector: React.FC<ShipTypeSelectorProps> = ({ 
  onSelectShip, 
  currentShipClassId,
  includeAlienShips = true
}) => {
  const [category, setCategory] = useState<string>('all');
  const [allShipClasses, setAllShipClasses] = useState<ShipClassDefinition[]>([]);
  
  // Combine regular and alien ships
  useEffect(() => {
    let combinedShips = [...shipClasses];
    
    if (includeAlienShips) {
      combinedShips = [...combinedShips, ...alienShipClasses];
    }
    
    setAllShipClasses(combinedShips);
  }, [includeAlienShips]);

  // Get unique categories
  const categories = [
    'all', 
    ...new Set(allShipClasses.map(ship => ship.category.split('_')[0]))
  ];

  // Filter ships based on selected category
  const filteredShips = allShipClasses.filter(ship => 
    category === 'all' || ship.category.startsWith(category)
  );
  
  // Separate human and alien ships
  const humanShips = filteredShips.filter(ship => 
    !alienShipClasses.some(alienShip => alienShip.classId === ship.classId)
  );
  
  const alienShips = includeAlienShips 
    ? filteredShips.filter(ship => 
        alienShipClasses.some(alienShip => alienShip.classId === ship.classId)
      )
    : [];
  
  // Check if a ship is an alien ship
  const isAlienShip = (shipClassId: string) => {
    return alienShipClasses.some(ship => ship.classId === shipClassId);
  };
  
  // Function to render a ship item
  const renderShipItem = (ship: ShipClassDefinition) => {
    const shortId = ship.classId.split('_').pop()?.substring(0, 2).toUpperCase() || 
                    ship.defaultClassName.substring(0, 2).toUpperCase();
    const isAlien = isAlienShip(ship.classId);
    
    return (
      <div 
        key={ship.classId}
        className={`p-3 border rounded cursor-pointer transition-all ${
          currentShipClassId === ship.classId 
            ? 'bg-space-buttons border-space-buttons-glow text-space-ui-text' 
            : 'bg-space-dark border-space-buttons-border text-space-ui-subtext hover:bg-space-buttons hover:bg-opacity-20'
        }`}
        onClick={() => onSelectShip(ship.classId)}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 bg-space-dark rounded-sm flex items-center justify-center mr-3 text-xs overflow-hidden">
            {currentShipClassId === ship.classId ? (
              <div className="text-space-buttons-glow text-lg font-bold">{shortId}</div>
            ) : (
              <div>{shortId}</div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="text-sm font-medium">{ship.defaultClassName}</span>
              {isAlien && (
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-purple-800 rounded-full text-white">Alien</span>
              )}
            </div>
            <div className="text-xs opacity-70">{ship.category.replace(/_/g, ' ')}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Category buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <Button 
            key={cat}
            size="sm"
            variant={category === cat ? "default" : "outline"}
            onClick={() => setCategory(cat)}
            className="text-xs"
          >
            {cat === 'all' ? 'Vše' : cat}
          </Button>
        ))}
      </div>
      
      {/* Human ships section */}
      {humanShips.length > 0 && (
        <>
          <div className="text-sm font-medium text-space-ui-text mb-2">Lidské lodě</div>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {humanShips.map(ship => renderShipItem(ship))}
          </div>
        </>
      )}
      
      {/* Alien ships section */}
      {alienShips.length > 0 && (
        <>
          <div className="text-sm font-medium text-space-ui-text mb-2 mt-4">Mimozemské lodě</div>
          <div className="grid grid-cols-1 gap-3">
            {alienShips.map(ship => renderShipItem(ship))}
          </div>
        </>
      )}
      
      {/* No ships found message */}
      {filteredShips.length === 0 && (
        <div className="text-center py-4 text-space-ui-subtext">
          Žádné lodě této kategorie nebyly nalezeny
        </div>
      )}
    </div>
  );
};

export default ShipTypeSelector;
