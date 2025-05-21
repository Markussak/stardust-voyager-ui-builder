
import React, { useState } from 'react';
import { shipClasses } from '@/data/shipClasses';
import { Button } from '@/components/ui/button';
import ShipVisualizer from './ShipVisualizer';

interface ShipTypeSelectorProps {
  onSelectShip: (shipClassId: string) => void;
  currentShipClassId?: string;
}

const ShipTypeSelector: React.FC<ShipTypeSelectorProps> = ({ onSelectShip, currentShipClassId }) => {
  const [category, setCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...new Set(shipClasses.map(ship => ship.category.split('_')[0]))];

  // Filter ships based on selected category
  const filteredShips = shipClasses.filter(ship => 
    category === 'all' || ship.category.startsWith(category)
  );

  return (
    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
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
      
      <div className="grid grid-cols-1 gap-3">
        {filteredShips.map((ship) => {
          const shortId = ship.classId.split('_').pop()?.substring(0, 2).toUpperCase() || ship.defaultClassName.substring(0, 2).toUpperCase();
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
                  <div className="text-sm font-medium">{ship.defaultClassName}</div>
                  <div className="text-xs opacity-70">{ship.category.replace(/_/g, ' ')}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShipTypeSelector;
